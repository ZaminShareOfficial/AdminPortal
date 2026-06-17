"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { parseDollarsToPaise } from "@/lib/format";
import {
  parsePropertyStatus,
  parsePropertyType
} from "@/lib/validators/property";
import {
  createProperty,
  updateProperty
} from "@/features/properties/services/PropertiesApiService";
import type { PropertyFormValues } from "@/features/properties/types";

const toCreatePayload = (form: PropertyFormValues) => {
  const valuation = parseDollarsToPaise(form.valuation);
  const tokenPrice = parseDollarsToPaise(form.tokenPrice);
  const tokenSupply = Number(form.tokenSupply);

  if (!form.title.trim() || !form.location.trim()) {
    throw new Error("Title and location are required.");
  }
  if (valuation == null || tokenPrice == null || Number.isNaN(tokenSupply)) {
    throw new Error("Valuation, token supply, and token price are required.");
  }

  return {
    title: form.title.trim(),
    location: form.location.trim(),
    valuation,
    tokenSupply,
    tokenPrice,
    listingBroker: form.listingBroker.trim() || undefined,
    promoterBroker: form.promoterBroker.trim() || undefined,
    propertyType: parsePropertyType(form.propertyType)
  };
};

export const usePropertyActions = () => {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submitCreate = (form: PropertyFormValues, onSuccess: () => void) => {
    setActionError(null);
    startTransition(async () => {
      try {
        await createProperty(toCreatePayload(form));
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
    form: PropertyFormValues,
    onSuccess?: () => void,
  ) => {
    setActionError(null);
    startTransition(async () => {
      try {
        const valuation = parseDollarsToPaise(form.valuation);
        const tokenPrice = parseDollarsToPaise(form.tokenPrice);
        const tokenSupply = Number(form.tokenSupply);

        await updateProperty(propertyId, {
          title: form.title.trim(),
          location: form.location.trim(),
          valuation: valuation ?? undefined,
          tokenSupply: Number.isNaN(tokenSupply) ? undefined : tokenSupply,
          tokenPrice: tokenPrice ?? undefined,
          listingBroker: form.listingBroker.trim() || undefined,
          promoterBroker: form.promoterBroker.trim() || undefined,
          propertyType: parsePropertyType(form.propertyType),
          status: parsePropertyStatus(form.status)
        });
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
