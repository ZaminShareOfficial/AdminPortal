import type { PropertyResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<PropertyResponse>({
  method: "GET",
  resolvePath: (params) => `/properties/${params.id}`,
  hasBody: false
});

export const PATCH = createAdminRouteHandler<PropertyResponse>({
  method: "PATCH",
  resolvePath: (params) => `/admin/properties/${params.id}`
});
