import Image from "next/image";
import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import type { IpoRow } from "@/lib/mappers/ipo";

const placeholderImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu1lg4swJwDIAlT-bJscsUntDuZgsX4bx-xwlAP87m1nYpEiXjOlk3SHwdhtfG71K9s8zDXsE-6oi4LmiJt6wwRIMJZjYP-f5ZjAEOALLKA4ysoWI3HVbBgguLrkJc86iZ3Utaw7Gj0qRtNpbNWgqWA44_Yl_SviHd2Bngw1W7cALociJLNDYPUyE365lIc5YLUHxqXXIcJWktcTmStfDcTbMjeDh47Nz6qu7Zt_vyfNJ3EzY-_e2x-yvALF6RSk1qTp54fHjYFm8J";

type IpoContentProps = {
  ipos: IpoRow[];
  error?: string | null;
};

export function IpoContent({ ipos, error = null }: IpoContentProps) {
  const stats = [
    { label: "Listed IPOs", value: String(ipos.length), change: "Live", sub: "GET /ipos", icon: "analytics", changeColor: "text-tertiary" },
    { label: "Open", value: String(ipos.filter((ipo) => ipo.status === "Open").length), change: "CREATED", sub: "status filter", icon: "timer", changeColor: "text-secondary" },
    { label: "Paused", value: String(ipos.filter((ipo) => ipo.status === "Paused").length), change: "PAUSED", sub: "status filter", icon: "verified_user", changeColor: "text-on-surface-variant" },
    { label: "Minted", value: String(ipos.filter((ipo) => ipo.status === "Minted").length), change: "MINTED", sub: "status filter", icon: "account_balance_wallet", changeColor: "text-tertiary" },
  ];

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

      {error ? <ApiErrorBanner message={error} /> : null}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="font-headline text-lg font-bold">Live & Pending IPOs</h2>
              <span className="rounded bg-primary-container/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {ipos.length} LISTED
              </span>
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
                {ipos.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-on-surface-variant"
                    >
                      No IPOs returned from the backend yet.
                    </td>
                  </tr>
                ) : (
                  ipos.map((ipo) => (
                  <tr key={ipo.id} className={`transition-colors hover:bg-surface-container-high ${ipo.highlighted ? "bg-surface-container-low/30" : ""} ${ipo.active ? "relative after:pointer-events-none after:absolute after:inset-0 after:border after:border-primary-container/20" : ""}`}>
                    <td className={`px-6 py-5 ${ipo.dimmed ? "opacity-60" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded bg-surface-container-highest">
                          <Image src={placeholderImage} alt={ipo.name} width={40} height={40} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{ipo.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{ipo.id}</p>
                          <p className="text-[10px] text-on-surface-variant/80">{ipo.location}</p>
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
                  ))
                )}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low px-6 py-4">
              <p className="text-xs text-on-surface-variant">
                Showing {ipos.length} IPO{ipos.length === 1 ? "" : "s"} from the backend
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <div className="relative overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container p-6">
            <span className="absolute right-3 top-3 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-tighter text-primary">INSPECTOR</span>
            <div className="space-y-6">
              {ipos[0] ? (
                <>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 overflow-hidden rounded">
                  <Image src={placeholderImage} alt={ipos[0].name} width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-bold leading-none">{ipos[0].name}</h3>
                  <p className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant">
                    <Icon name="location_on" className="text-[14px]" />
                    {ipos[0].location}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-surface-container-low p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Token Supply</p>
                  <p className="font-headline text-lg font-bold text-secondary">{ipos[0].supply}</p>
                </div>
                <div className="rounded bg-surface-container-low p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Token Price</p>
                  <p className="font-headline text-lg font-bold text-tertiary">{ipos[0].price}</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Recent Activity</p>
                <p className="text-xs text-on-surface-variant">
                  IPO subscription activity is not exposed by the current API.
                </p>
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
                </>
              ) : (
                <p className="text-sm text-on-surface-variant">
                  Select an IPO from the list to inspect details.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-outline-variant/10 bg-surface-bright/40 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="trending_up" className="text-secondary" />
              <h4 className="font-headline text-sm font-bold">Market Intelligence</h4>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-on-surface-variant">
              IPO demand insights are not available from the current Swagger API.
            </p>
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
