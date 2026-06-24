import type { PropertyHoldersResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<PropertyHoldersResponse>({
  method: "GET",
  resolvePath: (params) => `/admin/portfolio/properties/${params.propertyId}`,
  hasBody: false
});
