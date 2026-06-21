import type { TradeResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<TradeResponse[]>({
  method: "GET",
  resolvePath: (params) => `/orders/${params.orderId}/trades`,
  hasBody: false
});
