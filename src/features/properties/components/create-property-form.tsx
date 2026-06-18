"use client";

import {
  Button,
  Input,
  Label,
  TextArea,
  TextField
} from "@heroui/react";
import { useMemo } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { Icon } from "@/components/admin/icon";
import { PROPERTY_TYPE_SELECT_OPTIONS } from "@/constants/property";
import { PropertyFormSection } from "@/features/properties/components/property-form-section";
import { computeDerivedTokenPrice } from "@/features/properties/mappers";
import type {
  PropertyCreateFormValues,
  PropertyFormFieldErrors
} from "@/features/properties/types";

type CreatePropertyFormProps = {
  form: PropertyCreateFormValues;
  fieldErrors: PropertyFormFieldErrors;
  onChange: (next: PropertyCreateFormValues) => void;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-error" role="alert">
      {message}
    </p>
  ) : null;

export const CreatePropertyForm = ({
  form,
  fieldErrors,
  onChange
}: CreatePropertyFormProps) => {
  const derivedTokenPrice = useMemo(
    () => computeDerivedTokenPrice(form.valuation, form.tokenSupply),
    [form.valuation, form.tokenSupply],
  );

  const applyDerivedPrice = () => {
    if (!derivedTokenPrice) {
      return;
    }

    onChange({ ...form, tokenPrice: derivedTokenPrice });
  };

  return (
    <div className="space-y-8">
      <PropertyFormSection
        title="Asset details"
        description="Core identity for the property listing."
      >
        <TextField
          name="title"
          isRequired
          value={form.title}
          onChange={(value) => onChange({ ...form, title: value })}
          isInvalid={Boolean(fieldErrors.title)}
        >
          <Label>Property title</Label>
          <Input data-testid="property-title-input" placeholder="Skyline Industrial Park" />
          <FieldError message={fieldErrors.title} />
        </TextField>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="location"
            isRequired
            value={form.location}
            onChange={(value) => onChange({ ...form, location: value })}
            isInvalid={Boolean(fieldErrors.location)}
          >
            <Label>Location</Label>
            <Input data-testid="property-location-input" placeholder="Bangalore, KA" />
            <FieldError message={fieldErrors.location} />
          </TextField>

          <EnumSelect
            label="Property type"
            value={form.propertyType}
            options={PROPERTY_TYPE_SELECT_OPTIONS}
            onChange={(propertyType) => onChange({ ...form, propertyType })}
            testId="property-type-select"
          />
        </div>
      </PropertyFormSection>

      <PropertyFormSection
        title="Token economics"
        description="Valuation and supply determine the implied token price."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="valuation"
            isRequired
            value={form.valuation}
            onChange={(value) => onChange({ ...form, valuation: value })}
            isInvalid={Boolean(fieldErrors.valuation)}
          >
            <Label>Asset valuation (USD)</Label>
            <Input data-testid="property-valuation-input" placeholder="12800000" />
            <FieldError message={fieldErrors.valuation} />
          </TextField>

          <TextField
            name="tokenSupply"
            isRequired
            value={form.tokenSupply}
            onChange={(value) => onChange({ ...form, tokenSupply: value })}
            isInvalid={Boolean(fieldErrors.tokenSupply)}
          >
            <Label>Token supply</Label>
            <Input data-testid="property-supply-input" placeholder="500000" />
            <FieldError message={fieldErrors.tokenSupply} />
          </TextField>
        </div>

        <div className="rounded border border-outline-variant/10 bg-surface-container-lowest p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Implied token price
              </p>
              <p className="mt-1 text-sm font-bold text-secondary">
                {derivedTokenPrice ? `$${derivedTokenPrice}` : "—"}
                <span className="ml-1 text-[10px] font-normal text-on-surface-variant">
                  / token
                </span>
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              isDisabled={!derivedTokenPrice}
              onPress={applyDerivedPrice}
              data-testid="apply-derived-token-price"
            >
              <Icon name="calculate" className="text-sm" />
              Use calculated price
            </Button>
          </div>
        </div>

        <TextField
          name="tokenPrice"
          isRequired
          value={form.tokenPrice}
          onChange={(value) => onChange({ ...form, tokenPrice: value })}
          isInvalid={Boolean(fieldErrors.tokenPrice)}
        >
          <Label>Token price (USD)</Label>
          <Input data-testid="property-price-input" placeholder="25.60" />
          <FieldError message={fieldErrors.tokenPrice} />
        </TextField>
      </PropertyFormSection>

      <PropertyFormSection
        title="Location & media"
        description="Map coordinates and asset URLs sent in the create payload."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="latitude"
            value={form.latitude}
            onChange={(value) => onChange({ ...form, latitude: value })}
            isInvalid={Boolean(fieldErrors.latitude)}
          >
            <Label>Latitude</Label>
            <Input data-testid="property-latitude-input" placeholder="12.9716" />
            <FieldError message={fieldErrors.latitude} />
          </TextField>

          <TextField
            name="longitude"
            value={form.longitude}
            onChange={(value) => onChange({ ...form, longitude: value })}
            isInvalid={Boolean(fieldErrors.longitude)}
          >
            <Label>Longitude</Label>
            <Input data-testid="property-longitude-input" placeholder="77.5946" />
            <FieldError message={fieldErrors.longitude} />
          </TextField>
        </div>

        <TextField
          name="photos"
          value={form.photos}
          onChange={(value) => onChange({ ...form, photos: value })}
        >
          <Label>Photo URLs</Label>
          <TextArea
            data-testid="property-photos-input"
            placeholder="https://cdn.example.com/property/front.jpg"
            rows={3}
          />
          <p className="text-xs text-on-surface-variant">One URL per line.</p>
        </TextField>

        <TextField
          name="documents"
          value={form.documents}
          onChange={(value) => onChange({ ...form, documents: value })}
        >
          <Label>Document URLs</Label>
          <TextArea
            data-testid="property-documents-input"
            placeholder="https://cdn.example.com/property/valuation.pdf"
            rows={3}
          />
          <p className="text-xs text-on-surface-variant">One URL per line.</p>
        </TextField>
      </PropertyFormSection>

      <PropertyFormSection
        title="Broker assignment"
        description="Optional listing broker contact."
      >
        <TextField
          name="listingBroker"
          value={form.listingBroker}
          onChange={(value) => onChange({ ...form, listingBroker: value })}
        >
          <Label>Listing broker</Label>
          <Input data-testid="property-broker-input" placeholder="Prime Realty Group" />
        </TextField>
      </PropertyFormSection>
    </div>
  );
};
