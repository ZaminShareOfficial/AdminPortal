import type { ProfileResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<ProfileResponse>({
  method: "GET",
  resolvePath: () => "/me",
  hasBody: false
});

export const PATCH = createAdminRouteHandler<ProfileResponse>({
  method: "PATCH",
  resolvePath: () => "/me"
});
