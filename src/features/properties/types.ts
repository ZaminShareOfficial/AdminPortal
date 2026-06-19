import type { PropertyResponse } from "@/types/backend";

export type PropertiesContentProps = {
  initialProperties: PropertyResponse[];
  error?: string | null;
};

/** Mirrors POST/PATCH /admin/properties accepted body fields. */
export type PropertyCreateFormValues = {
  title: string;
  location: string;
  valuation: string;
  tokenSupply: string;
  tokenPrice: string;
  latitude: string;
  longitude: string;
  photos: string;
  documents: string;
  listingBroker: string;
  propertyType: string;
  status: string;
};

export type PropertyFormFieldErrors = Partial<
  Record<keyof PropertyCreateFormValues, string>
>;
