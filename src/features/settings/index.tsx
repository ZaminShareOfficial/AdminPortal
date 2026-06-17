"use client";

import { useState } from "react";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { KycSection } from "@/features/settings/components/kyc-section";
import { NotificationSection } from "@/features/settings/components/notification-section";
import { ProfileSection } from "@/features/settings/components/profile-section";
import { TemplateSection } from "@/features/settings/components/template-section";
import { useSettingsActions } from "@/features/settings/hooks";
import type { SettingsContentProps, NotificationFormValues } from "@/features/settings/types";

export function SettingsContent({
  profile,
  kycStatus,
  error = null
}: SettingsContentProps) {
  const profileKey = `${profile?.id ?? "none"}:${profile?.firstName ?? ""}:${profile?.email ?? ""}`;
  const [templateForm, setTemplateForm] = useState({
    templateName: "",
    templateString: ""
  });
  const [notificationForm, setNotificationForm] = useState<NotificationFormValues>({
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
        <ProfileSection
          key={profileKey}
          profile={profile}
          isPending={isPending}
          onSave={submitProfile}
        />
        <KycSection kycStatus={kycStatus} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TemplateSection
          templateForm={templateForm}
          onTemplateFormChange={setTemplateForm}
          isPending={isPending}
          onCreate={() => submitCreateTemplate(templateForm)}
          onUpdate={() => submitUpdateTemplate(templateForm)}
        />
        <NotificationSection
          notificationForm={notificationForm}
          onNotificationFormChange={setNotificationForm}
          isPending={isPending}
          onSend={() => submitNotification(notificationForm)}
        />
      </section>
    </div>
  );
}
