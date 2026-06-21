import type { MintIpoResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const POST = createAdminRouteHandler<MintIpoResponse>({
  method: "POST",
  resolvePath: (params) => `/admin/ipos/${params.ipoId}/mint`,
  hasBody: false
});
