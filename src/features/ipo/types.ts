import type { IpoSummaryResponse, PropertyResponse } from "@/types/backend";
import type { IpoRow } from "@/lib/mappers/ipo";

export type IpoContentProps = {
  initialIpos: IpoSummaryResponse[];
  approvedProperties: PropertyResponse[];
  error?: string | null;
};

export type IpoFormValues = {
  propertyId: string;
  tokenPrice: string;
  totalTokens: string;
  minSubscription: string;
  startTime: string;
  endTime: string;
};

export type IpoViewRow = IpoRow & {
  ipoId: string;
  propertyId: string;
  rawStatus: IpoSummaryResponse["status"];
};
