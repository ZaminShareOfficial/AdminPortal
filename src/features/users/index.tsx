"use client";

import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { NotifyUserButton } from "@/features/users/components/notify-user-button";
import type { UserRow } from "@/lib/mappers/portfolio";

type UsersContentProps = {
  users: UserRow[];
  totalUsers: number;
  pendingKyc: number;
  error?: string | null;
};

export function UsersContent({
  users,
  totalUsers,
  pendingKyc,
  error = null
}: UsersContentProps) {
  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            Access Management
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Investor registry from GET /portfolio. Per-user KYC review is not exposed by Swagger yet.
          </p>
        </div>
      </div>

      {error ? <ApiErrorBanner message={error} /> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex h-40 flex-col justify-between bg-surface-container-high p-6 md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Total Active Users
          </span>
          <div className="font-headline text-4xl font-extrabold text-primary">
            {totalUsers.toLocaleString()}
          </div>
        </div>
        <div className="flex h-40 flex-col justify-between bg-surface-container-low p-6">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Pending KYC
          </span>
          <div className="font-headline text-4xl font-extrabold">{pendingKyc}</div>
        </div>
      </div>

      <div className="overflow-hidden bg-surface-container-low">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-lowest/50">
                {["User ID", "Name", "KYC Status", "Portfolio Value", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-10 text-center text-sm text-on-surface-variant"
                  >
                    No investor portfolios returned from GET /portfolio.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-surface-container"
                  >
                    <td className="px-8 py-4 font-mono text-xs text-on-surface-variant">
                      {user.id}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center bg-surface-container-highest text-xs font-bold text-primary">
                          {user.initials}
                        </div>
                        <p className="text-sm font-bold">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold ${user.kycClass}`}>
                        {user.kyc}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right text-sm font-semibold text-secondary">
                      {user.portfolio}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <NotifyUserButton userName={user.name} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="flex items-center gap-2 text-xs text-on-surface-variant">
        <Icon name="info" className="text-sm" />
        GET /kyc only returns the signed-in admin&apos;s KYC. User-level KYC APIs are not in Swagger.
      </p>
    </div>
  );
}
