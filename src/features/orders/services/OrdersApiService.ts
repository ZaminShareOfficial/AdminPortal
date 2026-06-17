import type { OrderResponse, TradeResponse } from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";

export const cancelOrder = (orderId: string) =>
  adminApiRequest<OrderResponse>({
    method: "PATCH",
    url: `/orders/${orderId}`,
    data: { quantity: 0 }
  });

export const listOrderTrades = (orderId: string, signal?: AbortSignal) =>
  adminApiRequest<TradeResponse[]>({
    method: "GET",
    url: `/orders/${orderId}/trades`,
    signal
  });
