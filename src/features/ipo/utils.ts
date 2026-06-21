import type { PropertyResponse } from "@/types/backend";
import { PROPERTY_STATUS } from "@/constants/property";

export const getLaunchEligibleProperties = (
  properties: PropertyResponse[],
) => properties.filter((property) => property.status === PROPERTY_STATUS.APPROVED);

export const IPO_TOGGLE_STATUS = {
  OPEN: "CREATED",
  PAUSED: "PAUSED"
} as const;

export const getIpoToggleTarget = (
  status: string,
): typeof IPO_TOGGLE_STATUS.OPEN | typeof IPO_TOGGLE_STATUS.PAUSED | null => {
  if (status === IPO_TOGGLE_STATUS.OPEN) {
    return IPO_TOGGLE_STATUS.PAUSED;
  }

  if (status === IPO_TOGGLE_STATUS.PAUSED) {
    return IPO_TOGGLE_STATUS.OPEN;
  }

  return null;
};

export const canMintIpo = (status: string) =>
  status === IPO_TOGGLE_STATUS.OPEN || status === IPO_TOGGLE_STATUS.PAUSED;
