import type {
  CreateIpoRequest,
  CreateIpoResponse,
  IpoStatusResponse,
  MintResponse
} from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";

export const createIpo = (body: CreateIpoRequest) =>
  adminApiRequest<CreateIpoResponse>({
    method: "POST",
    url: "/ipos",
    data: body
  });

export const updateIpoStatus = (
  ipoId: string,
  status: "CREATED" | "PAUSED",
) =>
  adminApiRequest<IpoStatusResponse>({
    method: "PATCH",
    url: `/ipos/${ipoId}/status`,
    data: { status }
  });

export const mintIpo = (ipoId: string) =>
  adminApiRequest<MintResponse>({
    method: "POST",
    url: `/ipos/${ipoId}/mint`
  });
