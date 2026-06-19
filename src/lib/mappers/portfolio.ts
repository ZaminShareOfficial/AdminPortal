import type {
  PropertyHolderResponse,
  PropertyHoldersResponse,
  PropertyPortfolioSummaryResponse,
  UserPortfolioResponse,
} from "@/types/backend";
import {
  formatNumber,
  formatPaise,
  formatPercent
} from "@/lib/format";

export type UserRow = {
  id: string;
  initials: string;
  name: string;
  location: string;
  kyc: string;
  kycClass: string;
  portfolio: string;
  referral: string;
  actions: "default" | "pending" | "suspended";
  highlighted?: boolean;
  dimmed?: boolean;
};

export type HolderRow = {
  rank: string;
  wallet: string;
  userName: string;
  kyc: string;
  kycDot: string;
  tokens: string;
  pct: string;
  barColor: string;
  barWidth: string;
  gradient: string;
  highlighted?: boolean;
};

export type FinanceInvestorRow = {
  initials: string;
  color: string;
  name: string;
  id: string;
  period: string;
  volume: string;
  commission: string;
  status: string;
  action: string;
  highlighted?: boolean;
  commissionMuted?: boolean;
};

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function shortId(value: string) {
  if (value.length <= 10) {
    return value;
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

export function mapUserPortfolioToRow(
  portfolio: UserPortfolioResponse,
  index: number,
): UserRow {
  const name = portfolio.userName || "Unknown user";
  const hasHoldings = (portfolio.holdings?.length ?? 0) > 0;
  const returns = portfolio.totalReturnsPercentage ?? 0;

  return {
    id: `#USR-${portfolio.userId?.slice(0, 8).toUpperCase() || index}`,
    initials: initialsFromName(name),
    name,
    location: portfolio.holdings?.[0]?.propertyLocation ?? "—",
    kyc: hasHoldings ? "VERIFIED" : "PENDING",
    kycClass: hasHoldings
      ? "border-tertiary/20 bg-tertiary/10 text-tertiary"
      : "border-primary/30 bg-primary-container/20 text-primary",
    portfolio: formatPaise(portfolio.totalCurrentAmount),
    referral: `${portfolio.holdings?.length ?? 0} assets`,
    actions: hasHoldings ? "default" : "pending",
    highlighted: index === 1,
    dimmed: returns < 0,
  };
}

export function mapHolderToRow(
  holder: PropertyHolderResponse,
  rank: number,
): HolderRow {
  const pct = holder.percentageHolding ?? 0;

  return {
    rank: `#${String(rank).padStart(2, "0")}`,
    wallet: shortId(holder.userId),
    userName: holder.userName,
    kyc: "Portfolio Holder",
    kycDot: "bg-success",
    tokens: formatNumber(holder.tokenQuantity),
    pct: formatPercent(pct),
    barColor: rank <= 2 ? "bg-primary" : "bg-secondary",
    barWidth: `${Math.min(pct, 100)}%`,
    gradient:
      rank === 1
        ? "from-primary to-secondary"
        : rank === 2
          ? "from-tertiary to-tertiary-container"
          : "from-on-surface-variant to-background",
    highlighted: rank === 2,
  };
}

export function mapPortfolioToFinanceRow(
  portfolio: UserPortfolioResponse,
  index: number,
): FinanceInvestorRow {
  const name = portfolio.userName || "Unknown investor";
  const returns = portfolio.totalReturnsPercentage ?? 0;

  return {
    initials: initialsFromName(name),
    color:
      returns >= 0
        ? "text-secondary"
        : index % 2 === 0
          ? "text-primary"
          : "text-tertiary",
    name,
    id: portfolio.userId,
    period: `${portfolio.holdings?.length ?? 0} holdings`,
    volume: formatPaise(portfolio.totalInvestedAmount),
    commission: formatPaise(
      (portfolio.totalCurrentAmount ?? 0) - (portfolio.totalInvestedAmount ?? 0),
    ),
    status: returns >= 0 ? "PROCESSED" : "PENDING",
    action: returns >= 0 ? "receipt_long" : "arrow_forward",
    highlighted: index === 1,
    commissionMuted: returns < 0,
  };
}

export function summarizePortfolios(portfolios: UserPortfolioResponse[]) {
  const totalInvested = portfolios.reduce(
    (sum, item) => sum + (item.totalInvestedAmount ?? 0),
    0,
  );
  const totalCurrent = portfolios.reduce(
    (sum, item) => sum + (item.totalCurrentAmount ?? 0),
    0,
  );

  return {
    totalInvested,
    totalCurrent,
    netGain: totalCurrent - totalInvested,
    investorCount: portfolios.length,
  };
}

export function summarizePropertyPortfolio(
  property: PropertyHoldersResponse | PropertyPortfolioSummaryResponse,
) {
  const holderCount =
    "holders" in property
      ? property.holders.length
      : (property.holderCount ?? 0);

  const largestPct =
    "holders" in property
      ? (property.holders[0]?.percentageHolding ?? 0)
      : 0;

  return {
    totalTokens: formatNumber(property.totalTokens),
    holderCount: formatNumber(holderCount),
    largestPct: formatPercent(largestPct),
    currentPrice: formatPaise(property.currentPrice),
    ipoPrice: formatPaise(property.ipoPrice),
  };
}

export function mapPropertySummaryToFinanceMetric(
  summary: PropertyPortfolioSummaryResponse,
) {
  return {
    label: summary.propertyTitle,
    invested: formatPaise(
      (summary.currentPrice ?? 0) * (summary.totalTokens ?? 0),
    ),
    returns: formatPercent(summary.returnsPercentage),
    holders: formatNumber(summary.holderCount),
  };
}
