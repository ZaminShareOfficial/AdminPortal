"use client";

import { useMemo, useState } from "react";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { Icon } from "@/components/admin/icon";
import { CreateIpoTrigger } from "@/features/ipo/components/create-ipo-modal";
import { IpoInspectorPanel } from "@/features/ipo/components/ipo-inspector-panel";
import { IpoTable } from "@/features/ipo/components/ipo-table";
import type { IpoContentProps } from "@/features/ipo/types";
import { mapIpoToRow } from "@/lib/mappers/ipo";

export function IpoContent({
  initialIpos,
  approvedProperties,
  error = null
}: IpoContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialIpos[0]?.ipoId ?? null,
  );

  const ipos = useMemo(
    () =>
      initialIpos.map((ipo) => ({
        ...mapIpoToRow(ipo),
        ipoId: ipo.ipoId,
        propertyId: ipo.propertyId,
        rawStatus: ipo.status
      })),
    [initialIpos],
  );

  const selectedIpo = useMemo(
    () => ipos.find((ipo) => ipo.ipoId === selectedId) ?? null,
    [ipos, selectedId],
  );

  const stats = [
    {
      label: "Listed IPOs",
      value: String(ipos.length),
      change: "Live",
      sub: "GET /ipos",
      icon: "analytics"
    },
    {
      label: "Open",
      value: String(ipos.filter((ipo) => ipo.rawStatus === "CREATED").length),
      change: "CREATED",
      sub: "status",
      icon: "timer"
    },
    {
      label: "Paused",
      value: String(ipos.filter((ipo) => ipo.rawStatus === "PAUSED").length),
      change: "PAUSED",
      sub: "status",
      icon: "verified_user"
    },
    {
      label: "Minted",
      value: String(ipos.filter((ipo) => ipo.rawStatus === "MINTED").length),
      change: "MINTED",
      sub: "status",
      icon: "account_balance_wallet"
    }
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
        <CreateIpoTrigger approvedProperties={approvedProperties} />
      </div>

      {error ? <ApiErrorBanner message={error} /> : null}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <IpoTable ipos={ipos} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-lg border border-outline-variant/10 bg-surface-container p-6">
            <IpoInspectorPanel selectedIpo={selectedIpo} />
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
            <p className="font-headline text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-[10px] font-bold text-on-surface-variant">
              {stat.change} <span className="font-medium">{stat.sub}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
