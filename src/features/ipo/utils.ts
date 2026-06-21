import type { PropertyResponse } from "@/types/backend";
import { PROPERTY_STATUS } from "@/constants/property";

export const getLaunchEligibleProperties = (
  properties: PropertyResponse[],
) => properties.filter((property) => property.status === PROPERTY_STATUS.APPROVED);
