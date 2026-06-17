import type {
  KycStatusResponse,
  ProfileResponse,
  SendNotificationRequest,
  SendNotificationResponse,
  TemplateRequest,
  TemplateResponse
} from "@/types/backend";
import { adminClient } from "@/lib/api/admin-client";

export const fetchProfile = () => adminClient.get<ProfileResponse>("/profile");

export const updateProfile = (body: {
  firstName?: string;
  lastName?: string;
  email?: string;
}) => adminClient.patch<ProfileResponse>("/profile", body);

export const fetchKycStatus = () => adminClient.get<KycStatusResponse>("/kyc");

export const createTemplate = (body: TemplateRequest) =>
  adminClient.post<TemplateResponse>("/template", body);

export const updateTemplate = (body: TemplateRequest) =>
  adminClient.patch<TemplateResponse>("/template", body);

export const sendNotification = (body: SendNotificationRequest) =>
  adminClient.post<SendNotificationResponse>("/notifications/send", body);
