"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextField
} from "@heroui/react";
import { useOverlayState } from "@heroui/react";
import { useState } from "react";
import { reviewBroker } from "@/lib/services/brokers-api-service";

type RejectBrokerModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  brokerName: string;
  brokerId: string;
  onSuccess: () => void;
};

const RejectBrokerModal = ({
  isOpen,
  onOpenChange,
  brokerName,
  brokerId,
  onSuccess
}: RejectBrokerModalProps) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await reviewBroker(brokerId, {
        action: "REJECT",
        reason: reason.trim()
      });
      onOpenChange(false);
      setReason("");
      onSuccess();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not reject broker.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Reject {brokerName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                PATCH /admin/brokers/&#123;brokerId&#125;
              </p>
              <TextField
                name="reason"
                value={reason}
                onChange={setReason}
              >
                <Label>Rejection reason</Label>
                <Input data-testid="broker-reject-reason" />
              </TextField>
              {error ? (
                <p className="text-sm text-error" role="alert">
                  {error}
                </p>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                isDisabled={isSubmitting || !reason.trim()}
                onPress={handleReject}
                data-testid="broker-reject-submit"
              >
                Reject
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

type ReviewBrokerActionsProps = {
  brokerId: string;
  brokerName: string;
  onboarding: string;
  onReviewComplete: () => void;
};

export const ReviewBrokerActions = ({
  brokerId,
  brokerName,
  onboarding,
  onReviewComplete
}: ReviewBrokerActionsProps) => {
  const rejectModalState = useOverlayState();
  const [isApproving, setIsApproving] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);

  const isPendingReview = onboarding === "PROFILE_PENDING";

  const handleApprove = async () => {
    setApproveError(null);
    setIsApproving(true);
    try {
      await reviewBroker(brokerId, { action: "APPROVE" });
      onReviewComplete();
    } catch (submitError) {
      setApproveError(
        submitError instanceof Error
          ? submitError.message
          : "Could not approve broker.",
      );
    } finally {
      setIsApproving(false);
    }
  };

  if (!isPendingReview) {
    return null;
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="primary"
          size="sm"
          isDisabled={isApproving}
          onPress={handleApprove}
          data-testid={`approve-broker-${brokerId}`}
        >
          Approve
        </Button>
        <Button
          variant="secondary"
          size="sm"
          isDisabled={isApproving}
          onPress={rejectModalState.open}
          data-testid={`reject-broker-${brokerId}`}
        >
          Reject
        </Button>
      </div>
      {approveError ? (
        <p className="text-xs text-error" role="alert">
          {approveError}
        </p>
      ) : null}
      {rejectModalState.isOpen ? (
        <RejectBrokerModal
          isOpen={rejectModalState.isOpen}
          onOpenChange={rejectModalState.setOpen}
          brokerName={brokerName}
          brokerId={brokerId}
          onSuccess={onReviewComplete}
        />
      ) : null}
    </div>
  );
};
