"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Label,
  TextField
} from "@heroui/react";
import { useState } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { Icon } from "@/components/admin/icon";
import { NumericInputField } from "@/components/admin/numeric-input-field";
import { getTokenRegistryPath } from "@/constants/routes";
import {
  getPropertyStatusLabel,
  isEditablePropertyStatus,
  PROPERTY_EDITABLE_STATUS_SELECT_OPTIONS,
  PROPERTY_STATUS,
  PROPERTY_TYPE_SELECT_OPTIONS
} from "@/constants/property";
import { UrlListUploadField } from "@/features/uploads/components/url-list-upload-field";
import { propertyToForm } from "@/features/properties/mappers";
import type { PropertyActions } from "@/features/properties/use-property-actions";
import type { PropertyCreateFormValues } from "@/features/properties/types";
import type { PropertyResponse } from "@/types/backend";

type PropertyEditFormProps = {
  property: PropertyResponse;
  propertyActions: PropertyActions;
  onUpdateSuccess?: () => void;
};

const PropertyEditForm = ({
  property,
  propertyActions,
  onUpdateSuccess
}: PropertyEditFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<PropertyCreateFormValues>(() =>
    propertyToForm(property),
  );
  const { actionError, isPending, submitUpdate } = propertyActions;
  const canEditStatus = isEditablePropertyStatus(
    property.status ?? PROPERTY_STATUS.DRAFT,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Edit Asset
        </h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          GET /properties/{property.id} · PATCH /admin/properties/{property.id}
        </p>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onPress={() => router.push(getTokenRegistryPath(property.id))}
        data-testid="go-to-registry-button"
      >
        <Icon name="toll" className="text-base" />
        Go to Registry
      </Button>

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

      <NumericInputField
        name="valuation"
        label="Valuation (INR)"
        value={form.valuation}
        onChange={(valuation) => setForm({ ...form, valuation })}
        placeholder="1,28,00,000"
        testId="edit-property-valuation"
      />

      <div className="grid grid-cols-2 gap-4">
        <NumericInputField
          name="tokenSupply"
          label="Token supply"
          value={form.tokenSupply}
          onChange={(tokenSupply) => setForm({ ...form, tokenSupply })}
          placeholder="5,00,000"
          testId="edit-property-supply"
        />
        <NumericInputField
          name="tokenPrice"
          label="Token price (INR)"
          allowDecimal
          value={form.tokenPrice}
          onChange={(tokenPrice) => setForm({ ...form, tokenPrice })}
          placeholder="25.60"
          testId="edit-property-price"
        />
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
        <NumericInputField
          name="latitude"
          label="Latitude"
          allowDecimal
          allowNegative
          maxDecimalPlaces={6}
          value={form.latitude}
          onChange={(latitude) => setForm({ ...form, latitude })}
          placeholder="12.9716"
          testId="edit-property-latitude"
        />
        <NumericInputField
          name="longitude"
          label="Longitude"
          allowDecimal
          allowNegative
          maxDecimalPlaces={6}
          value={form.longitude}
          onChange={(longitude) => setForm({ ...form, longitude })}
          placeholder="77.5946"
          testId="edit-property-longitude"
        />
      </div>

      <UrlListUploadField
        label="Photo URLs"
        value={form.photos}
        onChange={(photos) => setForm({ ...form, photos })}
        category="photos"
        testId="edit-property-photos"
      />

      <UrlListUploadField
        label="Document URLs"
        value={form.documents}
        onChange={(documents) => setForm({ ...form, documents })}
        category="documents"
        testId="edit-property-documents"
      />

      <EnumSelect
        label="Property type"
        value={form.propertyType}
        options={PROPERTY_TYPE_SELECT_OPTIONS}
        onChange={(propertyType) => setForm({ ...form, propertyType })}
        testId="edit-property-type"
      />

      {canEditStatus ? (
        <EnumSelect
          label="Status"
          value={form.status}
          options={PROPERTY_EDITABLE_STATUS_SELECT_OPTIONS}
          onChange={(status) => setForm({ ...form, status })}
          testId="edit-property-status"
        />
      ) : (
        <div className="space-y-1">
          <Label>Status</Label>
          <p
            className="text-sm text-on-surface-variant"
            data-testid="edit-property-status-readonly"
          >
            {getPropertyStatusLabel(property.status ?? PROPERTY_STATUS.DRAFT)}
          </p>
        </div>
      )}

      {actionError ? (
        <p className="text-sm text-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <Button
        variant="primary"
        className="w-full"
        isDisabled={isPending}
        onPress={() => submitUpdate(property.id, form, onUpdateSuccess)}
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
  isLoadingDetail: boolean;
  detailError: string | null;
  propertyActions: PropertyActions;
  onUpdateSuccess?: () => void;
};

export const PropertyEditPanel = ({
  property,
  isLoadingDetail,
  detailError,
  propertyActions,
  onUpdateSuccess
}: PropertyEditPanelProps) => {
  if (!property && !isLoadingDetail) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select a property from the list to load full details from GET
        /properties/{"{id}"}.
      </p>
    );
  }

  if (isLoadingDetail) {
    return (
      <p className="text-sm text-on-surface-variant" data-testid="property-detail-loading">
        Loading property details...
      </p>
    );
  }

  if (detailError) {
    return (
      <p className="text-sm text-error" role="alert" data-testid="property-detail-error">
        {detailError}
      </p>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <PropertyEditForm
      key={property.id}
      property={property}
      propertyActions={propertyActions}
      onUpdateSuccess={onUpdateSuccess}
    />
  );
};
