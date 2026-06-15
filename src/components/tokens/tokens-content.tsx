import Image from "next/image";
import { Icon } from "@/components/admin/icon";

const holders = [
  { rank: "#01", wallet: "0x71C...4e2A", gradient: "from-primary to-secondary", kyc: "KYC Level 3", kycDot: "bg-green-500", tokens: "124,000.00", pct: "12.40%", barColor: "bg-primary", barWidth: "12.4%" },
  { rank: "#02", wallet: "0x3F1...889c", gradient: "from-tertiary to-blue-500", kyc: "KYC Level 3", kycDot: "bg-green-500", tokens: "82,500.42", pct: "8.25%", barColor: "bg-secondary", barWidth: "8.25%", highlighted: true },
  { rank: "#03", wallet: "0x9aE...211F", gradient: "from-on-surface-variant to-background", kyc: "AML Pending", kycDot: "bg-yellow-500", tokens: "45,000.00", pct: "4.50%", barColor: "bg-tertiary", barWidth: "4.5%" },
  { rank: "#04", wallet: "0x221...dE31", gradient: "from-error to-inverse-primary", kyc: "KYC Level 1", kycDot: "bg-green-500", tokens: "21,440.00", pct: "2.14%", barColor: "bg-primary", barWidth: "2.14%", highlighted: true },
  { rank: "#05", wallet: "0x6CC...5fA9", gradient: "from-primary-fixed to-on-primary", kyc: "KYC Level 2", kycDot: "bg-green-500", tokens: "19,800.12", pct: "1.98%", barColor: "bg-secondary", barWidth: "1.98%" },
];

export function TokensContent() {
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

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex cursor-pointer flex-col justify-between rounded bg-surface-container p-6 transition-all hover:bg-surface-container-high lg:col-span-4">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Select Active Asset</label>
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded bg-surface-container-lowest">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyIbgvDehq34sXhs9CG17yo9kFZAOtbKbPzF-A_9pAShqIE90qStI1WiiREKGODZMH-W1oXDLYx_BVMTStuq5YvvzkfqKngDVTQyNGhhlc7-5Zuh9uBDN3THGhmxnwCGoDRTATJwg-k5-Z31Rg6O2BMFHHHa6_YCSjz9wE0Sqgm9RDO9n1yR34r64z95kBkOTrNHfcGkN5rpTHGTUPRFYejh3RaNXRFDlFSPuwMFaONh5F5kHIMCcaUk8_6VufBPyF9t_z2ucWWu1F" alt="Emerald Gardens" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-headline text-lg font-bold">Emerald Gardens Residence</p>
                  <p className="text-xs text-on-surface-variant">EG-RES-2024 • RWA-102</p>
                </div>
              </div>
              <Icon name="expand_more" className="text-on-surface-variant" />
            </div>
          </div>
          <div className="mt-8 flex gap-4 text-xs">
            <div className="rounded bg-tertiary/10 px-2 py-1 font-bold uppercase tracking-tighter text-tertiary">Verified</div>
            <div className="rounded bg-secondary/10 px-2 py-1 font-bold uppercase tracking-tighter text-secondary">Fully Minted</div>
          </div>
        </div>
        <div className="col-span-12 grid grid-cols-3 gap-4 lg:col-span-8">
          <div className="rounded border-l-2 border-primary bg-surface-container-lowest p-6">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-on-surface-variant">Total Tokens</p>
            <p className="font-headline text-3xl font-extrabold text-primary">1,000,000</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">100% Circulating Supply</p>
          </div>
          <div className="rounded border-l-2 border-secondary bg-surface-container-lowest p-6">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-on-surface-variant">Unique Holders</p>
            <p className="font-headline text-3xl font-extrabold text-secondary">4,812</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">+12 in last 24h</p>
          </div>
          <div className="rounded border-l-2 border-tertiary bg-surface-container-lowest p-6">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-on-surface-variant">Largest Wallet</p>
            <p className="font-headline text-3xl font-extrabold text-tertiary">12.4%</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">Institutional Custodian</p>
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
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-lowest">
                {["Rank", "Investor Wallet Address", "Verification Status", "Tokens Held", "Ownership %", "Action"].map((h, i) => (
                  <th key={h} scope="col" className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${i >= 3 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {holders.map((h) => (
                <tr key={h.rank} className={`group transition-colors hover:bg-surface-container-high ${h.highlighted ? "bg-surface-container-low" : ""}`}>
                  <td className="px-6 py-4 text-sm font-bold text-on-surface-variant/50">{h.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${h.gradient} opacity-80`} />
                      <span className="font-mono text-sm tracking-tight">{h.wallet}</span>
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
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low px-6 py-4">
          <p className="text-xs text-on-surface-variant">Showing 1 to 10 of 4,812 entries</p>
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
          <h3 className="font-headline text-sm font-bold">Compliance Summary</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">KYC Verified Entities</span>
                <span className="font-bold">98.2%</span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-surface-container-highest">
                <div className="h-full bg-green-500/60" style={{ width: "98.2%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">AML Flagged Wallets</span>
                <span className="font-bold text-error">0.05%</span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-surface-container-highest">
                <div className="h-full bg-error" style={{ width: "1%" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg border-l-2 border-primary-container bg-surface-container p-4">
          <Icon name="info" className="text-primary-container" />
          <div>
            <p className="text-sm font-bold text-on-surface">Blockchain Synchronization</p>
            <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
              The registry is synced with Polygon Block 158,421,902. Last reconciliation was completed 4 minutes ago. All token balances are confirmed on-chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
