import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import {
  PropertyAssetSelect,
  type TokenRegistryProperty
} from "@/components/tokens/components/property-asset-select";
import type { HolderRow } from "@/lib/mappers/portfolio";

type TokensContentProps = {
  properties: TokenRegistryProperty[];
  selectedPropertyId: string;
  onPropertySelect: (propertyId: string) => void;
  isPropertyLoading?: boolean;
  totalTokens: string;
  holderCount: string;
  largestPct: string;
  holders: HolderRow[];
  error?: string | null;
};

export function TokensContent({
  properties,
  selectedPropertyId,
  onPropertySelect,
  isPropertyLoading = false,
  totalTokens,
  holderCount,
  largestPct,
  holders,
  error = null
}: TokensContentProps) {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto bg-surface-dim p-8">
      <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary">
            <Icon name="verified_user" filled className="text-sm" />
            Compliance & Ownership
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">Token Holder Registry</h1>
          <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant">
            Official immutable ledger of property ownership and distribution. Manage regulatory reporting and view real-time shareholder fragmentation.
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="group flex items-center gap-2 bg-surface-container-high px-4 py-2.5 text-sm transition-all hover:bg-surface-container-highest">
            <Icon name="download" className="text-[18px] transition-colors group-hover:text-primary" />
            Export CSV
          </button>
          <button type="button" className="saffron-gradient flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-on-primary-fixed transition-all hover:opacity-90">
            <Icon name="article" className="text-[18px]" />
            Compliance Report
          </button>
        </div>
      </div>

      {error ? <ApiErrorBanner message={error} /> : null}

      <div className="grid grid-cols-12 gap-4">
        <PropertyAssetSelect
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          onSelect={onPropertySelect}
          isLoading={isPropertyLoading}
        />
        <div className="col-span-12 grid grid-cols-3 gap-4 lg:col-span-8">
          <div className="rounded border-l-2 border-primary bg-surface-container-lowest p-6">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-on-surface-variant">Total Tokens</p>
            <p className="font-headline text-3xl font-extrabold text-primary">{totalTokens}</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">100% Circulating Supply</p>
          </div>
          <div className="rounded border-l-2 border-secondary bg-surface-container-lowest p-6">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-on-surface-variant">Unique Holders</p>
            <p className="font-headline text-3xl font-extrabold text-secondary">{holderCount}</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">Registered holders</p>
          </div>
          <div className="rounded border-l-2 border-tertiary bg-surface-container-lowest p-6">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-on-surface-variant">Largest Wallet</p>
            <p className="font-headline text-3xl font-extrabold text-tertiary">{largestPct}</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">Share of total supply</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-surface-container-low">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
          <h2 className="font-headline font-bold">Holder Distribution Ledger</h2>
          <div className="flex gap-2">
            <button type="button" aria-label="Filter" className="p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"><Icon name="filter_list" className="text-[20px]" /></button>
            <button type="button" aria-label="Sort" className="p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"><Icon name="sort" className="text-[20px]" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-lowest">
                {["Rank", "Investor Wallet Address", "Verification Status", "Tokens Held", "Ownership %", "Action"].map((h, i) => (
                  <th key={h} scope="col" className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${i >= 3 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {holders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-on-surface-variant">
                    No holders returned for this property.
                  </td>
                </tr>
              ) : (
                holders.map((h) => (
                <tr key={h.rank} className={`group transition-colors hover:bg-surface-container-high ${h.highlighted ? "bg-surface-container-low" : ""}`}>
                  <td className="px-6 py-4 text-sm font-bold text-on-surface-variant/50">{h.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${h.gradient} opacity-80`} />
                      <div>
                        <span className="block font-mono text-sm tracking-tight">{h.wallet}</span>
                        <span className="text-[10px] text-on-surface-variant">{h.userName}</span>
                      </div>
                      <button type="button" aria-label="Copy address"><Icon name="content_copy" className="cursor-pointer text-xs text-on-surface-variant hover:text-primary" /></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${h.kycDot}`} />
                      <span className="text-xs font-semibold">{h.kyc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-headline text-sm font-bold">{h.tokens}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-headline text-sm font-bold">{h.pct}</span>
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-container-highest">
                        <div className={`h-full ${h.barColor}`} style={{ width: h.barWidth }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" aria-label="More actions" className="text-on-surface-variant transition-colors hover:text-primary"><Icon name="more_vert" /></button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low px-6 py-4">
          <p className="text-xs text-on-surface-variant">Showing {holders.length} holder entries</p>
          <div className="flex gap-1">
            <button type="button" aria-label="Previous" className="flex h-8 w-8 items-center justify-center bg-surface-container-highest text-on-surface-variant"><Icon name="chevron_left" className="text-sm" /></button>
            <button type="button" className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-bold text-on-primary-fixed">1</button>
            <button type="button" className="flex h-8 w-8 items-center justify-center bg-surface-container-high text-xs font-bold text-on-surface-variant hover:bg-surface-container-highest">2</button>
            <button type="button" className="flex h-8 w-8 items-center justify-center bg-surface-container-high text-xs font-bold text-on-surface-variant hover:bg-surface-container-highest">3</button>
            <button type="button" aria-label="Next" className="flex h-8 w-8 items-center justify-center bg-surface-container-highest text-on-surface-variant"><Icon name="chevron_right" className="text-sm" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-outline-variant/10 pt-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-headline text-sm font-bold">Registry Source</h3>
          <p className="text-sm text-on-surface-variant">
            Holder data is loaded from GET /admin/portfolio/properties and GET /admin/portfolio/properties/&#123;propertyId&#125;.
          </p>
        </div>
        <div className="flex gap-4 rounded-lg border-l-2 border-primary-container bg-surface-container p-4">
          <Icon name="info" className="text-primary-container" />
          <div>
            <p className="text-sm font-bold text-on-surface">Live backend data</p>
            <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
              No placeholder wallet addresses or compliance percentages are shown on this screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
