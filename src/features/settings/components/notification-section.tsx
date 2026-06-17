"use client";

import { Button, Input, Label, TextField } from "@heroui/react";
import { EnumSelect } from "@/components/admin/enum-select";
import { parseIdentityType } from "@/lib/validators/notification";
import type { NotificationFormValues } from "@/features/settings/types";

const IDENTITY_OPTIONS = [
  { id: "PHONE_NUMBER", label: "Phone number" },
  { id: "EMAIL", label: "Email" }
] as const;

type NotificationSectionProps = {
  notificationForm: NotificationFormValues;
  onNotificationFormChange: (next: NotificationFormValues) => void;
  isPending: boolean;
  onSend: () => void;
};

export const NotificationSection = ({
  notificationForm,
  onNotificationFormChange,
  isPending,
  onSend
}: NotificationSectionProps) => (
  <div className="space-y-4 rounded-lg bg-surface-container p-6">
    <h2 className="font-headline text-lg font-bold">Send notification</h2>
    <p className="text-xs text-on-surface-variant">
      POST /internal/admin/notification/send
    </p>
    <TextField
      name="notificationTemplate"
      value={notificationForm.templateName}
      onChange={(value) =>
        onNotificationFormChange({ ...notificationForm, templateName: value })
      }
    >
      <Label>Template name</Label>
      <Input data-testid="notification-template-input" />
    </TextField>
    <EnumSelect
      label="Identity type"
      value={notificationForm.identityType}
      options={IDENTITY_OPTIONS}
      onChange={(identityType) =>
        onNotificationFormChange({
          ...notificationForm,
          identityType: parseIdentityType(identityType)
        })
      }
      testId="notification-identity-type"
    />
    <TextField
      name="identityValue"
      value={notificationForm.identityValue}
      onChange={(value) =>
        onNotificationFormChange({ ...notificationForm, identityValue: value })
      }
    >
      <Label>Recipient</Label>
      <Input data-testid="notification-recipient-input" />
    </TextField>
    <div className="grid grid-cols-2 gap-4">
      <TextField
        name="parameterKey"
        value={notificationForm.parameterKey}
        onChange={(value) =>
          onNotificationFormChange({ ...notificationForm, parameterKey: value })
        }
      >
        <Label>Parameter key</Label>
        <Input />
      </TextField>
      <TextField
        name="parameterValue"
        value={notificationForm.parameterValue}
        onChange={(value) =>
          onNotificationFormChange({ ...notificationForm, parameterValue: value })
        }
      >
        <Label>Parameter value</Label>
        <Input />
      </TextField>
    </div>
    <Button
      variant="primary"
      isDisabled={isPending}
      onPress={onSend}
      data-testid="send-notification-button"
    >
      Send notification
    </Button>
  </div>
);
