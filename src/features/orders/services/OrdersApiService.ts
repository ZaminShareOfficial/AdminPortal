import { useAxios } from "@/hooks/useAxios";
import { adminApiRequest } from "@/lib/api/admin-api";
import type {
  BulletinBoardEntryResponse,
  OrderResponse,
  TradeResponse
} from "@/types/backend";

export const useFetchBulletinBoard = () => {
  return useAxios<BulletinBoardEntryResponse[]>("/orders/all", {
    method: "GET"
  });
};

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
