import type { TemplateResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const POST = createAdminRouteHandler<TemplateResponse>({
  method: "POST",
  resolvePath: () => "/admin/template"
});

export const PATCH = createAdminRouteHandler<TemplateResponse>({
  method: "PATCH",
  resolvePath: () => "/admin/template"
});
