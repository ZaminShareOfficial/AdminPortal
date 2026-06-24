import type { BulletinBoardEntryResponse } from "@/types/backend";
import { createAdminRouteHandler } from "@/lib/api/admin-route";

export const GET = createAdminRouteHandler<BulletinBoardEntryResponse[]>({
  method: "GET",
  resolvePath: () => "/orders/all",
  hasBody: false
});
