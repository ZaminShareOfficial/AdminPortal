import type { IpoSubscriptionSummaryResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<IpoSubscriptionSummaryResponse>({
  method: "GET",
  hasBody: false,
  resolvePath: (params) => `/admin/ipos/${params.ipoId}/subscriptions`
});
