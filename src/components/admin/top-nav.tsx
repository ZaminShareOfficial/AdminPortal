import { Icon } from "@/components/admin/icon";

export function TopNav() {
  return (
    <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-outline-variant/10 bg-surface px-8">
      <div className="flex max-w-xl flex-1 items-center">
        <div className="relative w-full">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
          />
          <input
            aria-label="Search assets, users, or transactions"
            className="w-full rounded border-none bg-surface-container-lowest px-10 py-2 text-sm focus:ring-1 focus:ring-primary"
            placeholder="Search assets, users, or transactions..."
            type="search"
          />
        </div>
      </div>

      <div className="ml-8 flex items-center gap-6">
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Admin Portal
        </h2>
        <div className="mx-2 h-8 w-px bg-outline-variant/20" />
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="notifications" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-surface bg-primary" />
          </button>
          <button
            type="button"
            aria-label="Help"
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="help" />
          </button>
        </div>
      </div>
    </header>
  );
}
