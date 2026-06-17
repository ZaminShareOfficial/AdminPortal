import type { OrderResponse, TradeResponse } from "@/types/backend";
import { adminClient } from "@/lib/api/admin-client";

export const cancelOrder = (orderId: string) =>
  adminClient.patch<OrderResponse>(`/orders/${orderId}`, { quantity: 0 });

export const listOrderTrades = (orderId: string) =>
  adminClient.get<TradeResponse[]>(`/orders/${orderId}/trades`);
