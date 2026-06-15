import { Icon } from "@/components/admin/icon";

const sections = [
  {
    title: "Platform",
    items: [
      { label: "Platform Name", value: "ZaminShare Admin Portal" },
      { label: "Default Currency", value: "USD" },
      { label: "Timezone", value: "UTC+5:30 (IST)" },
    ],
  },
  {
    title: "Security",
    items: [
      { label: "Two-Factor Authentication", value: "Enabled", badge: "bg-tertiary/10 text-tertiary" },
      { label: "Session Timeout", value: "30 minutes" },
      { label: "IP Allowlist", value: "12 addresses configured" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "IPO Alerts", value: "Email + In-app" },
      { label: "Compliance Alerts", value: "Email only" },
      { label: "Broker Payout Reminders", value: "Weekly digest" },
    ],
  },
];

export function SettingsContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Configuration</p>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface">Settings</h1>
        <p className="mt-1 text-sm text-on-surface-variant">Configure platform policies, notifications, and admin preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="bg-surface-container p-6">
            <h2 className="mb-6 font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-sm text-on-surface-variant">{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.badge ? (
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${item.badge}`}>{item.value}</span>
                    ) : (
                      <span className="text-sm font-semibold text-on-surface">{item.value}</span>
                    )}
                    <button type="button" aria-label={`Edit ${item.label}`} className="text-on-surface-variant hover:text-primary">
                      <Icon name="edit" className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-surface-container p-6 lg:col-span-2">
          <h2 className="mb-6 font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">API & Integrations</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { name: "Blockchain RPC", status: "Connected", icon: "link", ok: true },
              { name: "KYC Provider", status: "Connected", icon: "verified_user", ok: true },
              { name: "Payment Gateway", status: "Pending Setup", icon: "payments", ok: false },
            ].map((api) => (
              <div key={api.name} className="flex items-center gap-4 rounded border border-outline-variant/10 bg-surface-container-low p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded ${api.ok ? "bg-tertiary/10 text-tertiary" : "bg-secondary/10 text-secondary"}`}>
                  <Icon name={api.icon} />
                </div>
                <div>
                  <p className="text-sm font-bold">{api.name}</p>
                  <p className={`text-[10px] font-bold uppercase ${api.ok ? "text-tertiary" : "text-secondary"}`}>{api.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-outline-variant/10 pt-6">
        <button type="button" className="border border-outline-variant px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high">Discard Changes</button>
        <button type="button" className="saffron-gradient px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20">Save Settings</button>
      </div>
    </div>
  );
}
