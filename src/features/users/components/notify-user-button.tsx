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
import { sendNotification } from "@/features/settings/services/SettingsApiService";

type NotifyUserModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userId: string;
};

const NotifyUserModal = ({
  isOpen,
  onOpenChange,
  userName,
  userId
}: NotifyUserModalProps) => {
  const [templateName, setTemplateName] = useState("user_alert");
  const [identityValue, setIdentityValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await sendNotification({
        templateName,
        identityType: "PHONE_NUMBER",
        identityValue: identityValue.trim(),
        parameters: { userName, userId }
      });
      onOpenChange(false);
      setIdentityValue("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not send notification.",
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
              <Modal.Heading>Notify {userName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                POST /internal/admin/notification/send
              </p>
              <p className="text-xs text-on-surface-variant">User ID: {userId}</p>
              <TextField
                name="templateName"
                value={templateName}
                onChange={setTemplateName}
              >
                <Label>Template name</Label>
                <Input data-testid="user-notify-template" />
              </TextField>
              <TextField
                name="identityValue"
                value={identityValue}
                onChange={setIdentityValue}
              >
                <Label>Recipient phone number</Label>
                <Input data-testid="user-notify-phone" />
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
                isDisabled={isSubmitting || !identityValue.trim()}
                onPress={handleSend}
                data-testid="user-notify-submit"
              >
                Send
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

type NotifyUserButtonProps = {
  userName: string;
  userId: string;
};

export const NotifyUserButton = ({
  userName,
  userId
}: NotifyUserButtonProps) => {
  const modalState = useOverlayState();

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onPress={modalState.open}
        data-testid={`notify-user-${userId}`}
      >
        Notify
      </Button>
      {modalState.isOpen ? (
        <NotifyUserModal
          isOpen={modalState.isOpen}
          onOpenChange={modalState.setOpen}
          userName={userName}
          userId={userId}
        />
      ) : null}
    </>
  );
};
