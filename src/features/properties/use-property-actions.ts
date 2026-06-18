"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  formToCreatePayload,
  formToUpdatePayload
} from "@/features/properties/mappers";
import {
  createProperty,
  updateProperty
} from "@/features/properties/services/PropertiesApiService";
import type { PropertyCreateFormValues } from "@/features/properties/types";

export const usePropertyActions = () => {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submitCreate = (
    form: PropertyCreateFormValues,
    onSuccess: () => void,
  ) => {
    setActionError(null);
    startTransition(async () => {
      try {
        await createProperty(formToCreatePayload(form));
        onSuccess();
        router.refresh();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Could not create property.",
        );
      }
    });
  };

  const submitUpdate = (
    propertyId: string,
    form: PropertyCreateFormValues,
    onSuccess?: () => void,
  ) => {
    setActionError(null);
    startTransition(async () => {
      try {
        await updateProperty(propertyId, formToUpdatePayload(form));
        onSuccess?.();
        router.refresh();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Could not update property.",
        );
      }
    });
  };

  const clearActionError = useCallback(() => setActionError(null), []);

  return {
    actionError,
    isPending,
    submitCreate,
    submitUpdate,
    clearActionError
  };
};

export type PropertyActions = ReturnType<typeof usePropertyActions>;
