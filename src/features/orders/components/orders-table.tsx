"use client";

import { useOverlayState } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@/components/admin/icon";
import { OrderTradesModal } from "@/features/orders/components/order-trades-modal";
import type { SurveillanceOrderRow } from "@/features/orders/types";
import { useOrderActions } from "@/features/orders/use-order-actions";

type OrdersTableProps = {
  orders: SurveillanceOrderRow[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const tradesModal = useOverlayState();
  const [activeOrder, setActiveOrder] = useState<SurveillanceOrderRow | null>(
    null,
  );
  const {
    actionError,
    isPending,
    trades,
    submitCancel,
    loadTrades,
    clearTrades
  } = useOrderActions();

  const openTrades = (order: SurveillanceOrderRow) => {
    setActiveOrder(order);
    clearTrades();
    loadTrades(order.orderId);
    tradesModal.open();
  };

  return (
    <>
      {actionError ? (
        <p className="mb-4 text-sm text-error" role="alert">
          {actionError}
        </p>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-surface-container">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-high">
                {[
                  "Order ID",
                  "User / Account",
                  "Property",
                  "Side",
                  "Price",
                  "Qty",
                  "Status",
                  "Actions"
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs font-medium">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-on-surface-variant"
                  >
                    No open orders in the market book.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="group border-b border-outline-variant/5 transition-colors hover:bg-surface-container-highest"
                  >
                    <td className="px-6 py-4 font-mono text-primary">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {order.property}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase ${order.sideClass}`}
                      >
                        {order.side}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">
                      {order.price}
                    </td>
                    <td className="px-6 py-4 text-right font-mono">
                      {order.qty}
                    </td>
                    <td className="px-6 py-4">{order.status}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          aria-label="Cancel order"
                          disabled={isPending}
                          onClick={() => submitCancel(order.orderId)}
                          className="p-1 transition-colors hover:text-error"
                          data-testid={`cancel-order-${order.orderId}`}
                        >
                          <Icon name="cancel" className="text-base" />
                        </button>
                        <button
                          type="button"
                          aria-label="View trades"
                          onClick={() => openTrades(order)}
                          className="p-1 transition-colors hover:text-tertiary"
                          data-testid={`view-trades-${order.orderId}`}
                        >
                          <Icon name="history" className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <OrderTradesModal
        isOpen={tradesModal.isOpen}
        onOpenChange={tradesModal.setOpen}
        orderLabel={activeOrder?.orderId ?? ""}
        trades={trades}
        isLoading={isPending && trades.length === 0}
        error={actionError}
      />
    </>
  );
}
