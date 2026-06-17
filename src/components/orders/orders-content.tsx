"use client";

import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import type { SurveillanceOrderRow } from "@/lib/mappers/order";

type FeedItem = {
  type: string;
  time: string;
  dotClass: string;
  typeClass?: string;
  glow?: boolean;
  summary: string;
};

type OrdersContentProps = {
  orders: SurveillanceOrderRow[];
  feed: FeedItem[];
  openOrderCount: number;
  error?: string | null;
};

export function OrdersContent({
  orders,
  feed,
  openOrderCount,
  error = null,
}: OrdersContentProps) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="hide-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto p-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Market Monitoring</span>
            <h1 className="font-headline text-3xl font-extrabold leading-tight text-on-surface">Order Surveillance</h1>
          </div>
          <div className="flex rounded bg-surface-container-low p-1">
            <button type="button" className="rounded bg-surface-container-high px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">Real-time</button>
            <button type="button" className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">History</button>
          </div>
        </div>

        {error ? <ApiErrorBanner message={error} /> : null}

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 bg-surface-container p-4 md:col-span-4">
            <p className="text-[10px] text-on-surface-variant">
              Filters are not wired yet. The table below shows live data from GET /orders/all.
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-surface-container">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container-high">
                  {[
                    { h: "Order ID", align: "" },
                    { h: "User / Account", align: "" },
                    { h: "Property", align: "" },
                    { h: "Side", align: "text-center" },
                    { h: "Price", align: "text-right" },
                    { h: "Qty", align: "text-right" },
                    { h: "Status", align: "" },
                    { h: "Actions", align: "text-right" },
                  ].map((col) => (
                    <th key={col.h} scope="col" className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${col.align}`}>{col.h}</th>
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
                  orders.map((o) => (
                  <tr key={o.id} className={`group border-b border-outline-variant/5 transition-colors hover:bg-surface-container-highest ${o.highlighted ? "bg-surface-container-low" : ""}`}>
                    <td className="px-6 py-4 font-mono text-primary">{o.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-sm text-[10px] ${o.color}`}>{o.initials}</div>
                        <span>{o.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{o.property}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase ${o.sideClass}`}>{o.side}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{o.price}</td>
                    <td className="px-6 py-4 text-right font-mono">{o.qty}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${o.statusDot} shadow-primary-glow`} />
                        <span>{o.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button type="button" aria-label="Cancel order" className="p-1 transition-colors hover:text-error"><Icon name="cancel" className="text-base" /></button>
                        <button type="button" aria-label="Freeze user" className="p-1 transition-colors hover:text-secondary"><Icon name="block" className="text-base" /></button>
                        <button type="button" aria-label="View history" className="p-1 transition-colors hover:text-tertiary"><Icon name="history" className="text-base" /></button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 bg-surface-container-low p-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Open Orders</span>
            <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">{openOrderCount}</div>
          </div>
          <div className="flex flex-col gap-1 bg-surface-container-low p-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Feed Items</span>
            <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">{feed.length}</div>
            <p className="mt-1 text-[10px] font-medium text-on-surface-variant">From live order book</p>
          </div>
          <div className="flex flex-col gap-1 bg-surface-container-low p-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Order Liquidity</span>
            <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">
              {openOrderCount}
              <span className="ml-1 text-lg font-medium text-on-surface-variant">Orders</span>
            </div>
            <p className="mt-1 text-[10px] font-medium text-on-surface-variant">Open market orders</p>
          </div>
        </div>
      </div>

      <aside className="flex w-80 shrink-0 flex-col overflow-hidden border-l border-outline-variant/10 bg-surface-container-lowest">
        <div className="border-b border-outline-variant/10 p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface">Live Activity Feed</h2>
          <p className="mt-1 text-[10px] text-on-surface-variant">Real-time surveillance stream</p>
        </div>
        <div className="hide-scrollbar flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {feed.length === 0 ? (
              <p className="text-xs text-on-surface-variant">
                No live order activity yet.
              </p>
            ) : (
              feed.map((item) => (
              <div key={item.time + item.type} className="relative border-l border-outline-variant/10 pb-6 pl-6">
                <span
                  className={`absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[3px] rounded-full ${item.dotClass}${item.glow ? " shadow-primary-glow-strong" : ""}`}
                />
                <div className="mb-1 flex items-start justify-between">
                  <span className={`text-[10px] font-bold uppercase ${item.typeClass ?? "text-on-surface"}`}>{item.type}</span>
                  <span className="font-mono text-[9px] text-on-surface-variant">{item.time}</span>
                </div>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  {item.summary}
                </p>
              </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-surface-container-low/50 p-4">
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2 text-[10px] font-bold uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-container">
            <Icon name="download" className="text-sm" />
            Export Activity Log
          </button>
        </div>
      </aside>
    </div>
  );
}
