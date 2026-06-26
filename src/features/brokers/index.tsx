"use client";

import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { useBrokersPageData } from "@/features/brokers/hooks";
import { NotifyUserButton } from "@/features/users/components/notify-user-button";

export const BrokersContent = () => {
  const {
    brokers,
    totalBrokers,
    pendingReview,
    activeBrokers,
    error,
    isLoading
  } = useBrokersPageData();

  if (isLoading) {
    return (
      <div
        className="flex flex-1 items-center justify-center text-on-surface-variant"
        data-testid="brokers-loading"
      >
        Loading brokers…
      </div>
    );
  }

  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8" data-testid="brokers-page">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
          Brokers
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Broker onboarding registry from GET /admin/brokers.
        </p>
      </div>

      {error ? <ApiErrorBanner message={error} /> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex h-40 flex-col justify-between bg-surface-container-high p-6">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Total Brokers
          </span>
          <div className="font-headline text-4xl font-extrabold text-primary">
            {totalBrokers.toLocaleString()}
          </div>
        </div>
        <div className="flex h-40 flex-col justify-between bg-surface-container-low p-6">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Pending Review
          </span>
          <div className="font-headline text-4xl font-extrabold">{pendingReview}</div>
        </div>
        <div className="flex h-40 flex-col justify-between bg-surface-container-low p-6">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Active Brokers
          </span>
          <div className="font-headline text-4xl font-extrabold text-tertiary">
            {activeBrokers}
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-surface-container-low">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-lowest/50">
                {[
                  "Broker ID",
                  "Name",
                  "Company",
                  "Contact",
                  "KYC Status",
                  "Onboarding",
                  "Submitted",
                  "Actions"
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {brokers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-8 py-10 text-center text-sm text-on-surface-variant"
                  >
                    No brokers returned from GET /admin/brokers.
                  </td>
                </tr>
              ) : (
                brokers.map((broker) => (
                  <tr
                    key={broker.id}
                    className="transition-colors hover:bg-surface-container"
                  >
                    <td className="px-8 py-4 font-mono text-xs text-on-surface-variant">
                      {broker.id}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center bg-surface-container-highest text-xs font-bold text-secondary">
                          {broker.initials}
                        </div>
                        <p className="text-sm font-bold">{broker.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-on-surface-variant">
                      {broker.company}
                    </td>
                    <td className="px-8 py-4 text-sm text-on-surface-variant">
                      {broker.contact}
                    </td>
                    <td className="px-8 py-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold ${broker.kycClass}`}>
                        {broker.kyc}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold ${broker.onboardingClass}`}
                      >
                        {broker.onboarding}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm text-on-surface-variant">
                      {broker.submittedAt}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <NotifyUserButton userName={broker.name} userId={broker.userId} />
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
        Approval queue: ?status=PROFILE_PENDING&amp;kycStatus=APPROVED
      </p>
    </div>
  );
};
