"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { parseDollarsToPaise } from "@/lib/format";
import {
  createIpo,
  mintIpo,
  updateIpoStatus
} from "@/features/ipo/services/ipo-client";
import type { IpoFormValues } from "@/features/ipo/types";

export const emptyIpoForm = (): IpoFormValues => ({
  propertyId: "",
  tokenPrice: "",
  totalTokens: "",
  minSubscription: "",
  startTime: "",
  endTime: ""
});

const toCreatePayload = (form: IpoFormValues) => {
  const tokenPrice = parseDollarsToPaise(form.tokenPrice);
  const totalTokens = Number(form.totalTokens);
  const minSubscription = parseDollarsToPaise(form.minSubscription);

  if (!form.propertyId) {
    throw new Error("Select an approved property.");
  }
  if (!form.startTime || !form.endTime) {
    throw new Error("Start and end times are required.");
  }
  if (
    tokenPrice == null ||
    minSubscription == null ||
    Number.isNaN(totalTokens)
  ) {
    throw new Error("Token price, supply, and minimum subscription are required.");
  }

  return {
    propertyId: form.propertyId,
    tokenPrice,
    totalTokens,
    minSubscription,
    startTime: new Date(form.startTime).toISOString(),
    endTime: new Date(form.endTime).toISOString()
  };
};

export const useIpoActions = () => {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const submitCreate = useCallback(
    (form: IpoFormValues, onSuccess: () => void) => {
      setActionError(null);
      startTransition(async () => {
        try {
          await createIpo(toCreatePayload(form));
          onSuccess();
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not create IPO.",
          );
        }
      });
    },
    [refresh],
  );

  const pauseIpo = useCallback(
    (ipoId: string) => {
      setActionError(null);
      startTransition(async () => {
        try {
          await updateIpoStatus(ipoId, "PAUSED");
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not pause IPO.",
          );
        }
      });
    },
    [refresh],
  );

  const resumeIpo = useCallback(
    (ipoId: string) => {
      setActionError(null);
      startTransition(async () => {
        try {
          await updateIpoStatus(ipoId, "CREATED");
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not resume IPO.",
          );
        }
      });
    },
    [refresh],
  );

  const submitMint = useCallback(
    (ipoId: string) => {
      setActionError(null);
      startTransition(async () => {
        try {
          await mintIpo(ipoId);
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not mint IPO.",
          );
        }
      });
    },
    [refresh],
  );

  const clearActionError = useCallback(() => setActionError(null), []);

  return {
    actionError,
    isPending,
    submitCreate,
    pauseIpo,
    resumeIpo,
    submitMint,
    clearActionError
  };
};
