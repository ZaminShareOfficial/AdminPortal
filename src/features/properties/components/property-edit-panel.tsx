"use client";

import {
  Button,
  Input,
  Label,
  TextField
} from "@heroui/react";
import { useEffect, useState } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { Icon } from "@/components/admin/icon";
import {
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPES
} from "@/constants/property";
import {
  propertyToForm,
  usePropertyActions
} from "@/features/properties/hooks";
import type { PropertyFormValues } from "@/features/properties/types";
import type { PropertyResponse } from "@/types/backend";
import { getPropertyStatusClass, mapPropertyStatus } from "@/lib/mappers/property";

type PropertyEditPanelProps = {
  property: PropertyResponse | null;
};

export const PropertyEditPanel = ({ property }: PropertyEditPanelProps) => {
  const [form, setForm] = useState<PropertyFormValues | null>(null);
  const { actionError, isPending, submitUpdate } = usePropertyActions();

  // useEffect justified: sync — load form state when the selected property changes
  useEffect(() => {
    if (!property) {
      setForm(null);
      return;
    }

    setForm(propertyToForm(property));
  }, [property?.id]);

  if (!property || !form) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select a property from the list to view and edit live backend data.
      </p>
    );
  }

  const statusLabel = mapPropertyStatus(property.status);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Edit Asset
        </h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          PATCH /admin/properties/{property.id}
        </p>
      </div>

      <TextField
        name="title"
        value={form.title}
        onChange={(value) => setForm({ ...form, title: value })}
      >
        <Label>Title</Label>
        <Input data-testid="edit-property-title" />
      </TextField>

      <TextField
        name="location"
        value={form.location}
        onChange={(value) => setForm({ ...form, location: value })}
      >
        <Label>Location</Label>
        <Input data-testid="edit-property-location" />
      </TextField>

      <TextField
        name="valuation"
        value={form.valuation}
        onChange={(value) => setForm({ ...form, valuation: value })}
      >
        <Label>Valuation (USD)</Label>
        <Input data-testid="edit-property-valuation" />
      </TextField>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          name="tokenSupply"
          value={form.tokenSupply}
          onChange={(value) => setForm({ ...form, tokenSupply: value })}
        >
          <Label>Token supply</Label>
          <Input data-testid="edit-property-supply" />
        </TextField>
        <TextField
          name="tokenPrice"
          value={form.tokenPrice}
          onChange={(value) => setForm({ ...form, tokenPrice: value })}
        >
          <Label>Token price (USD)</Label>
          <Input data-testid="edit-property-price" />
        </TextField>
      </div>

      <TextField
        name="listingBroker"
        value={form.listingBroker}
        onChange={(value) => setForm({ ...form, listingBroker: value })}
      >
        <Label>Listing broker</Label>
        <Input data-testid="edit-property-broker" />
      </TextField>

      <EnumSelect
        label="Property type"
        value={form.propertyType}
        options={PROPERTY_TYPES.map((type) => ({
          id: type.value,
          label: type.label
        }))}
        onChange={(propertyType) => setForm({ ...form, propertyType })}
        testId="edit-property-type"
      />

      <EnumSelect
        label="Status"
        value={form.status}
        options={PROPERTY_STATUS_OPTIONS.map((status) => ({
          id: status.value,
          label: status.label
        }))}
        onChange={(status) => setForm({ ...form, status })}
        testId="edit-property-status"
      />

      <div className="rounded bg-surface-container-lowest p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Current status
        </p>
        <span
          className={`mt-2 inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase ${getPropertyStatusClass(statusLabel)}`}
        >
          {statusLabel}
        </span>
      </div>

      {actionError ? (
        <p className="text-sm text-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <Button
        variant="primary"
        className="w-full"
        isDisabled={isPending}
        onPress={() => submitUpdate(property.id, form)}
        data-testid="save-property-button"
      >
        <Icon name="save" className="text-base" />
        {isPending ? "Saving..." : "Save changes"}
      </Button>
    </div>
  );
};
