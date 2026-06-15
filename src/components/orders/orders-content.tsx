"use client";

import { Icon } from "@/components/admin/icon";

const orders = [
  { id: "#ORD-88219", user: "Jerome D. (Inst-02)", initials: "JD", color: "bg-tertiary-container/20 text-tertiary", property: "Skyline Residency (SR-102)", side: "Sell", sideClass: "bg-error-container text-error", price: "$1,240.50", qty: "15.00", status: "Open", statusDot: "bg-primary", highlighted: false },
  { id: "#ORD-88218", user: "Arcadia Mgmt.", initials: "AM", color: "bg-secondary-container/20 text-secondary", property: "Azure Marine Hub (AMH-05)", side: "Buy", sideClass: "bg-primary/10 text-primary", price: "$4,890.00", qty: "2.50", status: "Partial", statusDot: "bg-tertiary", highlighted: true },
  { id: "#ORD-88215", user: "Sarah L.", initials: "SL", color: "bg-on-surface-variant/10 text-on-surface-variant", property: "The Gentry Estate (TGE-01)", side: "Buy", sideClass: "bg-primary/10 text-primary", price: "$980.25", qty: "100.00", status: "Open", statusDot: "bg-primary", highlighted: false },
  { id: "#ORD-88214", user: "Vikram K.", initials: "VK", color: "bg-tertiary-container/20 text-tertiary", property: "Skyline Residency (SR-102)", side: "Sell", sideClass: "bg-error-container text-error", price: "$1,235.00", qty: "45.00", status: "Open", statusDot: "bg-primary", highlighted: true },
  { id: "#ORD-88210", user: "Future Capital", initials: "FC", color: "bg-secondary-container/20 text-secondary", property: "The Gentry Estate (TGE-01)", side: "Buy", sideClass: "bg-primary/10 text-primary", price: "$978.00", qty: "500.00", status: "Partial", statusDot: "bg-tertiary", highlighted: false },
];

const feed = [
  { type: "Match Found", time: "12:44:02", dotClass: "bg-primary", glow: true, body: <><span className="font-semibold text-on-surface">#ORD-88214</span> matched with <span className="font-semibold text-on-surface">#ORD-88190</span> for <span className="font-bold text-primary">12.00 AMH</span>.</> },
  { type: "Limit Buy", time: "12:43:55", dotClass: "bg-tertiary", body: <><span className="font-semibold text-on-surface">Future Capital</span> placed buy order for <span className="text-tertiary">500 TGE-01</span> tokens at $978.00.</> },
  { type: "Security Alert", time: "12:41:20", dotClass: "bg-error", typeClass: "text-error", body: <>Rapid successive cancels detected for user <span className="font-semibold text-on-surface">User-8821</span>. Flagged for review.</> },
  { type: "Withdrawal", time: "12:38:00", dotClass: "bg-on-surface-variant", body: <><span className="font-semibold text-on-surface">Jerome D.</span> initiated withdrawal of $45,000.00 to institutional wallet.</> },
  { type: "Market Sell", time: "12:35:44", dotClass: "bg-primary", body: <><span className="font-semibold text-on-surface">Arcadia Mgmt.</span> executed market sell for <span className="text-primary">150.00 SR-102</span>.</> },
];

export function OrdersContent() {
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

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Property Asset", options: ["All Properties", "Skyline Residency (SR-102)", "Azure Marine Hub (AMH-05)", "The Gentry Estate (TGE-01)"] },
            { label: "User Tier", options: ["All Tiers", "Institutional", "Retail Pro", "Standard"] },
            { label: "Order Type", options: ["All Types", "Buy Orders", "Sell Orders"] },
            { label: "Activity Status", options: ["Pending & Open", "Partially Filled", "Executed"] },
          ].map((f) => (
            <div key={f.label} className="flex flex-col gap-2 bg-surface-container p-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{f.label}</label>
              <select className="rounded border-none bg-surface-container-lowest text-xs text-on-surface focus:ring-1 focus:ring-primary/30" defaultValue={f.options[0]}>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
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
                {orders.map((o) => (
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
                        <div className={`h-1.5 w-1.5 rounded-full ${o.statusDot} shadow-[0_0_8px_rgba(255,182,139,0.5)]`} />
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 bg-surface-container-low p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Market Heat</span>
              <span className="text-[10px] font-bold text-tertiary">+12.4% Vol</span>
            </div>
            <div className="flex h-16 items-end gap-1">
              {[50, 66, 100, 75, 50, 83, 100].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 ${i === 6 ? "bg-primary shadow-[0_0_12px_rgba(255,182,139,0.3)]" : i >= 2 ? "bg-primary/40" : "bg-primary/10"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 bg-surface-container-low p-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Average Spread</span>
            <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">0.14<span className="ml-1 text-lg font-medium text-on-surface-variant">%</span></div>
            <p className="mt-1 text-[10px] font-medium text-primary">-0.02% from yesterday</p>
          </div>
          <div className="flex flex-col gap-1 bg-surface-container-low p-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Order Liquidity</span>
            <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">$2.84M</div>
            <p className="mt-1 text-[10px] font-medium text-on-surface-variant">Aggregated across all pools</p>
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
            {feed.map((item) => (
              <div key={item.time + item.type} className="relative border-l border-outline-variant/10 pb-6 pl-6">
                <span
                  className={`absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[3px] rounded-full ${item.dotClass}${item.glow ? " shadow-[0_0_8px_rgba(255,182,139,0.6)]" : ""}`}
                />
                <div className="mb-1 flex items-start justify-between">
                  <span className={`text-[10px] font-bold uppercase ${item.typeClass ?? "text-on-surface"}`}>{item.type}</span>
                  <span className="font-mono text-[9px] text-on-surface-variant">{item.time}</span>
                </div>
                <p className="text-xs leading-relaxed text-on-surface-variant">{item.body}</p>
              </div>
            ))}
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
