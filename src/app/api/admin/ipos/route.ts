import type { CreateIpoResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const POST = createAdminRouteHandler<CreateIpoResponse>({
  method: "POST",
  resolvePath: () => "/admin/ipos"
});
