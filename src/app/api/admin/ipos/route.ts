import type { CreateIpoResponse, IpoSummaryResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<IpoSummaryResponse[]>({
  method: "GET",
  resolvePath: () => "/ipos",
  hasBody: false
});

export const POST = createAdminRouteHandler<CreateIpoResponse>({
  method: "POST",
  resolvePath: () => "/admin/ipos"
});
