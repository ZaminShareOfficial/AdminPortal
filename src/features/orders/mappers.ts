import { formatRelativeTime, formatUsd } from "@/lib/format";
import type { OpenOrder, OrderFeedItem, SurveillanceOrderRow } from "@/features/orders/types";

export function mapOpenOrderToRow(order: OpenOrder): SurveillanceOrderRow {
  const isBuy = order.side === "BUY";

  return {
    id: `#${order.orderId.slice(0, 8).toUpperCase()}`,
    user: "Market participant",
    initials: isBuy ? "BY" : "SL",
    color: isBuy
      ? "bg-primary/10 text-primary"
      : "bg-error-container/20 text-error",
    property: order.propertyTitle,
    side: isBuy ? "Buy" : "Sell",
    sideClass: isBuy
      ? "bg-primary/10 text-primary"
      : "bg-error-container text-error",
    price: formatUsd(order.price ?? 0),
    qty: order.remainingQuantity?.toFixed(2) ?? "—",
    status: order.status,
    statusDot: "bg-primary",
    highlighted: false,
  };
}

export function mapOrderToFeedItem(order: OpenOrder): OrderFeedItem {
  const isBuy = order.side === "BUY";

  return {
    type: isBuy ? "Limit Buy" : "Limit Sell",
    time: formatRelativeTime(order.createdAt ?? ""),
    dotClass: isBuy ? "bg-primary" : "bg-error",
    summary: `Open ${order.propertyTitle} ${isBuy ? "buy" : "sell"} order for ${order.remainingQuantity ?? "—"} tokens at ${formatUsd(order.price ?? 0)}.`,
  };
}
