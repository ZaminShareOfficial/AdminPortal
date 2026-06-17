import type {
  CreateIpoRequest,
  CreateIpoResponse,
  IpoStatusResponse,
  MintResponse
} from "@/types/backend";
import { adminClient } from "@/lib/api/admin-client";

export const createIpo = (body: CreateIpoRequest) =>
  adminClient.post<CreateIpoResponse>("/ipos", body);

export const updateIpoStatus = (
  ipoId: string,
  status: "CREATED" | "PAUSED",
) => adminClient.patch<IpoStatusResponse>(`/ipos/${ipoId}/status`, { status });

export const mintIpo = (ipoId: string) =>
  adminClient.post<MintResponse>(`/ipos/${ipoId}/mint`, {});
