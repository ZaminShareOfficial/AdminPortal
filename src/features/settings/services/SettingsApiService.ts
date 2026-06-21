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
  adminApiRequest<ProfileResponse>({ method: "GET", url: "/profile" });

export const updateProfile = (body: {
  firstName?: string;
  lastName?: string;
  email?: string;
}) =>
  adminApiRequest<ProfileResponse>({
    method: "PATCH",
    url: "/profile",
    data: body
  });

export const fetchKycStatus = () =>
  adminApiRequest<KycStatusResponse>({ method: "GET", url: "/kyc" });

export const createTemplate = (body: TemplateRequest) =>
  adminApiRequest<TemplateResponse>({
    method: "POST",
    url: "/template",
    data: body
  });

export const updateTemplate = (body: TemplateRequest) =>
  adminApiRequest<TemplateResponse>({
    method: "PATCH",
    url: "/template",
    data: body
  });

export const sendNotification = (body: SendNotificationRequest) =>
  adminApiRequest<SendNotificationResponse>({
    method: "POST",
    url: "/notifications/send",
    data: body
  });
