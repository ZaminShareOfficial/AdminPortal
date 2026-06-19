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
import { NumericInputField } from "@/components/admin/numeric-input-field";
import { PROPERTY_TYPE_SELECT_OPTIONS } from "@/constants/property";
import { PropertyFormSection } from "@/features/properties/components/property-form-section";
import { computeDerivedTokenPrice } from "@/features/properties/mappers";
import type {
  PropertyCreateFormValues,
  PropertyFormFieldErrors
} from "@/features/properties/types";
import { formatInr } from "@/lib/format";

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
          <NumericInputField
            name="valuation"
            label="Asset valuation (INR)"
            isRequired
            value={form.valuation}
            onChange={(valuation) => onChange({ ...form, valuation })}
            isInvalid={Boolean(fieldErrors.valuation)}
            errorMessage={fieldErrors.valuation}
            placeholder="1,28,00,000"
            testId="property-valuation-input"
          />

          <NumericInputField
            name="tokenSupply"
            label="Token supply"
            isRequired
            value={form.tokenSupply}
            onChange={(tokenSupply) => onChange({ ...form, tokenSupply })}
            isInvalid={Boolean(fieldErrors.tokenSupply)}
            errorMessage={fieldErrors.tokenSupply}
            placeholder="5,00,000"
            testId="property-supply-input"
          />
        </div>

        <div className="rounded border border-outline-variant/10 bg-surface-container-lowest p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Implied token price
              </p>
              <p className="mt-1 text-sm font-bold text-secondary">
                {derivedTokenPrice ? formatInr(Number(derivedTokenPrice)) : "—"}
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

        <NumericInputField
          name="tokenPrice"
          label="Token price (INR)"
          isRequired
          allowDecimal
          value={form.tokenPrice}
          onChange={(tokenPrice) => onChange({ ...form, tokenPrice })}
          isInvalid={Boolean(fieldErrors.tokenPrice)}
          errorMessage={fieldErrors.tokenPrice}
          placeholder="25.60"
          testId="property-price-input"
        />
      </PropertyFormSection>

      <PropertyFormSection
        title="Location & media"
        description="Map coordinates and asset URLs sent in the create payload."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <NumericInputField
            name="latitude"
            label="Latitude"
            allowDecimal
            allowNegative
            maxDecimalPlaces={6}
            value={form.latitude}
            onChange={(latitude) => onChange({ ...form, latitude })}
            isInvalid={Boolean(fieldErrors.latitude)}
            errorMessage={fieldErrors.latitude}
            placeholder="12.9716"
            testId="property-latitude-input"
          />

          <NumericInputField
            name="longitude"
            label="Longitude"
            allowDecimal
            allowNegative
            maxDecimalPlaces={6}
            value={form.longitude}
            onChange={(longitude) => onChange({ ...form, longitude })}
            isInvalid={Boolean(fieldErrors.longitude)}
            errorMessage={fieldErrors.longitude}
            placeholder="77.5946"
            testId="property-longitude-input"
          />
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
