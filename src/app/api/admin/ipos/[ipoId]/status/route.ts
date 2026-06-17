import type { IpoStatusResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const PATCH = createAdminRouteHandler<IpoStatusResponse>({
  method: "PATCH",
  resolvePath: (params) => `/admin/ipos/${params.ipoId}/status`
});
