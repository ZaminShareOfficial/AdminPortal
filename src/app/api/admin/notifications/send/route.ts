import type { SendNotificationResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const POST = createAdminRouteHandler<SendNotificationResponse>({
  method: "POST",
  resolvePath: () => "/internal/admin/notification/send"
});
