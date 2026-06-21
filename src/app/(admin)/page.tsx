import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { formatNumber, formatPaise } from "@/lib/format";
import {
  getPropertyStatusClass,
  mapPropertyStatus,
} from "@/lib/mappers/property";
import { summarizePortfolios } from "@/lib/mappers/portfolio";
import { loadDashboardData } from "@/lib/services/backend";

export default async function DashboardPage() {
  let error: string | null = null;
  let propertyCount = 0;
  let activeIpoCount = 0;
  let openOrderCount = 0;
  let investorCount = 0;
  let totalInvested = "—";
  let totalCurrent = "—";
  let recentProperties: Array<{
    name: string;
    type: string;
    valuation: string;
    status: string;
    statusClass: string;
    broker: string;
    highlighted: boolean;
  }> = [];
  let liveOrders: Array<{
    symbol: string;
    detail: string;
    price: string;
    time: string;
    borderClass: string;
    priceClass: string;
  }> = [];

  try {
    const data = await loadDashboardData();
    propertyCount = data.properties.length;
    activeIpoCount = data.ipos.length;
    openOrderCount = data.openOrders.length;
    investorCount = data.userPortfolios.length;
    const portfolioSummary = summarizePortfolios(data.userPortfolios);
    totalInvested = formatPaise(portfolioSummary.totalInvested);
    totalCurrent = formatPaise(portfolioSummary.totalCurrent);

    recentProperties = data.properties.slice(0, 3).map((property, index) => ({
      name: property.title,
      type: property.propertyType ?? "Property",
      valuation: formatPaise(property.valuation),
      status: mapPropertyStatus(property.status),
      statusClass: getPropertyStatusClass(mapPropertyStatus(property.status)),
      broker: property.listingBroker ?? "—",
      highlighted: index === 1,
    }));

    liveOrders = data.openOrders.slice(0, 4).map((order) => {
      const isBuy = order.side === "BUY";
      return {
        symbol: order.propertyTitle,
        detail: `${isBuy ? "Buy" : "Sell"} • ${order.remainingQuantity ?? "—"} Units`,
        price: formatPaise(order.price),
        time: "Live",
        borderClass: isBuy ? "border-primary" : "border-error",
        priceClass: isBuy ? "text-primary" : "text-on-surface",
      };
    });
  } catch (loadError) {
    await guardUnauthorized(loadError);
    error = getErrorMessage(
      loadError,
      "Could not load dashboard data from the backend.",
    );
  }

  const topMetrics = [
    {
      label: "Total Properties",
      value: formatNumber(propertyCount),
      trend: "Live",
      trendIcon: "trending_up",
      trendClass: "text-primary",
      valueClass: "text-on-surface",
      icon: "domain",
    },
    {
      label: "Active IPOs",
      value: formatNumber(activeIpoCount),
      trend: "Live",
      trendIcon: "rocket",
      trendClass: "text-secondary",
      valueClass: "text-secondary",
      icon: "rocket_launch",
    },
  {
    label: "Total Investors",
    value: formatNumber(investorCount),
    trend: "Live",
    trendIcon: "trending_up",
    trendClass: "text-primary",
    valueClass: "text-on-surface",
    icon: "group",
  },
  {
    label: "Portfolio Value",
    value: totalCurrent,
    trend: "Live",
    trendIcon: "payments",
    trendClass: "text-primary",
    valueClass: "text-primary",
    icon: "account_balance_wallet",
  },
  {
    label: "Total Invested",
    value: totalInvested,
    trend: "Live",
    trendIcon: "bar_chart",
    trendClass: "text-primary",
    valueClass: "text-on-surface",
    icon: "bar_chart",
  },
  {
    label: "Orders Pending",
    value: `${formatNumber(openOrderCount)} Orders`,
    trend: "Live book",
    trendIcon: "pending",
    trendClass: "text-tertiary",
    valueClass: "text-tertiary",
    icon: "pending",
  },
  ];

  const detailMetrics = [
  {
    label: "Active Properties",
    value: formatNumber(propertyCount),
    icon: "domain",
    iconClass: "text-primary",
    footer: (
      <p className="mt-4 text-[10px] font-medium text-on-surface-variant">
        From GET /properties
      </p>
    ),
  },
  {
    label: "Active IPOs",
    value: formatNumber(activeIpoCount),
    icon: "rocket_launch",
    iconClass: "text-secondary",
    valueClass: "text-secondary",
    footer: (
      <p className="mt-4 text-[10px] font-medium text-on-surface-variant">
        From GET /ipos?active=true
      </p>
    ),
  },
  {
    label: "Investors",
    value: formatNumber(investorCount),
    icon: "group",
    iconClass: "text-tertiary",
    valueClass: "text-tertiary",
    footer: (
      <p className="mt-4 text-[10px] font-medium text-on-surface-variant">
        From GET /portfolio
      </p>
    ),
  },
  {
    label: "Orders Pending",
    value: `${formatNumber(openOrderCount)} Orders`,
    icon: "pending",
    iconClass: "text-tertiary",
    valueClass: "text-tertiary",
    footer: (
      <p className="mt-4 text-[10px] font-medium text-on-surface-variant">
        From GET /orders/all
      </p>
    ),
  },
  ];

  const chartBars =
    recentProperties.length > 0
      ? recentProperties.map((property, index) => ({
          height: `${55 + index * 15}%`,
          value: property.valuation,
          active: index === recentProperties.length - 1,
        }))
      : [];

  return (
    <div className="hide-scrollbar flex-1 overflow-y-auto p-8">
      {error ? (
        <div className="mb-6">
          <ApiErrorBanner message={error} />
        </div>
      ) : null}
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
            Operational Overview
          </p>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">
            Institutional Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 border border-outline-variant px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-all hover:bg-surface-container-high"
          >
            Create Property
          </button>
          <button
            type="button"
            className="flex items-center gap-2 border border-outline-variant px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-all hover:bg-surface-container-high"
          >
            Approve Broker
          </button>
          <button
            type="button"
            className="saffron-gradient flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20"
          >
            Launch IPO
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {topMetrics.map((metric) => (
          <div
            key={metric.label}
            className="group relative overflow-hidden bg-surface-container-high p-5 lg:col-span-1"
          >
            <div className="relative z-10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {metric.label}
              </p>
              <h3
                className={`font-headline text-2xl font-bold ${metric.valueClass}`}
              >
                {metric.value}
              </h3>
              <div
                className={`mt-2 flex items-center gap-1 text-xs ${metric.trendClass}`}
              >
                <Icon name={metric.trendIcon} className="text-xs" />
                {metric.trend}
              </div>
            </div>
            <Icon
              name={metric.icon}
              className="absolute -bottom-2 -right-2 rotate-12 text-6xl text-on-surface-variant opacity-5 transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {detailMetrics.map((metric) => (
            <div
              key={metric.label}
              className="group flex flex-col justify-between bg-surface-container p-6 transition-all hover:bg-surface-container-high"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {metric.label}
                  </p>
                  <h3
                    className={`font-headline text-2xl font-bold ${metric.valueClass ?? "text-on-surface"}`}
                  >
                    {metric.value}
                  </h3>
                </div>
                <Icon
                  name={metric.icon}
                  className={`transition-transform group-hover:scale-110 ${metric.iconClass}`}
                />
              </div>
              {metric.footer}
            </div>
          ))}
        </div>

        <div className="bg-surface-container p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h4 className="font-headline font-bold text-on-surface">
                IPO Subscription Trends
              </h4>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">
                Capital raised per active listing
              </p>
            </div>
            <Icon
              name="download"
              className="cursor-pointer text-sm text-on-surface-variant"
            />
          </div>
          <div className="flex h-64 items-end justify-around gap-4 border-b border-outline-variant/10 px-4">
            {chartBars.length === 0 ? (
              <p className="w-full py-12 text-center text-sm text-on-surface-variant">
                No property valuation data to chart yet.
              </p>
            ) : (
              chartBars.map((bar) => (
              <div
                key={bar.value}
                style={{ height: bar.height }}
                className={`group relative w-full rounded-t-sm transition-all ${
                  bar.active
                    ? "bg-primary-container/80 hover:bg-primary-container"
                    : "bg-primary-container/20 hover:bg-primary-container/40"
                }`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {bar.value}
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="min-w-0 overflow-hidden bg-surface-container xl:col-span-2">
          <div className="flex items-center justify-between p-6">
            <h4 className="font-headline font-bold text-on-surface">
              Recent Property Listings
            </h4>
            <button
              type="button"
              className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  {[
                    "Property Asset",
                    "Type",
                    "Valuation",
                    "Status",
                    "Broker",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {recentProperties.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-on-surface-variant"
                    >
                      No property listings available yet.
                    </td>
                  </tr>
                ) : (
                  recentProperties.map((property) => (
                    <tr
                      key={property.name}
                      className={`transition-colors hover:bg-surface-container-high ${property.highlighted ? "bg-surface-container-low/30" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-surface-container-highest text-[10px] font-bold text-on-surface-variant">
                            {property.name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium text-on-surface">
                            {property.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {property.type}
                      </td>
                      <td className="px-6 py-4 font-bold text-on-surface">
                        {property.valuation}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-[10px] font-bold uppercase ${property.statusClass}`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {property.broker}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden bg-surface-container">
          <div className="p-6">
            <h4 className="font-headline font-bold text-on-surface">
              Live Order Book
            </h4>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">
              Secondary market activity
            </p>
          </div>
          <div className="space-y-4 px-6 pb-6">
            {liveOrders.length === 0 ? (
              <p className="text-xs text-on-surface-variant">
                No live orders in the market book.
              </p>
            ) : (
              liveOrders.map((order) => (
              <div
                key={`${order.symbol}-${order.time}`}
                className={`flex items-center justify-between border-l-2 bg-surface-container-low p-3 ${order.borderClass}`}
              >
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    {order.symbol}
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    {order.detail}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${order.priceClass}`}>
                    {order.price}
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    {order.time}
                  </p>
                </div>
              </div>
              ))
            )}
            <button
              type="button"
              className="w-full bg-surface-container-highest py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-all hover:text-on-surface"
            >
              Open Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
