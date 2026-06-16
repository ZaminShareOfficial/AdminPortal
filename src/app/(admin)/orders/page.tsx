import { OrdersContent } from "@/components/orders/orders-content";
import { getErrorMessage } from "@/lib/api/errors";
import { mapOpenOrderToRow, mapOrderToFeedItem } from "@/lib/mappers/order";
import { listOpenOrders } from "@/lib/services/backend";

export default async function OrdersPage() {
  try {
    const openOrders = await listOpenOrders();

    return (
      <OrdersContent
        orders={openOrders.map(mapOpenOrderToRow)}
        feed={openOrders.slice(0, 8).map(mapOrderToFeedItem)}
        openOrderCount={openOrders.length}
      />
    );
  } catch (error) {
    return (
      <OrdersContent
        orders={[]}
        feed={[]}
        openOrderCount={0}
        error={getErrorMessage(error, "Could not load orders from the backend.")}
      />
    );
  }
}
