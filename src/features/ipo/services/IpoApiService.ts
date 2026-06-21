import type {
  CreateIpoRequest,
  CreateIpoResponse,
  IpoSummaryResponse
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
