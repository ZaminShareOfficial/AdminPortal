import Image from "next/image";
import { Icon } from "@/components/admin/icon";

const payouts = [
  { initials: "AM", color: "text-secondary", name: "Aravind Mehta", id: "BRK-9021", period: "Oct 01 - Oct 31, 2023", volume: "$2,450,000", commission: "$36,750.00", status: "PENDING", action: "arrow_forward" },
  { initials: "SJ", color: "text-tertiary", name: "Sarah Johnson", id: "BRK-4412", period: "Oct 01 - Oct 31, 2023", volume: "$1,120,500", commission: "$16,807.50", status: "PENDING", action: "arrow_forward", highlighted: true },
  { initials: "RK", color: "text-primary", name: "Rajesh Kumar", id: "BRK-7718", period: "Sep 01 - Sep 30, 2023", volume: "$980,000", commission: "$14,700.00", status: "PROCESSED", action: "receipt_long", commissionMuted: true },
  { initials: "EW", color: "text-on-surface-variant", name: "Elena Wright", id: "BRK-2309", period: "Sep 01 - Sep 30, 2023", volume: "$5,600,000", commission: "$84,000.00", status: "PROCESSED", action: "receipt_long", commissionMuted: true, highlighted: true },
];

export function FinanceContent() {
  return (
    <div className="hide-scrollbar flex-1 overflow-y-auto p-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">Financial Operations</p>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Revenue Analytics</h1>
        </div>
        <button type="button" className="saffron-gradient flex items-center gap-2 rounded px-6 py-2.5 text-sm font-bold text-on-primary-fixed shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Icon name="account_balance_wallet" filled />
          Process Broker Payout
        </button>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="group relative col-span-12 overflow-hidden rounded bg-surface-container-high p-6 lg:col-span-4">
          <div className="relative z-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-on-surface-variant">Total Platform Revenue (YTD)</p>
            <h2 className="mb-2 font-headline text-4xl font-bold text-primary">$4,285,910.00</h2>
            <div className="flex items-center gap-2 text-tertiary">
              <Icon name="trending_up" className="text-sm" />
              <span className="text-xs font-semibold">+12.4% vs last quarter</span>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
        </div>
        <div className="col-span-12 rounded bg-surface-container-high p-6 lg:col-span-4">
          <div className="mb-4 flex items-start justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Net Platform Fees</p>
            <Icon name="payments" className="text-on-surface-variant" />
          </div>
          <h2 className="mb-2 font-headline text-3xl font-bold text-on-surface">$842,120.50</h2>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <div className="h-full bg-secondary" style={{ width: "68%" }} />
          </div>
          <p className="mt-2 text-[10px] text-on-surface-variant">68% of targeted annual commission revenue</p>
        </div>
        <div className="col-span-12 rounded border-l-4 border-secondary bg-surface-container-high p-6 lg:col-span-4">
          <div className="mb-4 flex items-start justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Pending Broker Commissions</p>
            <Icon name="pending_actions" className="text-secondary" />
          </div>
          <h2 className="mb-2 font-headline text-3xl font-bold text-on-surface">$128,450.00</h2>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDasMtImxm25wqHpJpfPUslWETrvz4KgM1FMbAcYwSMM1xVILI_ZbxJrS-OAtNKNi1ohStLFQC4MFOtM4obdewcAJ9Syz93BXb7M2eWuGq9EwkWWXGO526iMK5nXe_7Wp5XLhATLW6EKBdI8_c-_Kh0yG_498NGXFAO_KcGeNbVekQGiLsIiTMJE4Z_pReuC-IAk9AJV9QJvz0kX5Qebu8TAWyt2tluE8315_ghaotaaUq1fkgtMroPm4-8xgdJ5EO4pzg6j9vL4xa7",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAP8Pp8JV9WS7tWP3YhdxSt7P87-eLBmCmAnp2oyPmYZql5CLYx9bECg9u_hgq8HOJpb4NOpNkUkKu9r5COYJzci-rbUtUJqC9qh5RpWZNBkLVTyT49G8sVKCxQxIBO7ECnYktel6eB8OeKqJlzfepCE91WK41dSYlv0mn3CJ6a0Ro1ONxNXQLvxaWH2Ajtj_RHtiFevTEVKEBz8zhAK-HHVw87jylmzyIVF3j7PlvUnXSZi1Gv4ooFm-Xv4gjYCv9-M2IQKYWkVJrm",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCVEFYdtJeq_Gs9AtDAjIwp_IFtt341qwvKrIQIR-D6VKoOXAP7ANQ5JHrZylZmi4VXHSnGi_idxLrSoNk8wO4S045JNHf_HCVoDgm_CQOzikPvE-WQDPOfM0LoMm4m6NCeWs66EElYp7ARRDnVq7pIeULkwLN4LAQmiktLthjFP1lwe0g2j45I89vkzh63vH81PZClGWJWNi8A13t_3m30CG28WNsZ6gmpNrIWGtw0kyqMIMl1I8nyX2w4Ap0Y9yRF9ZrmRly8qVJd",
              ].map((src, i) => (
                <Image key={i} src={src} alt="" width={24} height={24} className="h-6 w-6 rounded-full border-2 border-surface-container-high bg-surface-container" />
              ))}
            </div>
            <span className="text-[10px] text-on-surface-variant">Payable to 24 active brokers</span>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded bg-surface-container p-6 lg:col-span-8">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-headline font-bold text-on-surface">Broker Payout Distribution</h3>
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Current Cycle</div>
          </div>
          <div className="flex flex-col items-center justify-around gap-8 py-4 md:flex-row">
            <div className="pie-chart flex items-center justify-center">
              <div className="relative z-10 text-center">
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">Total</p>
                <p className="text-lg font-bold text-primary">$128k</p>
              </div>
            </div>
            <div className="max-w-xs flex-1 space-y-6">
              <div className="rounded border-l-4 border-primary-container bg-surface-container-low p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">Super Broker</span>
                  <span className="text-xs font-bold text-primary">65%</span>
                </div>
                <p className="text-[10px] leading-tight text-on-surface-variant">Tier 1 institutional partners with high volume throughput.</p>
                <p className="mt-2 text-sm font-bold text-on-surface">$83,492.50</p>
              </div>
              <div className="rounded border-l-4 border-surface-variant bg-surface-container-low p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">Direct Broker</span>
                  <span className="text-xs font-bold text-on-surface-variant">35%</span>
                </div>
                <p className="text-[10px] leading-tight text-on-surface-variant">Individual brokers and referral network participants.</p>
                <p className="mt-2 text-sm font-bold text-on-surface">$44,957.50</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 flex flex-col justify-between rounded bg-surface-container p-6 lg:col-span-4">
          <h3 className="mb-6 font-headline font-bold text-on-surface">Commission Distribution</h3>
          <div className="space-y-6">
            {[
              { label: "Secondary Market", pct: "54%", color: "bg-primary" },
              { label: "Direct Referrals", pct: "32%", color: "bg-secondary" },
              { label: "Platform Bonus", pct: "14%", color: "bg-tertiary" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-on-surface">{item.label}</span>
                </div>
                <span className="text-xs font-bold">{item.pct}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-outline-variant/10 pt-6">
            <p className="text-[10px] italic leading-relaxed text-on-surface-variant">Broker commission tiers are recalculated every 30 days based on secondary trading volume.</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded bg-surface-container">
        <div className="flex items-center justify-between border-b border-outline-variant/5 px-6 py-5">
          <h3 className="font-headline font-bold text-on-surface">Broker Payout Records & Pending</h3>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"><Icon name="filter_list" className="text-sm" /> Filter</button>
            <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"><Icon name="download" className="text-sm" /> Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low">
                {["Broker Name", "Transaction Period", "Volume Generated", "Commission", "Status", "Actions"].map((h, i) => (
                  <th key={h} scope="col" className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${i >= 2 ? "text-right" : ""} ${i === 4 ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {payouts.map((p) => (
                <tr key={p.id} className={`group transition-colors hover:bg-surface-container-high ${p.highlighted ? "bg-surface-container-low/30" : ""}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest text-xs font-bold ${p.color}`}>{p.initials}</div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{p.name}</p>
                        <p className="text-[10px] text-on-surface-variant">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{p.period}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-on-surface">{p.volume}</td>
                  <td className={`px-6 py-4 text-right text-sm font-bold ${p.commissionMuted ? "text-on-surface-variant" : "text-primary"}`}>{p.commission}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${p.status === "PENDING" ? "border-secondary/20 bg-secondary/10 text-secondary" : "border-green-500/20 bg-green-500/10 text-green-500"}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" aria-label="View details" className="text-on-surface-variant transition-colors hover:text-primary">
                      <Icon name={p.action} className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/5 bg-surface-container-lowest/30 px-6 py-4">
          <span className="text-[10px] font-medium text-on-surface-variant">Showing 4 of 24 brokers</span>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <button type="button" aria-label="Previous page" disabled className="opacity-30"><Icon name="chevron_left" className="text-lg" /></button>
            <span className="text-[10px] font-bold text-on-surface">Page 1 of 6</span>
            <button type="button" aria-label="Next page"><Icon name="chevron_right" className="text-lg" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
