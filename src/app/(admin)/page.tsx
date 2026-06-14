import Image from "next/image";
import { Icon } from "@/components/admin/icon";

const topMetrics = [
  {
    label: "Total Properties",
    value: "1,248",
    trend: "12%",
    trendIcon: "trending_up",
    trendClass: "text-primary",
    valueClass: "text-on-surface",
    icon: "domain",
  },
  {
    label: "Active IPOs",
    value: "24",
    trend: "4 Live",
    trendIcon: "rocket",
    trendClass: "text-secondary",
    valueClass: "text-secondary",
    icon: "rocket_launch",
  },
  {
    label: "Total Investors",
    value: "8.4k",
    trend: "5.2%",
    trendIcon: "trending_up",
    trendClass: "text-primary",
    valueClass: "text-on-surface",
    icon: "group",
  },
  {
    label: "24h Volume",
    value: "$2.4M",
    trend: "1.4%",
    trendIcon: "trending_down",
    trendClass: "text-error",
    valueClass: "text-on-surface",
    icon: "bar_chart",
  },
  {
    label: "Revenue (MTD)",
    value: "$412k",
    trend: "On Track",
    trendIcon: "payments",
    trendClass: "text-primary",
    valueClass: "text-primary",
    icon: "account_balance_wallet",
  },
  {
    label: "Pending Approvals",
    value: "18",
    trend: "5 Urgent",
    trendIcon: "history",
    trendClass: "text-tertiary",
    valueClass: "text-tertiary",
    icon: "pending_actions",
  },
];

const detailMetrics = [
  {
    label: "Total Broker Activity",
    value: "1,240 Actions",
    icon: "badge",
    iconClass: "text-primary",
    footer: (
      <div className="mt-4 flex h-6 items-end gap-1">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
          <div className="h-full w-[75%] bg-primary" />
        </div>
        <span className="text-[10px] font-bold text-primary">Active</span>
      </div>
    ),
  },
  {
    label: "User Complaints",
    value: "12 Open",
    icon: "report",
    iconClass: "text-error",
    valueClass: "text-error",
    footer: (
      <div className="mt-4 flex items-center gap-1 text-[10px] font-medium text-on-surface-variant">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-error" />
        Requires immediate attention
      </div>
    ),
  },
  {
    label: "Total Brokerage",
    value: "$242.5k",
    icon: "account_balance",
    iconClass: "text-secondary",
    valueClass: "text-secondary",
    footer: (
      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-secondary">
        <Icon name="trending_up" className="text-xs" />
        +8.4% this week
      </div>
    ),
  },
  {
    label: "Orders Pending",
    value: "48 Orders",
    icon: "pending",
    iconClass: "text-tertiary",
    valueClass: "text-tertiary",
    footer: (
      <p className="mt-4 text-[10px] font-medium text-on-surface-variant">
        Current processing queue
      </p>
    ),
  },
];

const chartBars = [
  { height: "45%", value: "$2.1M", active: false },
  { height: "70%", value: "$3.4M", active: false },
  { height: "95%", value: "$5.8M", active: true },
  { height: "40%", value: "$1.8M", active: false },
  { height: "60%", value: "$2.9M", active: false },
];

const properties = [
  {
    name: "The Zenith Plaza",
    type: "Commercial",
    valuation: "$12,450,000",
    status: "Pending",
    statusClass: "bg-primary-container/10 text-primary",
    broker: "Global Realty Ltd.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBl73J3bpO5PSvptBK-cE0dAWklIMsOx0HtNGr75UduBDgYc8WrEFQI26lD6e64eh9fK1z4A_QfQqApUayu6AVZH4r7xKhuVLzm9Mu2lnJfUYR9WMhUYfcKVR7h9XC-tjnoeZH3l6F7WZL6a9ASNcDQdIEbtecobQGgGcFv8Z6K6cS0IP_k7XLw0bBOURI5EqRdS6K4yGUUXgbJWQ5L6uUD378TinhUT_CSguwT3Sb__OBRtnC8lHT74Feyk2qYzLzFn83NX-rlYqIl",
    highlighted: false,
  },
  {
    name: "Aura Residences",
    type: "Residential",
    valuation: "$8,200,000",
    status: "IPO Active",
    statusClass: "bg-secondary-container/10 text-secondary",
    broker: "Prime Estates",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr8JFN9uePAUjUi0616R5biM6qC7oVArZsJ4n0aqald7B68AjiIguKsH0GhyEm8O26W2i71z1hXqsmzyOYp3JE7XKp-4NGI4YfjEp-R-7FT2J1D6dY4ymktiDcQYd8HIfjJiBqb24i8RZp8mMW8dnc1riQ6K1ufH7qB3bLIo7D0DtJJ9ECNpl43ypbGtZw9lFrJux8K7C9MpsRhJUxgF3L9f4JswEylzmAVyTFygrVirAhe1ZjKvFlfViltOJBzdnt2Qh1iaFY8FpE",
    highlighted: true,
  },
  {
    name: "Logistic Hub X",
    type: "Industrial",
    valuation: "$15,000,000",
    status: "Registered",
    statusClass: "bg-tertiary-container/10 text-tertiary",
    broker: "AssetCorp India",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3mjjHmzS6IobeobaXeoM_CFFSM_acYSaT_WXzoqFWsoEkQg2vVgh_r8Pxrfft9Cp5wR-NbnTNCbkmLiajuQP1fGp8FPDxBUjTffMc1mbg9EMJEaGedaTjeqBvxh8KB5jclTCuoDfIRlUkLIMod47FsoE1py4AvhKwcygMGmCMfZjDV2vUey6BNvOiJMtuo1l0DS57DYH4WW8nyVJntHdG_oGJf5QCpXn3jSPI3qvEBMRNYoiUeL5rl8AWC4MOEmSuOQkyi155p_qa",
    highlighted: false,
  },
];

const liveOrders = [
  {
    symbol: "ZENITH-RWA-24",
    detail: "Buy • 1,200 Units",
    price: "$1,042.50",
    time: "Just now",
    borderClass: "border-primary",
    priceClass: "text-primary",
  },
  {
    symbol: "AURA-LNX-11",
    detail: "Sell • 450 Units",
    price: "$512.20",
    time: "2m ago",
    borderClass: "border-error",
    priceClass: "text-on-surface",
  },
  {
    symbol: "HUBX-PREM",
    detail: "Buy • 2,000 Units",
    price: "$89.00",
    time: "5m ago",
    borderClass: "border-primary",
    priceClass: "text-primary",
  },
  {
    symbol: "ZENITH-RWA-24",
    detail: "Buy • 50 Units",
    price: "$1,042.55",
    time: "12m ago",
    borderClass: "border-primary",
    priceClass: "text-primary",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
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
            {chartBars.map((bar) => (
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
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="overflow-hidden bg-surface-container xl:col-span-2">
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
            <table className="w-full border-collapse text-left text-sm">
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
                {properties.map((property) => (
                  <tr
                    key={property.name}
                    className={`transition-colors hover:bg-surface-container-high ${property.highlighted ? "bg-surface-container-low/30" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-surface-container-highest">
                          <Image
                            src={property.image}
                            alt={property.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover opacity-60 grayscale"
                          />
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
                ))}
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
            {liveOrders.map((order) => (
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
            ))}
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
