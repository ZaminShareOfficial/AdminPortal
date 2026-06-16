import type { PropertyResponse } from "@/types/backend";
import { formatNumber, formatUsd } from "@/lib/format";

export type PropertyRowStatus =
  | "Verified"
  | "Pending Review"
  | "IPO Active"
  | "IPO Paused"
  | "IPO Closed"
  | "Trading";

export type PropertyRow = {
  id: string;
  name: string;
  location: string;
  broker: string;
  brokerLink?: boolean;
  tokens: string;
  price: string;
  status: PropertyRowStatus;
  selected?: boolean;
};

const statusStyles: Record<PropertyRowStatus, string> = {
  Verified: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  "Pending Review":
    "border border-secondary/20 bg-secondary-container/20 text-secondary",
  "IPO Active":
    "border border-secondary/20 bg-secondary-container/20 text-secondary",
  "IPO Paused":
    "border border-outline-variant/20 bg-surface-container-high text-on-surface-variant",
  "IPO Closed":
    "border border-tertiary/20 bg-tertiary/10 text-tertiary",
  Trading: "border border-primary/20 bg-primary-container/20 text-primary",
};

export function mapPropertyStatus(
  status: PropertyResponse["status"],
): PropertyRowStatus {
  switch (status) {
    case "APPROVED":
      return "Verified";
    case "IPO_OPEN":
      return "IPO Active";
    case "IPO_PAUSE":
      return "IPO Paused";
    case "IPO_CLOSED":
      return "IPO Closed";
    case "TRADING":
      return "Trading";
    case "DRAFT":
    default:
      return "Pending Review";
  }
}

export function mapPropertyToRow(property: PropertyResponse): PropertyRow {
  return {
    id: property.id,
    name: property.title,
    location: property.location,
    broker: property.listingBroker ?? "—",
    brokerLink: Boolean(property.listingBroker),
    tokens: formatNumber(property.tokenSupply),
    price: formatUsd(property.valuation),
    status: mapPropertyStatus(property.status),
  };
}

export function mapPropertyToDetail(property: PropertyResponse) {
  return {
    id: property.id,
    name: property.title,
    location: property.location,
    broker: property.listingBroker ?? "—",
    valuation: formatUsd(property.valuation),
    tokenSupply: formatNumber(property.tokenSupply),
    tokenPrice: formatUsd(property.tokenPrice),
    status: mapPropertyStatus(property.status),
  };
}

export function getPropertyStatusClass(status: PropertyRowStatus) {
  return statusStyles[status];
}
