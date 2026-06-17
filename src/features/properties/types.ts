import type { PropertyResponse } from "@/types/backend";

export type PropertiesContentProps = {
  initialProperties: PropertyResponse[];
  error?: string | null;
};

export type PropertyFormValues = {
  title: string;
  location: string;
  valuation: string;
  tokenSupply: string;
  tokenPrice: string;
  listingBroker: string;
  promoterBroker: string;
  propertyType: string;
  status: string;
};
