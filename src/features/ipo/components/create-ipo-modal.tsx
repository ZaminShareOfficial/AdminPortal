"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextField
} from "@heroui/react";
import { useMemo, useState } from "react";
import { EnumSelect } from "@/components/admin/enum-select";
import type { IpoActions } from "@/features/ipo/hooks";
import { emptyIpoForm } from "@/features/ipo/hooks";
import type { IpoFormValues } from "@/features/ipo/types";
import type { PropertyResponse } from "@/types/backend";

type CreateIpoModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  approvedProperties: PropertyResponse[];
  ipoActions: IpoActions;
};

export const CreateIpoModal = ({
  isOpen,
  onOpenChange,
  approvedProperties,
  ipoActions
}: CreateIpoModalProps) => {
  const [form, setForm] = useState<IpoFormValues>(emptyIpoForm);
  const { actionError, isPending, submitCreate, clearActionError } = ipoActions;

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
