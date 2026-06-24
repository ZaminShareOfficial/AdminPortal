import type { UserPortfolioResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<UserPortfolioResponse[]>({
  method: "GET",
  resolvePath: () => "/portfolio",
  hasBody: false
});
