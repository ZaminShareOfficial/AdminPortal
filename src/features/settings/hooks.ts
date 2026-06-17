"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createTemplate,
  sendNotification,
  updateProfile,
  updateTemplate
} from "@/features/settings/services/settings-client";
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

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const runAction = useCallback(
    async (
      action: () => Promise<void>,
      success: string,
    ) => {
      setActionError(null);
      setSuccessMessage(null);
      startTransition(async () => {
        try {
          await action();
          setSuccessMessage(success);
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Request failed.",
          );
        }
      });
    },
    [refresh],
  );

  const submitProfile = useCallback(
    (form: ProfileFormValues) => {
      void runAction(async () => {
        await updateProfile({
          firstName: form.firstName.trim() || undefined,
          lastName: form.lastName.trim() || undefined,
          email: form.email.trim() || undefined
        });
      }, "Profile updated.");
    },
    [runAction],
  );

  const submitCreateTemplate = useCallback(
    (form: TemplateFormValues) => {
      void runAction(async () => {
        await createTemplate({
          templateName: form.templateName.trim(),
          templateString: form.templateString
        });
      }, "Template created.");
    },
    [runAction],
  );

  const submitUpdateTemplate = useCallback(
    (form: TemplateFormValues) => {
      void runAction(async () => {
        await updateTemplate({
          templateName: form.templateName.trim(),
          templateString: form.templateString
        });
      }, "Template updated.");
    },
    [runAction],
  );

  const submitNotification = useCallback(
    (form: NotificationFormValues) => {
      void runAction(async () => {
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
    },
    [runAction],
  );

  return {
    actionError,
    successMessage,
    isPending,
    submitProfile,
    submitCreateTemplate,
    submitUpdateTemplate,
    submitNotification,
    clearMessages: () => {
      setActionError(null);
      setSuccessMessage(null);
    }
  };
};
