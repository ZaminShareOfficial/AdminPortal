"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  createTemplate,
  sendNotification,
  updateProfile,
  updateTemplate
} from "@/features/settings/services/SettingsApiService";
import type {
  NotificationFormValues,
  ProfileFormValues,
  TemplateFormValues
} from "@/features/settings/types";

export const useSettingsActions = () => {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const runAction = (action: () => Promise<void>, success: string) => {
    setActionError(null);
    setSuccessMessage(null);
    startTransition(async () => {
      try {
        await action();
        setSuccessMessage(success);
        router.refresh();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Request failed.",
        );
      }
    });
  };

  const submitProfile = (form: ProfileFormValues) => {
    runAction(async () => {
      await updateProfile({
        firstName: form.firstName.trim() || undefined,
        lastName: form.lastName.trim() || undefined,
        email: form.email.trim() || undefined
      });
    }, "Profile updated.");
  };

  const submitCreateTemplate = (form: TemplateFormValues) => {
    runAction(async () => {
      await createTemplate({
        templateName: form.templateName.trim(),
        templateString: form.templateString
      });
    }, "Template created.");
  };

  const submitUpdateTemplate = (form: TemplateFormValues) => {
    runAction(async () => {
      await updateTemplate({
        templateName: form.templateName.trim(),
        templateString: form.templateString
      });
    }, "Template updated.");
  };

  const submitNotification = (form: NotificationFormValues) => {
    runAction(async () => {
      const parameters =
        form.parameterKey.trim() && form.parameterValue.trim()
          ? { [form.parameterKey.trim()]: form.parameterValue.trim() }
          : undefined;

      await sendNotification({
        templateName: form.templateName.trim(),
        identityType: form.identityType,
        identityValue: form.identityValue.trim(),
        parameters
      });
    }, "Notification sent.");
  };

  return {
    actionError,
    successMessage,
    isPending,
    submitProfile,
    submitCreateTemplate,
    submitUpdateTemplate,
    submitNotification
  };
};
