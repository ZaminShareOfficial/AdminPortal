import type { OrderResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const PATCH = createAdminRouteHandler<OrderResponse>({
  method: "PATCH",
  resolvePath: (params) => `/orders/${params.orderId}`
});
