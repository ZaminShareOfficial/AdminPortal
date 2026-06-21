"use client";

import {
  Label,
  ListBox,
  ListBoxItem,
  Select
} from "@heroui/react";
import { useMemo } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { mapPropertyToDetail } from "@/lib/mappers/property";
import type { PropertyResponse } from "@/types/backend";

const EMPTY_PROPERTY_OPTION_ID = "__no-created-properties__";

type PropertyIpoDetailsProps = {
  property: PropertyResponse | null;
  hasEligibleProperties: boolean;
};

export const PropertyIpoDetails = ({
  property,
  hasEligibleProperties
}: PropertyIpoDetailsProps) => {
  if (!hasEligibleProperties) {
    return null;
  }

  if (!property) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select a property in Approved status to review its details before
        launching the IPO.
      </p>
    );
  }

  const detail = mapPropertyToDetail(property);

  return (
    <div className="space-y-4 rounded-lg border border-outline-variant/10 bg-surface-container-low p-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Property
        </p>
        <p className="mt-1 font-headline text-lg font-bold text-on-surface">
          {detail.name}
        </p>
        <p className="text-xs text-on-surface-variant">{detail.location}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <DetailField label="Valuation" value={detail.valuation} />
        <DetailField label="Token supply" value={detail.tokenSupply} />
        <DetailField label="Token price" value={detail.tokenPrice} />
        <DetailField label="Status" value={detail.status} />
        <DetailField label="Broker" value={detail.broker} />
        <DetailField label="Property ID" value={detail.id} />
      </div>
    </div>
  );
};

type PropertyIpoSelectProps = {
  properties: PropertyResponse[];
  selectedPropertyId: string;
  onSelect: (propertyId: string) => void;
};

export const PropertyIpoSelect = ({
  properties,
  selectedPropertyId,
  onSelect
}: PropertyIpoSelectProps) => {
  const options = useMemo(
    () =>
      properties.map((property) => ({
        id: property.id,
        label: `${property.title} — ${property.location}`
      })),
    [properties],
  );

  if (properties.length === 0) {
    return (
      <div className="space-y-2">
        <Select isDisabled selectedKey={EMPTY_PROPERTY_OPTION_ID}>
          <Label>Property</Label>
          <Select.Trigger data-testid="launch-ipo-property-select">
            <Select.Value>No properties in Approved status</Select.Value>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox
              items={[
                {
                  id: EMPTY_PROPERTY_OPTION_ID,
                  label: "No properties in Approved status"
                }
              ]}
            >
              {(item) => (
                <ListBoxItem id={item.id} textValue={item.label}>
                  {item.label}
                </ListBoxItem>
              )}
            </ListBox>
          </Select.Popover>
        </Select>
        <p
          className="text-xs text-on-surface-variant"
          data-testid="launch-ipo-empty-hint"
        >
          Create a property on the Properties page and set its status to Approved
          before launching an IPO.
        </p>
      </div>
    );
  }

  return (
    <EnumSelect
      label="Property"
      value={selectedPropertyId}
      options={options}
      onChange={onSelect}
      testId="launch-ipo-property-select"
    />
  );
};

type DetailFieldProps = {
  label: string;
  value: string;
};

const DetailField = ({ label, value }: DetailFieldProps) => (
  <div className="rounded bg-surface-container p-3">
    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
      {label}
    </p>
    <p className="text-sm font-semibold text-on-surface">{value}</p>
  </div>
);
