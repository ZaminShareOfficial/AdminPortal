"use client";

import Image from "next/image";
import { Icon } from "@/components/admin/icon";
import { IpoSubscriptionBar } from "@/features/ipo/components/ipo-subscription-bar";
import type { IpoRow } from "@/lib/mappers/ipo";

const placeholderImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu1lg4swJwDIAlT-bJscsUntDuZgsX4bx-xwlAP87m1nYpEiXjOlk3SHwdhtfG71K9s8zDXsE-6oi4LmiJt6wwRIMJZjYP-f5ZjAEOALLKA4ysoWI3HVbBgguLrkJc86iZ3Utaw7Gj0qRtNpbNWgqWA44_Yl_SviHd2Bngw1W7cALociJLNDYPUyE365lIc5YLUHxqXXIcJWktcTmStfDcTbMjeDh47Nz6qu7Zt_vyfNJ3EzY-_e2x-yvALF6RSk1qTp54fHjYFm8J";

type IpoTableProps = {
  ipos: IpoRow[];
  selectedId: string | null;
  onSelect: (ipoId: string) => void;
};

const TABLE_HEADERS = [
  "Property",
  "Token Supply",
  "Price (INR)",
  "Subscription",
  "Status",
  "Actions"
];

export const IpoTable = ({ ipos, selectedId, onSelect }: IpoTableProps) => (
  <div className="overflow-hidden rounded-lg border border-outline-variant/5 bg-surface-container">
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-outline-variant/10 bg-surface-container-low">
          {TABLE_HEADERS.map((header, index) => (
            <th
              key={header}
              scope="col"
              className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${index === 0 ? "px-6" : ""} ${index === 5 ? "px-6 text-right" : ""} ${index === 3 ? "w-48" : ""}`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/5">
        {ipos.length === 0 ? (
          <tr>
            <td
              colSpan={6}
              className="px-6 py-10 text-center text-sm text-on-surface-variant"
            >
              No IPOs returned from the backend yet.
            </td>
          </tr>
        ) : (
          ipos.map((ipo) => {
            const isSelected = ipo.id === selectedId;

            return (
              <tr
                key={ipo.id}
                className={`cursor-pointer transition-colors hover:bg-surface-container-high ${isSelected ? "bg-surface-container-low/50" : ""} ${ipo.highlighted ? "bg-surface-container-low/30" : ""} ${ipo.active ? "relative after:pointer-events-none after:absolute after:inset-0 after:border after:border-primary-container/20" : ""}`}
                onClick={() => onSelect(ipo.id)}
                data-testid={`ipo-row-${ipo.id}`}
              >
                <td className={`px-6 py-5 ${ipo.dimmed ? "opacity-60" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded bg-surface-container-highest">
                      <Image
                        src={placeholderImage}
                        alt={ipo.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{ipo.name}</p>
                      <p className="text-[11px] text-on-surface-variant">
                        {ipo.id}
                      </p>
                      <p className="text-[10px] text-on-surface-variant/80">
                        {ipo.location}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className={`px-4 py-5 font-mono text-xs ${ipo.dimmed ? "opacity-60" : ""}`}
                >
                  {ipo.supply}
                </td>
                <td
                  className={`px-4 py-5 font-mono text-xs ${ipo.dimmed ? "opacity-60" : ""}`}
                >
                  {ipo.price}
                </td>
                <td className={`px-4 py-5 ${ipo.dimmed ? "opacity-60" : ""}`}>
                  <IpoSubscriptionBar
                    progress={ipo.progress}
                    progressLabel={ipo.progressLabel}
                    dimmed={ipo.dimmed}
                    testId={`ipo-subscription-${ipo.id}`}
                  />
                </td>
                <td className="px-4 py-5">
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider ${ipo.statusColor}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${ipo.dotColor} ${ipo.status === "Subscription" ? "animate-pulse" : ""}`}
                    />
                    {ipo.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    type="button"
                    aria-label="More actions"
                    className="rounded p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Icon name="more_vert" />
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
    <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low px-6 py-4">
      <p className="text-xs text-on-surface-variant">
        Showing {ipos.length} IPO{ipos.length === 1 ? "" : "s"} from the backend
      </p>
    </div>
  </div>
);
