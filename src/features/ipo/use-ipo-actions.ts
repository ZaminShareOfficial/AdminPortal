"use client";

import { useCallback, useState, useTransition } from "react";
import {
  buildCreateIpoPayload,
  type CreateIpoFormValues
} from "@/features/ipo/mappers";
import {
  createIpo,
  mintIpo,
  updateIpoStatus
} from "@/features/ipo/services/IpoApiService";
import { canMintIpo, getIpoToggleTarget } from "@/features/ipo/utils";
import type { IpoStatus } from "@/types/backend";

export const useIpoActions = (refetchIpos: () => Promise<void>) => {
  const [actionError, setActionError] = useState<string | null>(null);
  const [statusActionError, setStatusActionError] = useState<string | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const [isStatusPending, startStatusTransition] = useTransition();
  const [isMintPending, startMintTransition] = useTransition();

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

  const submitStatusToggle = (ipoId: string, currentStatus: IpoStatus) => {
    const nextStatus = getIpoToggleTarget(currentStatus);
    if (!nextStatus) {
      return;
    }

    setStatusActionError(null);
    startStatusTransition(async () => {
      try {
        await updateIpoStatus(ipoId, { status: nextStatus });
        await refetchIpos();
      } catch (error) {
        setStatusActionError(
          error instanceof Error
            ? error.message
            : "Could not update IPO status.",
        );
      }
    });
  };

  const submitMint = (ipoId: string, currentStatus: IpoStatus) => {
    if (!canMintIpo(currentStatus)) {
      return;
    }

    setStatusActionError(null);
    startMintTransition(async () => {
      try {
        await mintIpo(ipoId);
        await refetchIpos();
      } catch (error) {
        setStatusActionError(
          error instanceof Error ? error.message : "Could not mint IPO.",
        );
      }
    });
  };

  const clearActionError = useCallback(() => setActionError(null), []);
  const clearStatusActionError = useCallback(
    () => setStatusActionError(null),
    [],
  );

  return {
    actionError,
    statusActionError,
    isPending,
    isStatusPending,
    isMintPending,
    submitCreate,
    submitStatusToggle,
    submitMint,
    clearActionError,
    clearStatusActionError
  };
};

export type IpoActions = ReturnType<typeof useIpoActions>;
