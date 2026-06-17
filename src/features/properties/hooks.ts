"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PropertyResponse, PropertyType } from "@/types/backend";
import { parseDollarsToPaise } from "@/lib/format";
import {
  createProperty,
  updateProperty
} from "@/features/properties/services/properties-client";
import type { PropertyFormValues } from "@/features/properties/types";

export const emptyPropertyForm = (): PropertyFormValues => ({
  title: "",
  location: "",
  valuation: "",
  tokenSupply: "",
  tokenPrice: "",
  listingBroker: "",
  promoterBroker: "",
  propertyType: "RESIDENTIAL",
  status: "DRAFT"
});

export const propertyToForm = (property: PropertyResponse): PropertyFormValues => ({
  title: property.title,
  location: property.location,
  valuation: property.valuation != null ? String(property.valuation / 100) : "",
  tokenSupply:
    property.tokenSupply != null ? String(property.tokenSupply) : "",
  tokenPrice:
    property.tokenPrice != null ? String(property.tokenPrice / 100) : "",
  listingBroker: property.listingBroker ?? "",
  promoterBroker: property.promoterBroker ?? "",
  propertyType: property.propertyType ?? "RESIDENTIAL",
  status: property.status
});

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
    propertyType: form.propertyType as PropertyType
  };
};

export const usePropertyActions = () => {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const submitCreate = useCallback(
    (form: PropertyFormValues, onSuccess: () => void) => {
      setActionError(null);
      startTransition(async () => {
        try {
          await createProperty(toCreatePayload(form));
          onSuccess();
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not create property.",
          );
        }
      });
    },
    [refresh],
  );

  const submitUpdate = useCallback(
    (propertyId: string, form: PropertyFormValues, onSuccess?: () => void) => {
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
            propertyType: form.propertyType as PropertyType,
            status: form.status as PropertyResponse["status"]
          });
          onSuccess?.();
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not update property.",
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
    submitUpdate,
    clearActionError
  };
};
