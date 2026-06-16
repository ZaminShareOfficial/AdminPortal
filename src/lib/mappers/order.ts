import { formatRelativeTime, formatUsd } from "@/lib/format";

export type SurveillanceOrderRow = {
  id: string;
  user: string;
  initials: string;
  color: string;
  property: string;
  side: "Buy" | "Sell";
  sideClass: string;
  price: string;
  qty: string;
  status: string;
  statusDot: string;
  highlighted?: boolean;
};

type OpenOrder = Awaited<
  ReturnType<typeof import("@/lib/services/backend").listOpenOrders>
>[number];

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
    price: formatUsd(order.price),
    qty: order.remainingQuantity?.toFixed(2) ?? "—",
    status: order.status,
    statusDot: "bg-primary",
    highlighted: false,
  };
}

export function mapOrderToFeedItem(order: OpenOrder) {
  const isBuy = order.side === "BUY";

  return {
    type: isBuy ? "Limit Buy" : "Limit Sell",
    time: formatRelativeTime(order.createdAt),
    dotClass: isBuy ? "bg-primary" : "bg-error",
    summary: `Open ${order.propertyTitle} ${isBuy ? "buy" : "sell"} order for ${order.remainingQuantity ?? "—"} tokens at ${formatUsd(order.price)}.`,
  };
}
