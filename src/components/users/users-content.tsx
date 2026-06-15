import { Icon } from "@/components/admin/icon";

const users = [
  { id: "#USR-89021", initials: "AM", name: "Alexander Mercer", location: "London, UK", kyc: "VERIFIED", kycClass: "border-tertiary/20 bg-tertiary/10 text-tertiary", portfolio: "$1,240,000.00", referral: "Standard", actions: "default" },
  { id: "#USR-91288", initials: "ER", name: "Elena Rodriguez", location: "Madrid, ES", kyc: "PENDING", kycClass: "border-primary/30 bg-primary-container/20 text-primary", portfolio: "$0.00", referral: "Broker-Invited", actions: "pending", highlighted: true },
  { id: "#USR-77211", initials: "CH", name: "Chen Hua", location: "Singapore, SG", kyc: "VERIFIED", kycClass: "border-tertiary/20 bg-tertiary/10 text-tertiary", portfolio: "$542,800.00", referral: "VIP Tier 1", actions: "default" },
  { id: "#USR-22104", initials: "JJ", name: "Jacob Jensen", location: "Oslo, NO", kyc: "SUSPENDED", kycClass: "border-error/30 bg-error-container/20 text-error", portfolio: "$12,000.00", referral: "None", actions: "suspended", dimmed: true },
];

export function UsersContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Access Management</h1>
          <p className="mt-1 text-sm text-on-surface-variant">Registry of verified participants and institutional brokers.</p>
        </div>
        <div className="flex gap-1 rounded-sm bg-surface-container-low p-1.5">
          <button type="button" className="bg-surface-container-high px-6 py-2 text-sm font-semibold text-primary shadow-sm">Users</button>
          <button type="button" className="px-6 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface">Brokers</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="col-span-1 flex h-40 flex-col justify-between bg-surface-container-high p-6 md:col-span-2">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Total Active Users</span>
            <Icon name="trending_up" className="text-[20px] text-primary" />
          </div>
          <div>
            <div className="font-headline text-4xl font-extrabold text-primary">12,842</div>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-on-surface-variant/70">
              <span className="font-bold text-tertiary">+14%</span> vs previous quarter
            </p>
          </div>
        </div>
        <div className="flex h-40 flex-col justify-between bg-surface-container-low p-6">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Pending KYC</span>
          <div>
            <div className="font-headline text-4xl font-extrabold">24</div>
            <p className="mt-1 text-[11px] text-on-surface-variant/70">Requires urgent review</p>
          </div>
        </div>
        <div className="flex h-40 flex-col justify-between bg-surface-container-low p-6">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Active Brokers</span>
          <div>
            <div className="font-headline text-4xl font-extrabold">156</div>
            <p className="mt-1 text-[11px] text-on-surface-variant/70">Global coverage across 12 zones</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-surface-container-low">
        <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-lowest px-8 py-5">
          <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">User Registry</h2>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-2 border border-outline-variant/20 bg-surface-container-highest px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-bright">
              <Icon name="filter_list" className="text-xs" /> Filter
            </button>
            <button type="button" className="flex items-center gap-2 border border-outline-variant/20 bg-surface-container-highest px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-bright">
              <Icon name="download" className="text-xs" /> Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-lowest/50">
                {[
                  { h: "User ID", align: "" },
                  { h: "Name", align: "" },
                  { h: "KYC Status", align: "text-center" },
                  { h: "Portfolio Value", align: "text-right" },
                  { h: "Referral", align: "" },
                  { h: "Actions", align: "text-right" },
                ].map((col) => (
                  <th key={col.h} scope="col" className={`px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${col.align}`}>{col.h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {users.map((u) => (
                <tr key={u.id} className={`group transition-colors hover:bg-surface-container ${u.highlighted ? "bg-primary/5 hover:bg-primary/10" : ""} ${u.dimmed ? "bg-error/5 opacity-80 hover:bg-error/10" : ""}`}>
                  <td className="px-8 py-4 font-mono text-xs text-on-surface-variant">{u.id}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center bg-surface-container-highest text-xs font-bold text-primary">{u.initials}</div>
                      <div>
                        <p className={`text-sm font-bold ${u.dimmed ? "text-on-surface/50 line-through" : ""}`}>{u.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{u.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold ${u.kycClass}`}>{u.kyc}</span>
                  </td>
                  <td className={`px-8 py-4 text-right text-sm font-semibold text-secondary ${u.dimmed ? "text-secondary/50" : ""}`}>{u.portfolio}</td>
                  <td className="px-8 py-4 text-sm text-on-surface-variant">{u.referral}</td>
                  <td className="px-8 py-4 text-right">
                    {u.actions === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button type="button" className="saffron-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary-fixed">Approve</button>
                        <button type="button" className="bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface">Reject</button>
                      </div>
                    ) : u.actions === "suspended" ? (
                      <button type="button" className="bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface">Reinstate</button>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button type="button" aria-label="Suspend account" className="flex h-8 w-8 items-center justify-center bg-error-container/20 text-error transition-colors hover:bg-error-container">
                          <Icon name="block" className="text-[18px]" />
                        </button>
                        <button type="button" aria-label="More actions" className="flex h-8 w-8 items-center justify-center bg-surface-container-highest text-on-surface-variant transition-colors hover:text-on-surface">
                          <Icon name="more_vert" className="text-[18px]" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-lowest/30 px-8 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Showing 1-10 of 12,842 results</p>
          <div className="flex gap-1">
            <button type="button" aria-label="Previous" className="flex h-8 w-8 items-center justify-center border border-outline-variant/10 bg-surface-container text-on-surface-variant"><Icon name="chevron_left" className="text-sm" /></button>
            <button type="button" className="flex h-8 w-8 items-center justify-center border border-primary/20 bg-surface-container-high text-xs font-bold text-primary">1</button>
            <button type="button" className="flex h-8 w-8 items-center justify-center border border-outline-variant/10 bg-surface-container text-xs font-bold text-on-surface-variant transition-colors hover:text-on-surface">2</button>
            <button type="button" className="flex h-8 w-8 items-center justify-center border border-outline-variant/10 bg-surface-container text-xs font-bold text-on-surface-variant transition-colors hover:text-on-surface">3</button>
            <button type="button" aria-label="Next" className="flex h-8 w-8 items-center justify-center border border-outline-variant/10 bg-surface-container text-on-surface-variant"><Icon name="chevron_right" className="text-sm" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4 bg-surface-container-low p-5">
          <div className="flex items-center gap-2">
            <Icon name="history" className="text-[18px] text-primary" />
            <h3 className="font-headline text-xs font-bold uppercase tracking-widest">System Audit Log</h3>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 border-b border-outline-variant/5 pb-3">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-tertiary" />
              <div>
                <p className="text-[11px] font-semibold text-on-surface">Broker &quot;Alpha Assets&quot; approved KYC for 5 users</p>
                <p className="text-[9px] text-on-surface-variant">2 minutes ago • System</p>
              </div>
            </div>
            <div className="flex gap-3 border-b border-outline-variant/5 pb-3">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-error" />
              <div>
                <p className="text-[11px] font-semibold text-on-surface">Compliance flagged User #USR-22104</p>
                <p className="text-[9px] text-on-surface-variant">1 hour ago • Auto-Guard</p>
              </div>
            </div>
          </div>
          <button type="button" className="w-full bg-surface-container-highest py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-on-surface">View All Activities</button>
        </div>
        <div className="flex items-center justify-between border-l-2 border-primary/30 bg-primary/5 p-6 md:col-span-2">
          <div>
            <h3 className="font-headline text-lg font-bold">Broker Applications Pending</h3>
            <p className="mt-1 max-w-md text-sm text-on-surface-variant">There are 7 new Institutional Broker applications waiting for legal clearance and platform onboarding.</p>
          </div>
          <button type="button" className="saffron-gradient px-8 py-3 text-xs font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20">Process Applications</button>
        </div>
      </div>
    </div>
  );
}
