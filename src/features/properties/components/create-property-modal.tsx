"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextField
} from "@heroui/react";
import { useState } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { PROPERTY_TYPE_SELECT_OPTIONS } from "@/constants/property";
import { emptyPropertyForm } from "@/features/properties/mappers";
import type { PropertyActions } from "@/features/properties/hooks";
import type { PropertyFormValues } from "@/features/properties/types";

type CreatePropertyModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyActions: PropertyActions;
};

const PropertyFormFields = ({
  form,
  onChange
}: {
  form: PropertyFormValues;
  onChange: (next: PropertyFormValues) => void;
}) => (
  <div className="space-y-4">
    <TextField
      name="title"
      isRequired
      value={form.title}
      onChange={(value) => onChange({ ...form, title: value })}
    >
      <Label>Property title</Label>
      <Input data-testid="property-title-input" />
    </TextField>
    <TextField
      name="location"
      isRequired
      value={form.location}
      onChange={(value) => onChange({ ...form, location: value })}
    >
      <Label>Location</Label>
      <Input data-testid="property-location-input" />
    </TextField>
    <div className="grid grid-cols-2 gap-4">
      <TextField
        name="valuation"
        isRequired
        value={form.valuation}
        onChange={(value) => onChange({ ...form, valuation: value })}
      >
        <Label>Valuation (USD)</Label>
        <Input data-testid="property-valuation-input" />
      </TextField>
      <TextField
        name="tokenSupply"
        isRequired
        value={form.tokenSupply}
        onChange={(value) => onChange({ ...form, tokenSupply: value })}
      >
        <Label>Token supply</Label>
        <Input data-testid="property-supply-input" />
      </TextField>
    </div>
    <TextField
      name="tokenPrice"
      isRequired
      value={form.tokenPrice}
      onChange={(value) => onChange({ ...form, tokenPrice: value })}
    >
      <Label>Token price (USD)</Label>
      <Input data-testid="property-price-input" />
    </TextField>
    <div className="grid grid-cols-2 gap-4">
      <TextField
        name="listingBroker"
        value={form.listingBroker}
        onChange={(value) => onChange({ ...form, listingBroker: value })}
      >
        <Label>Listing broker</Label>
        <Input data-testid="property-broker-input" />
      </TextField>
      <TextField
        name="promoterBroker"
        value={form.promoterBroker}
        onChange={(value) => onChange({ ...form, promoterBroker: value })}
      >
        <Label>Promoter broker</Label>
        <Input data-testid="property-promoter-input" />
      </TextField>
    </div>
    <EnumSelect
      label="Property type"
      value={form.propertyType}
      options={PROPERTY_TYPE_SELECT_OPTIONS}
      onChange={(propertyType) => onChange({ ...form, propertyType })}
      testId="property-type-select"
    />
  </div>
);

export const CreatePropertyModal = ({
  isOpen,
  onOpenChange,
  propertyActions
}: CreatePropertyModalProps) => {
  const [form, setForm] = useState<PropertyFormValues>(emptyPropertyForm);
  const { actionError, isPending, submitCreate, clearActionError } =
    propertyActions;

  const handleClose = () => {
    clearActionError();
    setForm(emptyPropertyForm());
    onOpenChange(false);
  };

  const handleSubmit = () => {
    submitCreate(form, handleClose);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Create property</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <PropertyFormFields form={form} onChange={setForm} />
              {actionError ? (
                <p className="mt-4 text-sm text-error" role="alert">
                  {actionError}
                </p>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                isDisabled={isPending}
                onPress={handleSubmit}
                data-testid="create-property-submit"
              >
                {isPending ? "Creating..." : "Create property"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
