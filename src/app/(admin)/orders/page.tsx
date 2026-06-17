import { OrdersContent } from "@/features/orders";
import { loadOrdersPageData } from "@/features/orders/hooks";

export default async function OrdersPage() {
  const { orders, feed, openOrderCount, error } = await loadOrdersPageData();

  return (
    <OrdersContent
      orders={orders}
      feed={feed}
      openOrderCount={openOrderCount}
      error={error}
    />
  );
}
