"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  createTemplate,
  fetchKycStatus,
  fetchProfile,
  sendNotification,
  updateProfile,
  updateTemplate
} from "@/features/settings/services/SettingsApiService";
import type {
  NotificationFormValues,
  ProfileFormValues,
  TemplateFormValues
} from "@/features/settings/types";
import { getErrorMessage } from "@/lib/api/errors";
import type { KycStatusResponse, ProfileResponse } from "@/types/backend";

type SettingsPageData = {
  profile: ProfileResponse | null;
  kycStatus: KycStatusResponse | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

export const useSettingsPageData = (): SettingsPageData => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [kycStatus, setKycStatus] = useState<KycStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [nextProfile, nextKycStatus] = await Promise.all([
        fetchProfile(),
        fetchKycStatus().catch(() => null)
      ]);
      setProfile(nextProfile);
      setKycStatus(nextKycStatus);
    } catch (loadError) {
      setProfile(null);
      setKycStatus(null);
      setError(getErrorMessage(loadError, "Could not load settings data."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load settings on mount
  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  return {
    profile,
    kycStatus,
    error,
    isLoading,
    refetch: fetchSettings
  };
};

export const useSettingsActions = (onSuccess?: () => void) => {
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
        onSuccess?.();
        router.refresh();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Request failed."
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
