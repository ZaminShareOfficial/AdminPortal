"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { LaunchIpoTrigger } from "@/features/ipo/components/create-ipo-modal";
import { IpoInspectorPanel } from "@/features/ipo/components/ipo-inspector-panel";
import { IpoTable } from "@/features/ipo/components/ipo-table";
import { useIpoActions } from "@/features/ipo/use-ipo-actions";
import { useIpoList } from "@/features/ipo/use-ipo-list";
import { useIpoSubscriptions } from "@/features/ipo/use-ipo-subscriptions";
import { mapIpoToRow } from "@/lib/mappers/ipo";

export function IpoContent() {
  const {
    ipos: ipoRecords,
    refetchIpos,
    listRevision,
    isLoading,
    isRefetching,
    loadError
  } = useIpoList();
  const ipoActions = useIpoActions(refetchIpos);
  const [selectedIpoId, setSelectedIpoId] = useState<string | null>(null);
  const ipoIds = useMemo(
    () => ipoRecords.map((ipo) => ipo.ipoId),
    [ipoRecords],
  );
  const { summaries, isLoading: isSubscriptionsLoading } = useIpoSubscriptions(
    ipoIds,
    listRevision,
  );
  const ipos = useMemo(
    () =>
      ipoRecords.map((ipo) =>
        mapIpoToRow(
          ipo,
          summaries[ipo.ipoId],
          isSubscriptionsLoading && !summaries[ipo.ipoId],
        ),
      ),
    [ipoRecords, summaries, isSubscriptionsLoading],
  );

  const selectedIpo = useMemo(
    () => ipoRecords.find((ipo) => ipo.ipoId === selectedIpoId) ?? null,
    [ipoRecords, selectedIpoId],
  );

  // useEffect justified: external sync — keep a valid IPO selected when list loads or refreshes
  useEffect(() => {
    if (ipoRecords.length === 0) {
      setSelectedIpoId(null);
      return;
    }

    const hasSelection = ipoRecords.some((ipo) => ipo.ipoId === selectedIpoId);
    if (!hasSelection) {
      setSelectedIpoId(ipoRecords[0].ipoId);
    }
  }, [ipoRecords, selectedIpoId]);

  const stats = [
    { label: "Listed IPOs", value: String(ipos.length), change: "Live", sub: "GET /ipos", icon: "analytics", changeColor: "text-tertiary" },
    { label: "Open", value: String(ipos.filter((ipo) => ipo.status === "Open").length), change: "CREATED", sub: "status filter", icon: "timer", changeColor: "text-secondary" },
    { label: "Paused", value: String(ipos.filter((ipo) => ipo.status === "Paused").length), change: "PAUSED", sub: "status filter", icon: "verified_user", changeColor: "text-on-surface-variant" },
    { label: "Minted", value: String(ipos.filter((ipo) => ipo.status === "Minted").length), change: "MINTED", sub: "status filter", icon: "account_balance_wallet", changeColor: "text-tertiary" }
  ];

  return (
    <div className="hide-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            IPO Management
          </h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-widest text-on-surface-variant">
            Institutional Offering Control Center
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="flex items-center gap-2 rounded bg-surface-container-high px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest">
            <Icon name="history" className="text-primary" />
            View Logs
          </button>
          <LaunchIpoTrigger ipoActions={ipoActions} />
        </div>
      </div>

      {loadError ? <ApiErrorBanner message={loadError} /> : null}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="font-headline text-lg font-bold">Live & Pending IPOs</h2>
              <span className="rounded bg-primary-container/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {ipos.length} LISTED
                {isLoading ? " · LOADING" : isRefetching ? " · REFRESHING" : ""}
              </span>
            </div>
            <div className="flex gap-2 text-on-surface-variant">
              <Icon name="filter_list" className="cursor-pointer hover:text-on-surface" />
              <Icon name="sort" className="cursor-pointer hover:text-on-surface" />
            </div>
          </div>

          {isLoading ? (
            <p
              className="rounded-lg border border-outline-variant/5 bg-surface-container px-6 py-10 text-sm text-on-surface-variant"
              data-testid="ipo-list-loading"
            >
              Loading IPOs...
            </p>
          ) : (
            <IpoTable
              ipos={ipos}
              selectedId={selectedIpoId}
              onSelect={setSelectedIpoId}
            />
          )}
        </div>

        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <div className="relative overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container p-6">
            <span className="absolute right-3 top-3 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-tighter text-primary">
              INSPECTOR
            </span>
            <IpoInspectorPanel
              ipo={selectedIpo}
              subscription={selectedIpo ? summaries[selectedIpo.ipoId] : null}
              isSubscriptionLoading={
                isSubscriptionsLoading &&
                selectedIpo != null &&
                !summaries[selectedIpo.ipoId]
              }
              ipoActions={ipoActions}
            />
          </div>

          <div className="rounded-lg border border-outline-variant/10 bg-surface-bright/40 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="trending_up" className="text-secondary" />
              <h4 className="font-headline text-sm font-bold">Market Intelligence</h4>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-on-surface-variant">
              IPO demand insights are not available from the current Swagger API.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded border border-outline-variant/5 bg-surface-container-low p-5"
          >
            <div className="mb-2 flex items-start justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </p>
              <Icon name={stat.icon} className="text-primary" />
            </div>
            <p className="font-headline text-2xl font-bold tracking-tight">
              {stat.value}
            </p>
            <p className={`mt-1 text-[10px] font-bold ${stat.changeColor}`}>
              {stat.change}{" "}
              {stat.sub ? (
                <span className="ml-1 font-medium text-on-surface-variant">
                  {stat.sub}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
