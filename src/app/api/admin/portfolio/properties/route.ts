import type { PropertyPortfolioSummaryResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<PropertyPortfolioSummaryResponse[]>({
  method: "GET",
  resolvePath: () => "/admin/portfolio/properties",
  hasBody: false
});
