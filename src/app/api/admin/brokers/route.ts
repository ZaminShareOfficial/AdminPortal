import type { AdminBrokerSummaryResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<AdminBrokerSummaryResponse[]>({
  method: "GET",
  resolvePath: () => "/admin/brokers",
  hasBody: false
});
