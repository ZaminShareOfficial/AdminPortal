const navItems = [
  { label: "Dashboard", active: true },
  { label: "Users", active: false },
  { label: "Listings", active: false },
  { label: "Transactions", active: false },
  { label: "Reports", active: false },
  { label: "Settings", active: false },
];

const stats = [
  { label: "Total Users", value: "—", change: "Connect data source" },
  { label: "Active Listings", value: "—", change: "Connect data source" },
  { label: "Pending Approvals", value: "—", change: "Connect data source" },
  { label: "Monthly Revenue", value: "—", change: "Connect data source" },
];

const quickActions = [
  "Review pending listings",
  "Manage user accounts",
  "View platform analytics",
  "Update site settings",
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-white">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            ZaminShare
          </p>
          <h1 className="mt-2 text-xl font-semibold">Admin Portal</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-4 text-sm text-white/60">
          Signed in as Admin
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="border-b border-border bg-card px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
              <p className="mt-1 text-sm text-muted">
                Overview of your ZaminShare platform
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              New Listing
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-8 px-8 py-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-muted">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-muted">{stat.change}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Platform Activity
              </h3>
              <p className="mt-2 text-sm text-muted">
                Analytics and recent activity will appear here once your backend
                is connected.
              </p>
              <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-border bg-background text-sm text-muted">
                Chart placeholder
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
              <ul className="mt-4 space-y-3">
                {quickActions.map((action) => (
                  <li key={action}>
                    <button
                      type="button"
                      className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-emerald-50"
                    >
                      {action}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
