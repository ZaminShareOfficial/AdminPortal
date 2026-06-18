import type { PropertyStatus, PropertyType } from "@/types/backend";
import { PROPERTY_STATUS_OPTIONS } from "@/constants/property";
import { PROPERTY_TYPES } from "@/constants/property";

const propertyTypeSet = new Set<string>(PROPERTY_TYPES.map((type) => type.value));
const propertyStatusSet = new Set<string>(
  PROPERTY_STATUS_OPTIONS.map((status) => status.value),
);

export const parsePropertyType = (value: string): PropertyType => {
  if (!propertyTypeSet.has(value)) {
    throw new Error("Invalid property type.");
  }
  return value as PropertyType;
};

export const parsePropertyStatus = (value: string): PropertyStatus => {
  if (!propertyStatusSet.has(value)) {
    throw new Error("Invalid property status.");
  }
  return value as PropertyStatus;
};
