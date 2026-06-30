import type {
  CreateIpoRequest,
  CreateIpoResponse,
  IpoDetailResponse,
  IpoStatusResponse,
  IpoSubscriptionSummaryResponse,
  IpoSummaryResponse,
  MintIpoResponse,
  UpdateIpoStatusRequest
} from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";

export const listIpos = (params?: { active?: boolean }) => {
  const search = params?.active ? "?active=true" : "";
  return adminApiRequest<IpoSummaryResponse[]>({
    method: "GET",
    url: `/ipos${search}`
  });
};

export const getIpo = (ipoId: string) =>
  adminApiRequest<IpoDetailResponse>({
    method: "GET",
    url: `/ipos/${ipoId}`
  });

export const createIpo = (body: CreateIpoRequest) =>
  adminApiRequest<CreateIpoResponse>({
    method: "POST",
    url: "/ipos",
    data: body
  });

export const updateIpoStatus = (ipoId: string, body: UpdateIpoStatusRequest) =>
  adminApiRequest<IpoStatusResponse>({
    method: "PATCH",
    url: `/ipos/${ipoId}/status`,
    data: body
  });

export const mintIpo = (ipoId: string) =>
  adminApiRequest<MintIpoResponse>({
    method: "POST",
    url: `/ipos/${ipoId}/mint`
  });

export const getIpoSubscriptionSummary = (ipoId: string) =>
  adminApiRequest<IpoSubscriptionSummaryResponse>({
    method: "GET",
    url: `/ipos/${ipoId}/subscriptions`
  });
