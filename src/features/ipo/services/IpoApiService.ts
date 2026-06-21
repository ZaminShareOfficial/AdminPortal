import type {
  CreateIpoRequest,
  CreateIpoResponse,
  IpoStatusResponse,
  IpoSubscriptionSummaryResponse,
  IpoSummaryResponse,
  MintIpoResponse,
  UpdateIpoStatusRequest
} from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";

export const listIpos = () =>
  adminApiRequest<IpoSummaryResponse[]>({
    method: "GET",
    url: "/ipos"
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
