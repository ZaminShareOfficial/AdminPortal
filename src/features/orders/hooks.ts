import { getErrorMessage } from "@/lib/api/errors";
import { mapOpenOrderToRow, mapOrderToFeedItem } from "@/features/orders/mappers";
import { listOpenOrders } from "@/features/orders/services/orders-service";
import type { OrdersPageData } from "@/features/orders/types";

const FEED_ITEM_LIMIT = 8;

export async function loadOrdersPageData(): Promise<OrdersPageData> {
  try {
    const openOrders = await listOpenOrders();

    return {
      orders: openOrders.map(mapOpenOrderToRow),
      feed: openOrders.slice(0, FEED_ITEM_LIMIT).map(mapOrderToFeedItem),
      openOrderCount: openOrders.length,
      error: null,
    };
  } catch (error) {
    return {
      orders: [],
      feed: [],
      openOrderCount: 0,
      error: getErrorMessage(error, "Could not load orders from the backend."),
    };
  }
}
