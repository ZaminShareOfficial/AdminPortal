import type { MintResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const POST = createAdminRouteHandler<MintResponse>({
  method: "POST",
  resolvePath: (params) => `/admin/ipos/${params.ipoId}/mint`,
  hasBody: false
});
