import type { PropertyResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const POST = createAdminRouteHandler<PropertyResponse>({
  method: "POST",
  resolvePath: () => "/admin/properties"
});
