"use client";

import {
  Button,
  Modal
} from "@heroui/react";
import { useOverlayState } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/admin/icon";
import {
  PropertyIpoDetails,
  PropertyIpoSelect
} from "@/features/ipo/components/property-ipo-details";
import { IpoScheduleFields } from "@/features/ipo/components/ipo-schedule-fields";
import { emptyCreateIpoForm } from "@/features/ipo/mappers";
import type { CreateIpoFormValues } from "@/features/ipo/mappers";
import { useLaunchEligibleProperties } from "@/features/ipo/use-launch-eligible-properties";
import type { IpoActions } from "@/features/ipo/use-ipo-actions";

type CreateIpoModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ipoActions: IpoActions;
};

export const CreateIpoModal = ({
  isOpen,
  onOpenChange,
  ipoActions
}: CreateIpoModalProps) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [scheduleForm, setScheduleForm] = useState<CreateIpoFormValues>(
    emptyCreateIpoForm,
  );
  const { actionError, isPending, submitCreate, clearActionError } = ipoActions;
  const { eligibleProperties, isLoading, loadError } =
    useLaunchEligibleProperties(isOpen);

  const selectedProperty = useMemo(
    () =>
      eligibleProperties.find((property) => property.id === selectedPropertyId) ??
      null,
    [eligibleProperties, selectedPropertyId],
  );

  // useEffect justified: external sync — reset modal state when it opens for a fresh launch flow
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    clearActionError();
    setScheduleForm(emptyCreateIpoForm());
  }, [isOpen, clearActionError]);

  // useEffect justified: external sync — select first property after GET /properties returns
  useEffect(() => {
    if (!isOpen || isLoading) {
      return;
    }

    setSelectedPropertyId(eligibleProperties[0]?.id ?? "");
  }, [isOpen, isLoading, eligibleProperties]);

  const handleClose = () => {
    clearActionError();
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (!selectedProperty) {
      return;
    }

    submitCreate(selectedProperty.id, scheduleForm, handleClose);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container className="!w-[min(720px,92vw)] sm:!w-[min(720px,92vw)]">
          <Modal.Dialog className="max-h-[90vh] !w-[min(720px,92vw)] !max-w-[min(720px,92vw)]">
            <Modal.Header>
              <Modal.Heading>Launch IPO</Modal.Heading>
              <p className="text-sm text-on-surface-variant">
                Choose a property in Approved status. Creating the IPO moves the
                property into the IPO lifecycle.
              </p>
            </Modal.Header>
            <Modal.Body className="space-y-6 overflow-y-auto">
              {isLoading ? (
                <p
                  className="text-sm text-on-surface-variant"
                  data-testid="launch-ipo-loading"
                >
                  Loading properties...
                </p>
              ) : (
                <>
                  <PropertyIpoSelect
                    properties={eligibleProperties}
                    selectedPropertyId={selectedPropertyId}
                    onSelect={setSelectedPropertyId}
                  />
                  <PropertyIpoDetails
                    property={selectedProperty}
                    hasEligibleProperties={eligibleProperties.length > 0}
                  />
                  <IpoScheduleFields
                    form={scheduleForm}
                    onChange={setScheduleForm}
                  />
                </>
              )}
              {loadError ? (
                <p className="text-sm text-error" role="alert">
                  {loadError}
                </p>
              ) : null}
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
                isDisabled={
                  isPending ||
                  isLoading ||
                  !selectedProperty ||
                  !scheduleForm.startTime ||
                  !scheduleForm.endTime
                }
                onPress={handleSubmit}
                data-testid="create-ipo-submit"
              >
                {isPending ? "Creating..." : "Create IPO"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

type LaunchIpoTriggerProps = {
  ipoActions: IpoActions;
};

export const LaunchIpoTrigger = ({ ipoActions }: LaunchIpoTriggerProps) => {
  const modalState = useOverlayState();

  return (
    <>
      <Button
        variant="primary"
        className="saffron-gradient shadow-primary-soft flex items-center gap-2 rounded px-6 py-2.5 text-sm font-bold text-on-primary-fixed transition-all hover:brightness-110"
        onPress={modalState.open}
        data-testid="open-launch-ipo"
      >
        <Icon name="rocket_launch" filled className="text-primary" />
        Launch New IPO
      </Button>
      <CreateIpoModal
        isOpen={modalState.isOpen}
        onOpenChange={modalState.setOpen}
        ipoActions={ipoActions}
      />
    </>
  );
};
