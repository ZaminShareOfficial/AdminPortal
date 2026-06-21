"use client";

import { Button, useOverlayState } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@/components/admin/icon";
import { CancelOrderModal } from "@/features/orders/components/cancel-order-modal";
import { OrderTradesModal } from "@/features/orders/components/order-trades-modal";
import type { SurveillanceOrderRow } from "@/features/orders/types";
import { useOrderActions } from "@/features/orders/use-order-actions";

const TABLE_COLUMNS = [
  { header: "Order ID", align: "" },
  { header: "User / Account", align: "" },
  { header: "Property", align: "" },
  { header: "Side", align: "text-center" },
  { header: "Price", align: "text-right" },
  { header: "Qty", align: "text-right" },
  { header: "Status", align: "" },
  { header: "Actions", align: "text-right" }
] as const;

type OrdersTableProps = {
  orders: SurveillanceOrderRow[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const tradesModal = useOverlayState();
  const cancelDialog = useOverlayState();
  const [activeOrder, setActiveOrder] = useState<SurveillanceOrderRow | null>(
    null
  );
  const [orderToCancel, setOrderToCancel] = useState<SurveillanceOrderRow | null>(
    null
  );
  const {
    cancelError,
    tradesError,
    isCancelling,
    isLoadingTrades,
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

  const confirmCancel = () => {
    if (!orderToCancel) {
      return;
    }
    submitCancel(orderToCancel.orderId);
    cancelDialog.close();
    setOrderToCancel(null);
  };

  return (
    <>
      {cancelError ? (
        <p className="mb-4 text-sm text-error" role="alert">
          {cancelError}
        </p>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-surface-container">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-high">
                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col.header}
                    scope="col"
                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${col.align}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs font-medium">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={TABLE_COLUMNS.length}
                    className="px-6 py-10 text-center text-on-surface-variant"
                  >
                    No open orders in the market book.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className={`group border-b border-outline-variant/5 transition-colors hover:bg-surface-container-highest ${order.highlighted ? "bg-surface-container-low" : ""}`}
                  >
                    <td className="px-6 py-4 font-mono text-primary">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-sm text-[10px] ${order.color}`}
                        >
                          {order.initials}
                        </div>
                        <span>{order.user}</span>
                      </div>
                    </td>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${order.statusDot} shadow-primary-glow`}
                        />
                        <span>{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          isIconOnly
                          variant="ghost"
                          aria-label="Cancel order"
                          isDisabled={isCancelling}
                          onPress={() => {
                            setOrderToCancel(order);
                            cancelDialog.open();
                          }}
                          data-testid={`cancel-order-${order.orderId}`}
                        >
                          <Icon name="cancel" className="text-base text-error" />
                        </Button>
                        <Button
                          isIconOnly
                          variant="ghost"
                          aria-label="View trades"
                          onPress={() => openTrades(order)}
                          data-testid={`view-trades-${order.orderId}`}
                        >
                          <Icon name="history" className="text-base text-tertiary" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {tradesModal.isOpen ? (
        <OrderTradesModal
          isOpen={tradesModal.isOpen}
          onOpenChange={tradesModal.setOpen}
          orderLabel={activeOrder?.orderId ?? ""}
          trades={trades}
          isLoading={isLoadingTrades}
          error={tradesError}
        />
      ) : null}

      {cancelDialog.isOpen ? (
        <CancelOrderModal
          isOpen={cancelDialog.isOpen}
          onOpenChange={cancelDialog.setOpen}
          orderId={orderToCancel?.orderId ?? null}
          isCancelling={isCancelling}
          onConfirm={confirmCancel}
        />
      ) : null}
    </>
  );
}
