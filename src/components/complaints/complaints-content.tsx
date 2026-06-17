import { Icon } from "@/components/admin/icon";

export function ComplaintsContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
          Support Operations
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface">
          Complaints
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Phase 6 — no complaints endpoint exists in the current Swagger API.
        </p>
      </div>

      <div className="overflow-hidden bg-surface-container-low p-12 text-center">
        <Icon name="report" className="mx-auto mb-4 text-4xl text-on-surface-variant" />
        <p className="text-sm text-on-surface-variant">
          Complaint records will appear here once the backend team adds a complaints API.
          All other Swagger endpoints are now wired through the admin panel.
        </p>
      </div>
    </div>
  );
}
