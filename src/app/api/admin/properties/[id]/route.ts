import type { PropertyResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const PATCH = createAdminRouteHandler<PropertyResponse>({
  method: "PATCH",
  resolvePath: (params) => `/admin/properties/${params.id}`
});
