import type {
  IpoDetailResponse,
  IpoSubscriptionSummaryResponse,
  IpoSummaryResponse
} from "@/types/backend";
import { formatDateTime, formatNumber, formatPaise } from "@/lib/format";

export type IpoDetailMetadataItem = {
  label: string;
  value: string;
  testId: string;
};

export const getIpoDetailId = (detail: IpoDetailResponse) => detail.id;

export const mapIpoDetailMetadata = (
  detail: IpoDetailResponse,
): IpoDetailMetadataItem[] => [
  {
    label: "IPO ID",
    value: getIpoDetailId(detail),
    testId: "ipo-detail-id"
  },
  {
    label: "Property ID",
    value: detail.propertyId,
    testId: "ipo-detail-property-id"
  },
  {
    label: "Status",
    value: detail.status,
    testId: "ipo-detail-status"
  },
  {
    label: "Subscribed Tokens",
    value:
      detail.subscribedTokens == null
        ? "Unavailable"
        : formatNumber(detail.subscribedTokens),
    testId: "ipo-detail-subscribed-tokens"
  }
];

export type IpoRow = {
  name: string;
  id: string;
  location: string;
  supply: string;
  price: string;
  startTime: string;
  endTime: string;
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

export const mapSubscriptionToProgress = (
  summary: IpoSubscriptionSummaryResponse | null | undefined,
  isLoading = false,
) => {
  if (isLoading && !summary) {
    return { progress: 0, progressLabel: "Loading..." };
  }

  if (!summary) {
    return { progress: 0, progressLabel: "Unavailable" };
  }

  return {
    progress: normalizeSubscriptionPercent(summary.subscriptionPercent),
    progressLabel: `${formatNumber(summary.subscribedTokens)} / ${formatNumber(summary.totalTokens)}`
  };
};

export function mapIpoToRow(
  ipo: IpoSummaryResponse,
  subscription?: IpoSubscriptionSummaryResponse | null,
  isSubscriptionLoading = false,
): IpoRow {
  const status = mapIpoStatus(ipo.status);
  const subscriptionProgress = mapSubscriptionToProgress(
    subscription,
    isSubscriptionLoading,
  );

  return {
    name: ipo.propertyTitle,
    id: ipo.ipoId,
    location: ipo.propertyLocation,
    supply: formatNumber(ipo.totalTokens),
    price: formatPaise(ipo.tokenPrice),
    startTime: formatDateTime(ipo.startTime),
    endTime: formatDateTime(ipo.endTime),
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
