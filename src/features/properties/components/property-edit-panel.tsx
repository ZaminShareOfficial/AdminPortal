"use client";

import {
  Button,
  Input,
  Label,
  TextArea,
  TextField
} from "@heroui/react";
import { useState } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { Icon } from "@/components/admin/icon";
import { PROPERTY_TYPE_SELECT_OPTIONS } from "@/constants/property";
import { propertyToForm } from "@/features/properties/mappers";
import type { PropertyActions } from "@/features/properties/use-property-actions";
import type { PropertyCreateFormValues } from "@/features/properties/types";
import type { PropertyResponse } from "@/types/backend";
import { getPropertyStatusClass, mapPropertyStatus } from "@/lib/mappers/property";

type PropertyEditFormProps = {
  property: PropertyResponse;
  propertyActions: PropertyActions;
};

const PropertyEditForm = ({
  property,
  propertyActions
}: PropertyEditFormProps) => {
  const [form, setForm] = useState<PropertyCreateFormValues>(() =>
    propertyToForm(property),
  );
  const { actionError, isPending, submitUpdate } = propertyActions;
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

      <div className="grid grid-cols-2 gap-4">
        <TextField
          name="latitude"
          value={form.latitude}
          onChange={(value) => setForm({ ...form, latitude: value })}
        >
          <Label>Latitude</Label>
          <Input data-testid="edit-property-latitude" />
        </TextField>
        <TextField
          name="longitude"
          value={form.longitude}
          onChange={(value) => setForm({ ...form, longitude: value })}
        >
          <Label>Longitude</Label>
          <Input data-testid="edit-property-longitude" />
        </TextField>
      </div>

      <TextField
        name="photos"
        value={form.photos}
        onChange={(value) => setForm({ ...form, photos: value })}
      >
        <Label>Photo URLs</Label>
        <TextArea data-testid="edit-property-photos" rows={3} />
      </TextField>

      <TextField
        name="documents"
        value={form.documents}
        onChange={(value) => setForm({ ...form, documents: value })}
      >
        <Label>Document URLs</Label>
        <TextArea data-testid="edit-property-documents" rows={3} />
      </TextField>

      <EnumSelect
        label="Property type"
        value={form.propertyType}
        options={PROPERTY_TYPE_SELECT_OPTIONS}
        onChange={(propertyType) => setForm({ ...form, propertyType })}
        testId="edit-property-type"
      />

      <div className="rounded bg-surface-container-lowest p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Status (read-only)
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

type PropertyEditPanelProps = {
  property: PropertyResponse | null;
  propertyActions: PropertyActions;
};

export const PropertyEditPanel = ({
  property,
  propertyActions
}: PropertyEditPanelProps) => {
  if (!property) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select a property from the list to view and edit live backend data.
      </p>
    );
  }

  return (
    <PropertyEditForm
      key={property.id}
      property={property}
      propertyActions={propertyActions}
    />
  );
};
