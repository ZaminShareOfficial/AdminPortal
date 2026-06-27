import { adminApiRequest } from "@/lib/api/admin-api";
import type { AdminUserSummaryResponse } from "@/types/backend";

export const listUsers = () =>
  adminApiRequest<AdminUserSummaryResponse[]>({
    method: "GET",
    url: "/users"
  });
