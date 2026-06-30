"use client";

import { Button, Modal } from "@heroui/react";

type FailIpoModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ipoId: string | null;
  isFailing: boolean;
  onConfirm: () => void;
};

export const FailIpoModal = ({
  isOpen,
  onOpenChange,
  ipoId,
  isFailing,
  onConfirm
}: FailIpoModalProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Heading>Fail IPO?</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-on-surface-variant">
              This marks IPO {ipoId} as FAILED, syncs property status, and
              revokes or refunds all payment mandates. This cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onPress={() => onOpenChange(false)}>
              Keep IPO
            </Button>
            <Button
              variant="primary"
              className="bg-error text-on-error"
              isDisabled={isFailing}
              onPress={onConfirm}
              data-testid="confirm-fail-ipo"
            >
              {isFailing ? "Failing..." : "Fail IPO"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);
