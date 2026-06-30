import type { PropertyResponse } from "@/types/backend";
import { IPO_STATUS, PRE_MINT_IPO_STATUSES } from "@/constants/ipo";
import { PROPERTY_STATUS } from "@/constants/property";

export const getLaunchEligibleProperties = (
  properties: PropertyResponse[],
) => properties.filter((property) => property.status === PROPERTY_STATUS.APPROVED);

export const IPO_TOGGLE_STATUS = {
  OPEN: IPO_STATUS.CREATED,
  PAUSED: IPO_STATUS.PAUSED
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

export const isPreMintIpoStatus = (status: string) =>
  PRE_MINT_IPO_STATUSES.includes(status as (typeof PRE_MINT_IPO_STATUSES)[number]);

export const canMintIpo = (status: string) => isPreMintIpoStatus(status);

export const canFailIpo = (status: string) => isPreMintIpoStatus(status);
