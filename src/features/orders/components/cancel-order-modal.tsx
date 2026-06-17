"use client";

import { Button, Modal } from "@heroui/react";

type CancelOrderModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
  isCancelling: boolean;
  onConfirm: () => void;
};

export const CancelOrderModal = ({
  isOpen,
  onOpenChange,
  orderId,
  isCancelling,
  onConfirm
}: CancelOrderModalProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Heading>Cancel order?</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-on-surface-variant">
              This sends PATCH /orders/{orderId} with quantity 0.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onPress={() => onOpenChange(false)}>
              Keep order
            </Button>
            <Button
              variant="primary"
              isDisabled={isCancelling}
              onPress={onConfirm}
              data-testid="confirm-cancel-order"
            >
              {isCancelling ? "Cancelling..." : "Cancel order"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);
