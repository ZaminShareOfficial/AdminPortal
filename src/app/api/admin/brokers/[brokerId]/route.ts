import type { AdminBrokerDetailResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const PATCH = createAdminRouteHandler<AdminBrokerDetailResponse>({
  method: "PATCH",
  resolvePath: (params) => `/admin/brokers/${params.brokerId}`
});
