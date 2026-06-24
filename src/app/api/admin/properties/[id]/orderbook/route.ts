import type { PropertyOrderBookResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<PropertyOrderBookResponse>({
  method: "GET",
  resolvePath: (params) => `/properties/${params.id}/orderbook`,
  hasBody: false
});
