import type { PropertyResponse } from "@/types/backend";
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

export const propertyToForm = (
  property: PropertyResponse,
): PropertyFormValues => ({
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
