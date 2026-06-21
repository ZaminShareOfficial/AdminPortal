import type { KycStatusResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<KycStatusResponse>({
  method: "GET",
  resolvePath: () => "/kyc",
  hasBody: false
});
