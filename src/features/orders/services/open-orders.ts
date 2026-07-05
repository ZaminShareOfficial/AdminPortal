import type {
  BulletinBoardEntryResponse,
  PropertyOrderBookResponse
} from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";
import type { OpenOrder } from "@/features/orders/types";

const getBulletinBoard = () =>
  adminApiRequest<BulletinBoardEntryResponse[]>({
    method: "GET",
    url: "/orders/all"
  });

const getPropertyOrderBook = (propertyId: string) =>
  adminApiRequest<PropertyOrderBookResponse>({
    method: "GET",
    url: `/properties/${propertyId}/orderbook`
  });

const mapOrderBookLevel = (
  book: PropertyOrderBookResponse,
  side: "BUY" | "SELL",
  level: PropertyOrderBookResponse["bids"][number]
): OpenOrder => ({
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
  createdAt: level.createdAt
});

export const listOpenOrders = async (): Promise<OpenOrder[]> => {
  const bulletin = await getBulletinBoard();
  const active = bulletin.filter(
    (entry) =>
      (entry.openBuyCount ?? 0) > 0 || (entry.openSellCount ?? 0) > 0
  );

  const books = await Promise.all(
    active.map((entry) => getPropertyOrderBook(entry.propertyId))
  );

  return books.flatMap((book) => [
    ...book.bids.map((level) => mapOrderBookLevel(book, "BUY", level)),
    ...book.asks.map((level) => mapOrderBookLevel(book, "SELL", level))
  ]);
};
