import type { IpoSummaryResponse } from "@/types/backend";

export type IpoContentProps = {
  initialIpos: IpoSummaryResponse[];
  error?: string | null;
};
