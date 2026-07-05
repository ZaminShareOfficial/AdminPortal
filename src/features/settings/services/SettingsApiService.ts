import type {
  KycStatusResponse,
  ProfileResponse,
  SendNotificationRequest,
  SendNotificationResponse,
  TemplateRequest,
  TemplateResponse
} from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";

export const fetchProfile = () =>
  adminApiRequest<ProfileResponse>({ method: "GET", url: "/me" });

export const updateProfile = (body: {
  firstName?: string;
  lastName?: string;
  email?: string;
}) =>
  adminApiRequest<ProfileResponse>({
    method: "PATCH",
    url: "/me",
    data: body
  });

export const fetchKycStatus = () =>
  adminApiRequest<KycStatusResponse>({ method: "GET", url: "/kyc" });

export const createTemplate = (body: TemplateRequest) =>
  adminApiRequest<TemplateResponse>({
    method: "POST",
    url: "/admin/template",
    data: body
  });

export const updateTemplate = (body: TemplateRequest) =>
  adminApiRequest<TemplateResponse>({
    method: "PATCH",
    url: "/admin/template",
    data: body
  });

export const sendNotification = (body: SendNotificationRequest) =>
  adminApiRequest<SendNotificationResponse>({
    method: "POST",
    url: "/internal/admin/notification/send",
    data: body
  });
