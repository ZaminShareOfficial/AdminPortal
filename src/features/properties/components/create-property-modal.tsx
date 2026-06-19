"use client";

import {
  Button,
  Modal
} from "@heroui/react";
import { useOverlayState } from "@heroui/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/admin/icon";
import { CreatePropertyForm } from "@/features/properties/components/create-property-form";
import {
  emptyPropertyForm,
  validatePropertyForm
} from "@/features/properties/mappers";
import type { PropertyActions } from "@/features/properties/use-property-actions";
import type {
  PropertyCreateFormValues,
  PropertyFormFieldErrors
} from "@/features/properties/types";

type CreatePropertyModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyActions: PropertyActions;
};

export const CreatePropertyModal = ({
  isOpen,
  onOpenChange,
  propertyActions
}: CreatePropertyModalProps) => {
  const [form, setForm] = useState<PropertyCreateFormValues>(emptyPropertyForm);
  const [fieldErrors, setFieldErrors] = useState<PropertyFormFieldErrors>({});
  const { actionError, isPending, submitCreate, clearActionError } =
    propertyActions;

  // useEffect justified: external sync — reset form state when modal opens for a fresh create flow
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm(emptyPropertyForm());
    setFieldErrors({});
    clearActionError();
  }, [isOpen, clearActionError]);

  const handleClose = () => {
    clearActionError();
    setFieldErrors({});
    setForm(emptyPropertyForm());
    onOpenChange(false);
  };

  const handleSubmit = () => {
    const errors = validatePropertyForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    submitCreate(form, handleClose);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container className="!w-[75vw] sm:!w-[75vw]">
          <Modal.Dialog className="max-h-[90vh] !w-[75vw] !max-w-[75vw]">
            <Modal.Header>
              <Modal.Heading>Create property</Modal.Heading>
              <p className="text-sm text-on-surface-variant">
                Submits title, location, valuation, tokenSupply, tokenPrice,
                photos, coordinates, documents, brokers, and propertyType.
              </p>
            </Modal.Header>
            <Modal.Body className="overflow-y-auto">
              <CreatePropertyForm
                form={form}
                fieldErrors={fieldErrors}
                onChange={setForm}
              />
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

type CreatePropertyTriggerProps = {
  propertyActions: PropertyActions;
};

export const CreatePropertyTrigger = ({
  propertyActions
}: CreatePropertyTriggerProps) => {
  const modalState = useOverlayState();

  return (
    <>
      <Button
        variant="primary"
        className="saffron-gradient text-xs font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20"
        onPress={modalState.open}
        data-testid="open-create-property"
      >
        <Icon name="add" className="text-lg" />
        Create Property
      </Button>
      <CreatePropertyModal
        isOpen={modalState.isOpen}
        onOpenChange={modalState.setOpen}
        propertyActions={propertyActions}
      />
    </>
  );
};
