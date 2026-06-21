import type { KycStatusResponse, ProfileResponse } from "@/types/backend";

export type SettingsContentProps = {
  profile: ProfileResponse | null;
  kycStatus: KycStatusResponse | null;
  error?: string | null;
};

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

export type TemplateFormValues = {
  templateName: string;
  templateString: string;
};

export type NotificationFormValues = {
  templateName: string;
  identityType: "PHONE_NUMBER" | "EMAIL";
  identityValue: string;
  parameterKey: string;
  parameterValue: string;
};
