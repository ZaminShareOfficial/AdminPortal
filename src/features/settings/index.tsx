"use client";

import {
  Button,
  Input,
  Label,
  TextArea,
  TextField
} from "@heroui/react";
import { useState } from "react";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { EnumSelect } from "@/components/admin/enum-select";
import { useSettingsActions } from "@/features/settings/hooks";
import type { SettingsContentProps } from "@/features/settings/types";

export function SettingsContent({
  profile,
  kycStatus,
  error = null
}: SettingsContentProps) {
  const [profileForm, setProfileForm] = useState({
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    email: profile?.email ?? ""
  });
  const [templateForm, setTemplateForm] = useState({
    templateName: "",
    templateString: ""
  });
  const [notificationForm, setNotificationForm] = useState<{
    templateName: string;
    identityType: "PHONE_NUMBER" | "EMAIL";
    identityValue: string;
    parameterKey: string;
    parameterValue: string;
  }>({
    templateName: "",
    identityType: "PHONE_NUMBER",
    identityValue: "",
    parameterKey: "",
    parameterValue: ""
  });

  const {
    actionError,
    successMessage,
    isPending,
    submitProfile,
    submitCreateTemplate,
    submitUpdateTemplate,
    submitNotification
  } = useSettingsActions();

  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
          Configuration
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface">
          Settings
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Admin profile, notification templates, and outbound messages.
        </p>
      </div>

      {error ? <ApiErrorBanner message={error} /> : null}
      {actionError ? <ApiErrorBanner message={actionError} /> : null}
      {successMessage ? (
        <p className="text-sm text-tertiary" role="status">
          {successMessage}
        </p>
      ) : null}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-surface-container p-6">
          <h2 className="font-headline text-lg font-bold">Admin profile</h2>
          <p className="text-xs text-on-surface-variant">GET/PATCH /me</p>
          <TextField
            name="firstName"
            value={profileForm.firstName}
            onChange={(value) =>
              setProfileForm({ ...profileForm, firstName: value })
            }
          >
            <Label>First name</Label>
            <Input data-testid="settings-first-name" />
          </TextField>
          <TextField
            name="lastName"
            value={profileForm.lastName}
            onChange={(value) =>
              setProfileForm({ ...profileForm, lastName: value })
            }
          >
            <Label>Last name</Label>
            <Input data-testid="settings-last-name" />
          </TextField>
          <TextField
            name="email"
            value={profileForm.email}
            onChange={(value) => setProfileForm({ ...profileForm, email: value })}
          >
            <Label>Email</Label>
            <Input data-testid="settings-email" />
          </TextField>
          <Button
            variant="primary"
            isDisabled={isPending}
            onPress={() => submitProfile(profileForm)}
            data-testid="save-profile-button"
          >
            Save profile
          </Button>
        </div>

        <div className="space-y-4 rounded-lg bg-surface-container p-6">
          <h2 className="font-headline text-lg font-bold">KYC status</h2>
          <p className="text-xs text-on-surface-variant">GET /kyc</p>
          {kycStatus ? (
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-on-surface-variant">Status</dt>
                <dd className="font-semibold">{kycStatus.kycStatus ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">Verification</dt>
                <dd>{kycStatus.verificationStatus ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">Masked PAN</dt>
                <dd>{kycStatus.maskedPan ?? "—"}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-on-surface-variant">
              KYC details are not available for this admin session.
            </p>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-surface-container p-6">
          <h2 className="font-headline text-lg font-bold">Notification template</h2>
          <p className="text-xs text-on-surface-variant">
            POST/PATCH /admin/template
          </p>
          <TextField
            name="templateName"
            value={templateForm.templateName}
            onChange={(value) =>
              setTemplateForm({ ...templateForm, templateName: value })
            }
          >
            <Label>Template name</Label>
            <Input data-testid="template-name-input" />
          </TextField>
          <div>
            <Label>Template body</Label>
            <TextArea
              value={templateForm.templateString}
              onChange={(event) =>
                setTemplateForm({
                  ...templateForm,
                  templateString: event.target.value
                })
              }
              data-testid="template-body-input"
              className="mt-2 w-full"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              isDisabled={isPending}
              onPress={() => submitCreateTemplate(templateForm)}
              data-testid="create-template-button"
            >
              Create template
            </Button>
            <Button
              variant="secondary"
              isDisabled={isPending}
              onPress={() => submitUpdateTemplate(templateForm)}
              data-testid="update-template-button"
            >
              Update template
            </Button>
          </div>
        </div>

        <div className="space-y-4 rounded-lg bg-surface-container p-6">
          <h2 className="font-headline text-lg font-bold">Send notification</h2>
          <p className="text-xs text-on-surface-variant">
            POST /internal/admin/notification/send
          </p>
          <TextField
            name="notificationTemplate"
            value={notificationForm.templateName}
            onChange={(value) =>
              setNotificationForm({ ...notificationForm, templateName: value })
            }
          >
            <Label>Template name</Label>
            <Input data-testid="notification-template-input" />
          </TextField>
          <EnumSelect
            label="Identity type"
            value={notificationForm.identityType}
            options={[
              { id: "PHONE_NUMBER", label: "Phone number" },
              { id: "EMAIL", label: "Email" }
            ]}
            onChange={(identityType) =>
              setNotificationForm({
                ...notificationForm,
                identityType: identityType as "PHONE_NUMBER" | "EMAIL"
              })
            }
            testId="notification-identity-type"
          />
          <TextField
            name="identityValue"
            value={notificationForm.identityValue}
            onChange={(value) =>
              setNotificationForm({ ...notificationForm, identityValue: value })
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
                setNotificationForm({ ...notificationForm, parameterKey: value })
              }
            >
              <Label>Parameter key</Label>
              <Input />
            </TextField>
            <TextField
              name="parameterValue"
              value={notificationForm.parameterValue}
              onChange={(value) =>
                setNotificationForm({ ...notificationForm, parameterValue: value })
              }
            >
              <Label>Parameter value</Label>
              <Input />
            </TextField>
          </div>
          <Button
            variant="primary"
            isDisabled={isPending}
            onPress={() => submitNotification(notificationForm)}
            data-testid="send-notification-button"
          >
            Send notification
          </Button>
        </div>
      </section>
    </div>
  );
}
