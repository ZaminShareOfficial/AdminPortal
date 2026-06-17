import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import type { FinanceInvestorRow } from "@/lib/mappers/portfolio";

type FinanceContentProps = {
  totalInvested: string;
  totalCurrent: string;
  netGain: string;
  investorCount: number;
  payouts: FinanceInvestorRow[];
  error?: string | null;
};

export function FinanceContent({
  totalInvested,
  totalCurrent,
  netGain,
  investorCount,
  payouts,
  error = null,
}: FinanceContentProps) {
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

      {error ? <ApiErrorBanner message={error} /> : null}

      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="group relative col-span-12 overflow-hidden rounded bg-surface-container-high p-6 lg:col-span-4">
          <div className="relative z-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-on-surface-variant">Total Invested (Live)</p>
            <h2 className="mb-2 font-headline text-4xl font-bold text-primary">{totalInvested}</h2>
            <div className="flex items-center gap-2 text-tertiary">
              <Icon name="trending_up" className="text-sm" />
              <span className="text-xs font-semibold">From GET /portfolio</span>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
        </div>
        <div className="col-span-12 rounded bg-surface-container-high p-6 lg:col-span-4">
          <div className="mb-4 flex items-start justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Current Portfolio Value</p>
            <Icon name="payments" className="text-on-surface-variant" />
          </div>
          <h2 className="mb-2 font-headline text-3xl font-bold text-on-surface">{totalCurrent}</h2>
          <p className="mt-4 text-[10px] text-on-surface-variant">
            Aggregated current value across all investor portfolios
          </p>
        </div>
        <div className="col-span-12 rounded border-l-4 border-secondary bg-surface-container-high p-6 lg:col-span-4">
          <div className="mb-4 flex items-start justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Net Gain / Loss</p>
            <Icon name="pending_actions" className="text-secondary" />
          </div>
          <h2 className="mb-2 font-headline text-3xl font-bold text-on-surface">{netGain}</h2>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] text-on-surface-variant">Across {investorCount} investor portfolios</span>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded bg-surface-container p-6 lg:col-span-12">
          <h3 className="font-headline font-bold text-on-surface">Portfolio Breakdown</h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            Broker payout distribution is not available in the current Swagger API. Investor performance is shown in the table below from GET /portfolio.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded bg-surface-container">
        <div className="flex items-center justify-between border-b border-outline-variant/5 px-6 py-5">
          <h3 className="font-headline font-bold text-on-surface">Investor Portfolio Performance</h3>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"><Icon name="filter_list" className="text-sm" /> Filter</button>
            <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"><Icon name="download" className="text-sm" /> Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low">
                {["Investor", "Holdings", "Invested", "Gain / Loss", "Status", "Actions"].map((h, i) => (
                  <th key={h} scope="col" className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${i >= 2 ? "text-right" : ""} ${i === 4 ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {payouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-on-surface-variant">
                    No portfolio data returned from GET /portfolio.
                  </td>
                </tr>
              ) : (
                payouts.map((p) => (
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
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${p.status === "PENDING" ? "border-secondary/20 bg-secondary/10 text-secondary" : "border-success/20 bg-success/10 text-success"}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" aria-label="View details" className="text-on-surface-variant transition-colors hover:text-primary">
                      <Icon name={p.action} className="text-lg" />
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/5 bg-surface-container-lowest/30 px-6 py-4">
          <span className="text-[10px] font-medium text-on-surface-variant">Showing {payouts.length} of {investorCount} investors</span>
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
