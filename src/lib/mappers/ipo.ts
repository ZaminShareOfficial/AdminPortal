import type { IpoSummaryResponse } from "@/types/backend";
import { formatNumber, formatUsd } from "@/lib/format";

export type IpoRow = {
  name: string;
  id: string;
  location: string;
  supply: string;
  price: string;
  progress: number;
  progressLabel: string;
  status: string;
  statusColor: string;
  dotColor: string;
  active?: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
};

function mapIpoStatus(status: IpoSummaryResponse["status"]) {
  switch (status) {
    case "CREATED":
      return {
        label: "Open",
        statusColor: "text-secondary",
        dotColor: "bg-secondary",
        active: true,
      };
    case "PAUSED":
      return {
        label: "Paused",
        statusColor: "text-on-surface-variant",
        dotColor: "bg-outline-variant",
        dimmed: true,
      };
    case "MINTED":
      return {
        label: "Minted",
        statusColor: "text-tertiary",
        dotColor: "bg-tertiary",
        highlighted: true,
      };
    case "FAILED":
      return {
        label: "Failed",
        statusColor: "text-error",
        dotColor: "bg-error",
        dimmed: true,
      };
    default:
      return {
        label: status,
        statusColor: "text-on-surface-variant",
        dotColor: "bg-outline-variant",
      };
  }
}

export function mapIpoToRow(ipo: IpoSummaryResponse): IpoRow {
  const status = mapIpoStatus(ipo.status);

  return {
    name: ipo.propertyTitle,
    id: ipo.ipoId,
    location: ipo.propertyLocation,
    supply: formatNumber(ipo.totalTokens),
    price: formatUsd(ipo.tokenPrice),
    progress: 0,
    progressLabel: "Live data pending",
    status: status.label,
    statusColor: status.statusColor,
    dotColor: status.dotColor,
    active: status.active,
    highlighted: status.highlighted,
    dimmed: status.dimmed,
  };
}
