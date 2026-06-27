import type { AdminUserSummaryResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<AdminUserSummaryResponse[]>({
  method: "GET",
  resolvePath: () => "/admin/users",
  hasBody: false
});
