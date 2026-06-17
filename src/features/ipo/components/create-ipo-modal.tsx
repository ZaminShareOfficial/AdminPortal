"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextField
} from "@heroui/react";
import { useOverlayState } from "@heroui/react";
import { useMemo, useState } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import { Icon } from "@/components/admin/icon";
import { emptyIpoForm, useIpoActions } from "@/features/ipo/hooks";
import type { IpoFormValues } from "@/features/ipo/types";
import type { PropertyResponse } from "@/types/backend";

type CreateIpoModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  approvedProperties: PropertyResponse[];
};

export const CreateIpoModal = ({
  isOpen,
  onOpenChange,
  approvedProperties
}: CreateIpoModalProps) => {
  const [form, setForm] = useState<IpoFormValues>(emptyIpoForm);
  const { actionError, isPending, submitCreate, clearActionError } =
    useIpoActions();

  const propertyOptions = useMemo(
    () =>
      approvedProperties.map((property) => ({
        id: property.id,
        label: property.title
      })),
    [approvedProperties],
  );

  const handleClose = () => {
    clearActionError();
    setForm(emptyIpoForm());
    onOpenChange(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Launch new IPO</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-4">
              <EnumSelect
                label="Approved property"
                value={form.propertyId}
                options={propertyOptions}
                onChange={(propertyId) => setForm({ ...form, propertyId })}
                testId="ipo-property-select"
              />
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="tokenPrice"
                  value={form.tokenPrice}
                  onChange={(value) => setForm({ ...form, tokenPrice: value })}
                >
                  <Label>Token price (USD)</Label>
                  <Input data-testid="ipo-price-input" />
                </TextField>
                <TextField
                  name="totalTokens"
                  value={form.totalTokens}
                  onChange={(value) => setForm({ ...form, totalTokens: value })}
                >
                  <Label>Total tokens</Label>
                  <Input data-testid="ipo-supply-input" />
                </TextField>
              </div>
              <TextField
                name="minSubscription"
                value={form.minSubscription}
                onChange={(value) =>
                  setForm({ ...form, minSubscription: value })
                }
              >
                <Label>Minimum subscription (USD)</Label>
                <Input data-testid="ipo-min-subscription-input" />
              </TextField>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="startTime"
                  value={form.startTime}
                  onChange={(value) => setForm({ ...form, startTime: value })}
                >
                  <Label>Start time</Label>
                  <Input type="datetime-local" data-testid="ipo-start-input" />
                </TextField>
                <TextField
                  name="endTime"
                  value={form.endTime}
                  onChange={(value) => setForm({ ...form, endTime: value })}
                >
                  <Label>End time</Label>
                  <Input type="datetime-local" data-testid="ipo-end-input" />
                </TextField>
              </div>
              {actionError ? (
                <p className="text-sm text-error" role="alert">
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
                isDisabled={isPending || propertyOptions.length === 0}
                onPress={() => submitCreate(form, handleClose)}
                data-testid="create-ipo-submit"
              >
                {isPending ? "Launching..." : "Launch IPO"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export const CreateIpoTrigger = ({
  approvedProperties
}: {
  approvedProperties: PropertyResponse[];
}) => {
  const modalState = useOverlayState();

  return (
    <>
      <Button
        variant="primary"
        className="saffron-gradient text-sm font-bold text-on-primary-fixed"
        onPress={modalState.open}
        data-testid="open-create-ipo"
      >
        <Icon name="rocket_launch" filled className="text-primary" />
        Launch New IPO
      </Button>
      <CreateIpoModal
        isOpen={modalState.isOpen}
        onOpenChange={modalState.setOpen}
        approvedProperties={approvedProperties}
      />
    </>
  );
};
