import { adminApiRequest } from "@/lib/api/admin-api";
import type {
  AdminBrokerDetailResponse,
  AdminBrokerSummaryResponse,
  ReviewBrokerRequest
} from "@/types/backend";

export const listBrokers = () =>
  adminApiRequest<AdminBrokerSummaryResponse[]>({
    method: "GET",
    url: "/brokers"
  });

export const reviewBroker = (brokerId: string, body: ReviewBrokerRequest) =>
  adminApiRequest<AdminBrokerDetailResponse>({
    method: "PATCH",
    url: `/brokers/${brokerId}`,
    data: body
  });
