"use client";

import { useCallback, useState, useTransition } from "react";
import {
  buildCreateIpoPayload,
  type CreateIpoFormValues
} from "@/features/ipo/mappers";
import { createIpo } from "@/features/ipo/services/IpoApiService";

export const useIpoActions = (refetchIpos: () => Promise<void>) => {
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submitCreate = (
    propertyId: string,
    form: CreateIpoFormValues,
    onSuccess: () => void,
  ) => {
    setActionError(null);
    startTransition(async () => {
      try {
        await createIpo(buildCreateIpoPayload(propertyId, form));
        await refetchIpos();
        onSuccess();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Could not create IPO.",
        );
      }
    });
  };

  const clearActionError = useCallback(() => setActionError(null), []);

  return {
    actionError,
    isPending,
    submitCreate,
    clearActionError
  };
};

export type IpoActions = ReturnType<typeof useIpoActions>;
