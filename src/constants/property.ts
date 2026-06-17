import type { PropertyType } from "@/types/backend";

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "AGRICULTURE", label: "Agriculture" },
  { value: "PLOT", label: "Plot" }
];

export const PROPERTY_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "APPROVED", label: "Approved" },
  { value: "IPO_OPEN", label: "IPO Open" },
  { value: "IPO_PAUSE", label: "IPO Paused" },
  { value: "IPO_CLOSED", label: "IPO Closed" },
  { value: "TRADING", label: "Trading" }
] as const;
