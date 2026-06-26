import { adminApiRequest } from "@/lib/api/admin-api";
import type { AdminBrokerSummaryResponse } from "@/types/backend";

export const listBrokers = () =>
  adminApiRequest<AdminBrokerSummaryResponse[]>({
    method: "GET",
    url: "/brokers"
  });
