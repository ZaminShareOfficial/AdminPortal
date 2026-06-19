import type { EnumSelectOption } from "@/components/admin/enum-select";
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
  { value: "CREATED", label: "Created" },
  { value: "IPO", label: "IPO" },
  { value: "LISTED", label: "Listed" }
] as const;

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

export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;
