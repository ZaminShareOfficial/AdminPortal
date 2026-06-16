import { Icon } from "@/components/admin/icon";

export function SettingsContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Configuration</p>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface">Settings</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Platform settings are not exposed by the current Swagger API.
        </p>
      </div>

      <div className="overflow-hidden bg-surface-container-low p-12 text-center">
        <Icon name="settings" className="mx-auto mb-4 text-4xl text-on-surface-variant" />
        <p className="text-sm text-on-surface-variant">
          Notification templates and admin configuration can be wired to
          POST/PATCH /admin/template when this screen is implemented.
        </p>
      </div>
    </div>
  );
}
