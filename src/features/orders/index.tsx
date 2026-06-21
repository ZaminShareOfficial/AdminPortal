"use client";

import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { ActivityFeed } from "@/features/orders/components/activity-feed";
import { OrdersHeader } from "@/features/orders/components/orders-header";
import { OrdersStats } from "@/features/orders/components/orders-stats";
import { OrdersTable } from "@/features/orders/components/orders-table";
import type { OrdersContentProps } from "@/features/orders/types";

export function OrdersContent({
  orders,
  feed,
  openOrderCount,
  error = null,
}: OrdersContentProps) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="hide-scrollbar flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
        <OrdersHeader />

        {error ? <ApiErrorBanner message={error} /> : null}

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 bg-surface-container p-4 md:col-span-4">
            <p className="text-[10px] text-on-surface-variant">
              Filters are not wired yet. The table below shows live data from GET
              /orders/all.
            </p>
          </div>
        </div>

        <OrdersTable orders={orders} />
        <OrdersStats openOrderCount={openOrderCount} feedItemCount={feed.length} />
      </div>

      <ActivityFeed feed={feed} />
    </div>
  );
}
