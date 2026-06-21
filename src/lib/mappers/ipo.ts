import type { IpoDetailResponse, IpoSummaryResponse } from "@/types/backend";
import { formatNumber, formatPaise } from "@/lib/format";

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

export const normalizeSubscriptionPercent = (
  subscriptionPercent: number,
): number => {
  const percent =
    subscriptionPercent <= 1
      ? subscriptionPercent * 100
      : subscriptionPercent;

  return Math.min(100, Math.max(0, Math.round(percent)));
};

export const computeSubscriptionPercent = (
  subscribedTokens: number | null | undefined,
  totalTokens: number | null | undefined,
): number => {
  if (
    subscribedTokens == null ||
    totalTokens == null ||
    totalTokens <= 0
  ) {
    return 0;
  }

  return normalizeSubscriptionPercent(subscribedTokens / totalTokens);
};

export const mapIpoDetailToProgress = (
  detail: IpoDetailResponse | null | undefined,
  isLoading = false,
) => {
  if (isLoading && !detail) {
    return { progress: 0, progressLabel: "Loading..." };
  }

  if (!detail) {
    return { progress: 0, progressLabel: "Unavailable" };
  }

  return {
    progress: computeSubscriptionPercent(
      detail.subscribedTokens,
      detail.totalTokens,
    ),
    progressLabel: `${formatNumber(detail.subscribedTokens)} / ${formatNumber(detail.totalTokens)}`
  };
};

export function mapIpoToRow(
  ipo: IpoSummaryResponse,
  detail?: IpoDetailResponse | null,
  isDetailLoading = false,
): IpoRow {
  const status = mapIpoStatus(ipo.status);
  const subscriptionProgress = mapIpoDetailToProgress(
    detail,
    isDetailLoading,
  );

  return {
    name: ipo.propertyTitle,
    id: ipo.ipoId,
    location: ipo.propertyLocation,
    supply: formatNumber(ipo.totalTokens),
    price: formatPaise(ipo.tokenPrice),
    progress: subscriptionProgress.progress,
    progressLabel: subscriptionProgress.progressLabel,
    status: status.label,
    statusColor: status.statusColor,
    dotColor: status.dotColor,
    active: status.active,
    highlighted: status.highlighted,
    dimmed: status.dimmed,
  };
}
