import type { PropertyResponse } from "@/types/backend";
import { formatNumber, formatPaise } from "@/lib/format";

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
  Verified: "border border-success/20 bg-success/10 text-success",
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
    price: formatPaise(property.valuation),
    status: mapPropertyStatus(property.status),
  };
}

export function mapPropertyToDetail(property: PropertyResponse) {
  return {
    id: property.id,
    name: property.title,
    location: property.location,
    broker: property.listingBroker ?? "—",
    valuation: formatPaise(property.valuation),
    tokenSupply: formatNumber(property.tokenSupply),
    tokenPrice: formatPaise(property.tokenPrice),
    status: mapPropertyStatus(property.status),
  };
}

export function getPropertyStatusClass(status: PropertyRowStatus) {
  return statusStyles[status];
}
