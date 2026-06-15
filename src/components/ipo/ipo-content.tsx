import Image from "next/image";
import { Icon } from "@/components/admin/icon";

const ipos = [
  {
    name: "Emerald Heights",
    id: "EH-2024-01",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu1lg4swJwDIAlT-bJscsUntDuZgsX4bx-xwlAP87m1nYpEiXjOlk3SHwdhtfG71K9s8zDXsE-6oi4LmiJt6wwRIMJZjYP-f5ZjAEOALLKA4ysoWI3HVbBgguLrkJc86iZ3Utaw7Gj0qRtNpbNWgqWA44_Yl_SviHd2Bngw1W7cALociJLNDYPUyE365lIc5YLUHxqXXIcJWktcTmStfDcTbMjeDh47Nz6qu7Zt_vyfNJ3EzY-_e2x-yvALF6RSk1qTp54fHjYFm8J",
    supply: "5,000,000",
    price: "$12.50",
    progress: 82,
    progressLabel: "$51.2M / $62.5M",
    status: "Subscription",
    statusColor: "text-secondary",
    dotColor: "bg-secondary",
    active: true,
  },
  {
    name: "Nexus Office Park",
    id: "NXP-2024-04",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZZPoex9-sMkTnU8TfnZG6Cm35eBzctmMznWkfjl9v76G6y9mjiJ988X3nzVjjpoWd_sBT1u0mbnH9cDaAkYQ6wn6iHWY8Im5UCWfhpYNC7vYYzB8fp-V0HbDEA4CsDuAu_rEc5I61TXKIxSE0myBWxH1vPi4Cg5A2RL5JbZ6qmiGo5q-8udzx-K1QNnTjlnfgHAA0RQ96guGA_PD_zb5MB1Uu1448AkCwDGMsjeidm5Y_KDxO9eXJBCmuJxjH49J7Bu131qn4MZdf",
    supply: "12,500,000",
    price: "$8.00",
    progress: 100,
    progressLabel: "Fully Funded",
    status: "Ready",
    statusColor: "text-tertiary",
    dotColor: "bg-tertiary",
    highlighted: true,
  },
  {
    name: "Azure Bay Resort",
    id: "AZR-2024-09",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4G9gEGHzll4pfCEcoeuB6XbKNB7ROL9mJMM0EZNhXTwOM3F9WfGSKDLlhpA4BxvWgy--QhCvHknG6Az8YNbSEpiN4gkUw2o-03OoiYOJwv6lhqxY_PTt7dmh-DjduWOmdKJlqlDA5Wh0-4Hl1pQ9hJOuj-iccBspNuTHNZPefikgepPJD-YikW39uaaeIA3vMXzoZA23j2mIwb0MHd_RhsW_k86emRnB-QL90YgryV1_uO-N-zvXUx_PRkgJhwPvAznXaK8aURqa1",
    supply: "3,000,000",
    price: "$25.00",
    progress: 45,
    progressLabel: "$33.7M",
    status: "Paused",
    statusColor: "text-on-surface-variant",
    dotColor: "bg-outline-variant",
    dimmed: true,
  },
];

const recentActivity = [
  { initials: "GS", color: "text-tertiary", name: "Goldman Sachs AMC", time: "3 min ago", amount: "$1.2M" },
  { initials: "BW", color: "text-secondary", name: "Blackwater Capital", time: "14 min ago", amount: "$850k" },
  { initials: "RE", color: "text-primary", name: "RealEstate Global", time: "42 min ago", amount: "$2.5M" },
];

const stats = [
  { label: "Total AUM in IPO", value: "$1.24B", change: "+12.4%", sub: "vs last month", icon: "analytics", changeColor: "text-tertiary" },
  { label: "Avg. Completion", value: "18.5 Days", change: "+2.1 Days", sub: "delay trends", icon: "timer", changeColor: "text-error" },
  { label: "KYC/AML Cleared", value: "99.2%", change: "Institutional", sub: "standards met", icon: "verified_user", changeColor: "text-tertiary" },
  { label: "Liquidity Pool", value: "$42.1M", change: "Current Reserve Balance", sub: "", icon: "account_balance_wallet", changeColor: "text-on-surface-variant" },
];

export function IpoContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            IPO Management
          </h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-widest text-on-surface-variant">
            Institutional Offering Control Center
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="flex items-center gap-2 rounded bg-surface-container-high px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest">
            <Icon name="history" className="text-primary" />
            View Logs
          </button>
          <button type="button" className="saffron-gradient flex items-center gap-2 rounded px-6 py-2.5 text-sm font-bold text-on-primary-fixed shadow-[0_0_20px_rgba(255,182,139,0.08)] transition-all hover:brightness-110">
            <Icon name="rocket_launch" filled className="text-primary" />
            Launch New IPO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="font-headline text-lg font-bold">Live & Pending IPOs</h2>
              <span className="rounded bg-primary-container/10 px-2 py-0.5 text-[10px] font-bold text-primary">4 ACTIVE</span>
            </div>
            <div className="flex gap-2 text-on-surface-variant">
              <Icon name="filter_list" className="cursor-pointer hover:text-on-surface" />
              <Icon name="sort" className="cursor-pointer hover:text-on-surface" />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-outline-variant/5 bg-surface-container">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container-low">
                  {["Property", "Token Supply", "Price (USD)", "Subscription", "Status", "Actions"].map((h, i) => (
                    <th key={h} scope="col" className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${i === 0 ? "px-6" : ""} ${i === 5 ? "px-6 text-right" : ""} ${i === 3 ? "w-48" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {ipos.map((ipo) => (
                  <tr key={ipo.id} className={`transition-colors hover:bg-surface-container-high ${ipo.highlighted ? "bg-surface-container-low/30" : ""} ${ipo.active ? "relative after:pointer-events-none after:absolute after:inset-0 after:border after:border-primary-container/20" : ""}`}>
                    <td className={`px-6 py-5 ${ipo.dimmed ? "opacity-60" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded bg-surface-container-highest">
                          <Image src={ipo.image} alt={ipo.name} width={40} height={40} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{ipo.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{ipo.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-5 font-mono text-xs ${ipo.dimmed ? "opacity-60" : ""}`}>{ipo.supply}</td>
                    <td className={`px-4 py-5 font-mono text-xs ${ipo.dimmed ? "opacity-60" : ""}`}>{ipo.price}</td>
                    <td className={`px-4 py-5 ${ipo.dimmed ? "opacity-60" : ""}`}>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span>{ipo.progress}%</span>
                          <span className="text-on-surface-variant">{ipo.progressLabel}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-lowest">
                          <div className={`h-full rounded-full ${ipo.progress === 100 ? "bg-tertiary" : ipo.dimmed ? "bg-outline-variant" : "bg-primary shadow-[0_0_8px_rgba(255,182,139,0.5)]"}`} style={{ width: `${ipo.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider ${ipo.statusColor}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${ipo.dotColor} ${ipo.status === "Subscription" ? "animate-pulse" : ""}`} />
                        {ipo.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button type="button" aria-label="More actions" className="rounded p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-highest">
                        <Icon name="more_vert" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low px-6 py-4">
              <p className="text-xs text-on-surface-variant">Showing 3 of 12 property IPOs</p>
              <div className="flex gap-1">
                <button type="button" aria-label="Previous page" className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant/20 hover:bg-surface-container-high"><Icon name="chevron_left" /></button>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-primary/20 bg-primary/10 text-xs font-bold text-primary">1</button>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant/20 text-xs font-bold hover:bg-surface-container-high">2</button>
                <button type="button" aria-label="Next page" className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant/20 hover:bg-surface-container-high"><Icon name="chevron_right" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <div className="relative overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container p-6">
            <span className="absolute right-3 top-3 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-tighter text-primary">INSPECTOR</span>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 overflow-hidden rounded">
                  <Image src={ipos[0].image} alt="Emerald Heights" width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-bold leading-none">Emerald Heights</h3>
                  <p className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant">
                    <Icon name="location_on" className="text-[14px]" />
                    San Francisco, CA
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-surface-container-low p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Funds Raised</p>
                  <p className="font-headline text-lg font-bold text-secondary">$51,250,000</p>
                </div>
                <div className="rounded bg-surface-container-low p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Investors</p>
                  <p className="font-headline text-lg font-bold text-tertiary">1,422</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Recent Activity</p>
                  <button type="button" className="text-[10px] font-bold text-primary hover:underline">Full List</button>
                </div>
                {recentActivity.map((a) => (
                  <div key={a.name} className="group flex items-center gap-3 rounded p-2 transition-colors hover:bg-surface-container-high">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest text-xs font-bold ${a.color}`}>{a.initials}</div>
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold">{a.name}</p>
                      <p className="text-[9px] text-on-surface-variant">{a.time}</p>
                    </div>
                    <p className="font-mono text-[11px] font-bold">{a.amount}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-outline-variant/10 pt-4">
                <button type="button" className="flex w-full items-center justify-center gap-2 rounded border border-outline-variant/20 bg-surface-container-highest py-3 text-xs font-bold transition-all hover:bg-surface-bright">
                  <Icon name="pause_circle" className="text-primary" />
                  Pause Subscription
                </button>
                <button type="button" disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded bg-tertiary py-3 text-xs font-bold text-on-tertiary opacity-50">
                  <Icon name="bolt" />
                  Trigger Go-Live
                </button>
                <p className="text-center text-[10px] italic text-on-surface-variant">Go-Live requires 100% subscription coverage</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-outline-variant/10 bg-surface-bright/40 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="trending_up" className="text-secondary" />
              <h4 className="font-headline text-sm font-bold">Market Intelligence</h4>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-on-surface-variant">
              High demand detected for <span className="font-semibold text-on-surface">Emerald Heights</span>. Institutional whitelist oversubscribed by 14%.
            </p>
            <div className="flex h-12 items-end gap-1 px-1">
              {[40, 60, 55, 80, 95, 100].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${i >= 3 ? (i === 5 ? "bg-primary" : i === 4 ? "bg-primary/60" : "bg-primary/40") : "bg-surface-container-highest"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded border border-outline-variant/5 bg-surface-container-low p-5">
            <div className="mb-2 flex items-start justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{s.label}</p>
              <Icon name={s.icon} className="text-primary" />
            </div>
            <p className="font-headline text-2xl font-bold tracking-tight">{s.value}</p>
            <p className={`mt-1 text-[10px] font-bold ${s.changeColor}`}>
              {s.change} {s.sub && <span className="ml-1 font-medium text-on-surface-variant">{s.sub}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
