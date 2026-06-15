import { Icon } from "@/components/admin/icon";

const complaints = [
  { id: "#CMP-1042", user: "Marcus T.", subject: "Delayed IPO payout", category: "Finance", priority: "High", priorityClass: "border-error/20 bg-error/10 text-error", status: "Open", statusDot: "bg-error", date: "2h ago", highlighted: true },
  { id: "#CMP-1041", user: "Priya S.", subject: "KYC verification stuck", category: "Onboarding", priority: "Medium", priorityClass: "border-secondary/20 bg-secondary/10 text-secondary", status: "In Review", statusDot: "bg-secondary", date: "5h ago" },
  { id: "#CMP-1038", user: "James W.", subject: "Token transfer not reflected", category: "Trading", priority: "High", priorityClass: "border-error/20 bg-error/10 text-error", status: "Open", statusDot: "bg-error", date: "1d ago" },
  { id: "#CMP-1035", user: "Anika R.", subject: "Broker commission dispute", category: "Brokerage", priority: "Low", priorityClass: "border-tertiary/20 bg-tertiary/10 text-tertiary", status: "Resolved", statusDot: "bg-green-500", date: "2d ago", dimmed: true },
  { id: "#CMP-1032", user: "David K.", subject: "Property listing rejection appeal", category: "Properties", priority: "Medium", priorityClass: "border-secondary/20 bg-secondary/10 text-secondary", status: "In Review", statusDot: "bg-secondary", date: "3d ago" },
];

export function ComplaintsContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Support Operations</p>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Complaints</h1>
          <p className="mt-1 text-sm text-on-surface-variant">Track and resolve investor complaints and platform escalations.</p>
        </div>
        <button type="button" className="saffron-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Open Complaints", value: "12", sub: "Requires attention", color: "text-error" },
          { label: "In Review", value: "8", sub: "Assigned to agents", color: "text-secondary" },
          { label: "Resolved (30d)", value: "156", sub: "94% satisfaction rate", color: "text-tertiary" },
          { label: "Avg. Resolution", value: "18h", sub: "-4h vs last month", color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-high p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{s.label}</p>
            <p className={`mt-2 font-headline text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden bg-surface-container">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
          <h2 className="font-headline font-bold">Complaint Queue</h2>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary"><Icon name="filter_list" className="text-sm" /> Filter</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low">
                {["ID", "User", "Subject", "Category", "Priority", "Status", "Date", "Actions"].map((h, i) => (
                  <th key={h} scope="col" className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${i === 7 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {complaints.map((c) => (
                <tr key={c.id} className={`transition-colors hover:bg-surface-container-high ${c.highlighted ? "bg-error/5" : ""} ${c.dimmed ? "opacity-70" : ""}`}>
                  <td className="px-6 py-4 font-mono text-xs text-primary">{c.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{c.user}</td>
                  <td className="px-6 py-4 text-sm">{c.subject}</td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{c.category}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${c.priorityClass}`}>{c.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className={`h-1.5 w-1.5 rounded-full ${c.statusDot}`} />
                      {c.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{c.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" aria-label="View complaint" className="text-on-surface-variant hover:text-primary"><Icon name="arrow_forward" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
