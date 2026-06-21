import type { IpoDetailResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<IpoDetailResponse>({
  method: "GET",
  hasBody: false,
  resolvePath: (params) => `/ipos/${params.ipoId}`
});
