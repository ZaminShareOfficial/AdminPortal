import type { BulletinBoardEntryResponse, PropertyOrderBookResponse } from "@/types/backend";
import { apiFetch } from "@/lib/api/server-client";
import type { OpenOrder } from "@/features/orders/types";

function getBulletinBoard() {
  return apiFetch<BulletinBoardEntryResponse[]>("/orders/all");
}

function getPropertyOrderBook(propertyId: string) {
  return apiFetch<PropertyOrderBookResponse>(
    `/properties/${propertyId}/orderbook`,
  );
}

function mapOrderBookLevel(
  book: PropertyOrderBookResponse,
  side: "BUY" | "SELL",
  level: PropertyOrderBookResponse["bids"][number],
): OpenOrder {
  return {
    orderId: level.orderId,
    propertyId: book.propertyId,
    propertyTitle: book.propertyTitle,
    side,
    price: level.price,
    quantity: level.quantity,
    filledQuantity: level.filledQuantity,
    remainingQuantity:
      level.quantity != null && level.filledQuantity != null
        ? level.quantity - level.filledQuantity
        : level.quantity,
    status: "OPEN",
    createdAt: level.createdAt,
  };
}

export async function listOpenOrders(): Promise<OpenOrder[]> {
  const bulletin = await getBulletinBoard();
  const active = bulletin.filter(
    (entry) =>
      (entry.openBuyCount ?? 0) > 0 || (entry.openSellCount ?? 0) > 0,
  );

  const books = await Promise.all(
    active.map((entry) => getPropertyOrderBook(entry.propertyId)),
  );

  return books.flatMap((book) => [
    ...book.bids.map((level) => mapOrderBookLevel(book, "BUY", level)),
    ...book.asks.map((level) => mapOrderBookLevel(book, "SELL", level)),
  ]);
}
