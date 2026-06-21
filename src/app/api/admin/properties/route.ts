import type { PropertyResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<PropertyResponse[]>({
  method: "GET",
  resolvePath: () => "/properties",
  hasBody: false
});

export const POST = createAdminRouteHandler<PropertyResponse>({
  method: "POST",
  resolvePath: () => "/admin/properties"
});
