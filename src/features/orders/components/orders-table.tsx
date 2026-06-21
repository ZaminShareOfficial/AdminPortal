import { Icon } from "@/components/admin/icon";
import type { SurveillanceOrderRow } from "@/features/orders/types";

const TABLE_COLUMNS = [
  { header: "Order ID", align: "" },
  { header: "User / Account", align: "" },
  { header: "Property", align: "" },
  { header: "Side", align: "text-center" },
  { header: "Price", align: "text-right" },
  { header: "Qty", align: "text-right" },
  { header: "Status", align: "" },
  { header: "Actions", align: "text-right" },
] as const;

type OrdersTableProps = {
  orders: SurveillanceOrderRow[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
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
                  key={order.id}
                  className={`group border-b border-outline-variant/5 transition-colors hover:bg-surface-container-highest ${order.highlighted ? "bg-surface-container-low" : ""}`}
                >
                  <td className="px-6 py-4 font-mono text-primary">{order.id}</td>
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
                  <td className="px-6 py-4 text-right font-mono">{order.price}</td>
                  <td className="px-6 py-4 text-right font-mono">{order.qty}</td>
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
                      <button
                        type="button"
                        aria-label="Cancel order"
                        className="p-1 transition-colors hover:text-error"
                      >
                        <Icon name="cancel" className="text-base" />
                      </button>
                      <button
                        type="button"
                        aria-label="Freeze user"
                        className="p-1 transition-colors hover:text-secondary"
                      >
                        <Icon name="block" className="text-base" />
                      </button>
                      <button
                        type="button"
                        aria-label="View history"
                        className="p-1 transition-colors hover:text-tertiary"
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
  );
}
