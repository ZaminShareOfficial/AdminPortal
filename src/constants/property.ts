import type { EnumSelectOption } from "@/components/admin/enum-select";
import type { PropertyStatus, PropertyType } from "@/types/backend";

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "AGRICULTURE", label: "Agriculture" },
  { value: "PLOT", label: "Plot" }
];

/** All backend API status values. */
export const PROPERTY_STATUS = {
  DRAFT: "DRAFT",
  APPROVED: "APPROVED",
  IPO_OPEN: "IPO_OPEN",
  IPO_PAUSE: "IPO_PAUSE",
  IPO_CLOSED: "IPO_CLOSED",
  TRADING: "TRADING"
} as const satisfies Record<string, PropertyStatus>;

/** Four display statuses used in tables and labels. */
export const PROPERTY_STATUS_OPTIONS = [
  { value: PROPERTY_STATUS.DRAFT, label: "Draft" },
  { value: PROPERTY_STATUS.APPROVED, label: "Approved" },
  { value: PROPERTY_STATUS.IPO_OPEN, label: "IPO" },
  { value: PROPERTY_STATUS.TRADING, label: "Listed" }
] as const;

/** Statuses admins may set from the property edit form. */
export const PROPERTY_EDITABLE_STATUS_OPTIONS = [
  { value: PROPERTY_STATUS.DRAFT, label: "Draft" },
  { value: PROPERTY_STATUS.APPROVED, label: "Approved" }
] as const;

export type PropertyFormStatus = (typeof PROPERTY_STATUS_OPTIONS)[number]["value"];

export type PropertyEditableStatus =
  (typeof PROPERTY_EDITABLE_STATUS_OPTIONS)[number]["value"];

const displayLabels: Record<PropertyFormStatus, string> = {
  DRAFT: "Draft",
  APPROVED: "Approved",
  IPO_OPEN: "IPO",
  TRADING: "Listed"
};

export const getPropertyStatusLabel = (status: PropertyStatus): string => {
  switch (status) {
    case PROPERTY_STATUS.DRAFT:
      return displayLabels.DRAFT;
    case PROPERTY_STATUS.APPROVED:
      return displayLabels.APPROVED;
    case PROPERTY_STATUS.IPO_OPEN:
    case PROPERTY_STATUS.IPO_PAUSE:
    case PROPERTY_STATUS.IPO_CLOSED:
      return displayLabels.IPO_OPEN;
    case PROPERTY_STATUS.TRADING:
      return displayLabels.TRADING;
    default:
      return status;
  }
};

export const normalizePropertyStatusForForm = (
  status: PropertyStatus,
): PropertyFormStatus => {
  switch (status) {
    case PROPERTY_STATUS.DRAFT:
      return PROPERTY_STATUS.DRAFT;
    case PROPERTY_STATUS.APPROVED:
      return PROPERTY_STATUS.APPROVED;
    case PROPERTY_STATUS.IPO_OPEN:
    case PROPERTY_STATUS.IPO_PAUSE:
    case PROPERTY_STATUS.IPO_CLOSED:
      return PROPERTY_STATUS.IPO_OPEN;
    case PROPERTY_STATUS.TRADING:
      return PROPERTY_STATUS.TRADING;
    default:
      return PROPERTY_STATUS.DRAFT;
  }
};

export const isEditablePropertyStatus = (
  status: PropertyStatus,
): status is PropertyEditableStatus =>
  status === PROPERTY_STATUS.DRAFT || status === PROPERTY_STATUS.APPROVED;

export const PROPERTY_TYPE_SELECT_OPTIONS: EnumSelectOption[] = PROPERTY_TYPES.map(
  (type) => ({
    id: type.value,
    label: type.label
  })
);

export const PROPERTY_STATUS_SELECT_OPTIONS: EnumSelectOption[] =
  PROPERTY_STATUS_OPTIONS.map((status) => ({
    id: status.value,
    label: status.label
  }));

export const PROPERTY_EDITABLE_STATUS_SELECT_OPTIONS: EnumSelectOption[] =
  PROPERTY_EDITABLE_STATUS_OPTIONS.map((status) => ({
    id: status.value,
    label: status.label
  }));

export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;
