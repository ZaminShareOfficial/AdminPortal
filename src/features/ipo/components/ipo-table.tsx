"use client";

import Image from "next/image";
import type { IpoViewRow } from "@/features/ipo/types";
import { getRowActivationProps } from "@/lib/a11y";

const placeholderImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu1lg4swJwDIAlT-bJscsUntDuZgsX4bx-xwlAP87m1nYpEiXjOlk3SHwdhtfG71K9s8zDXsE-6oi4LmiJt6wwRIMJZjYP-f5ZjAEOALLKA4ysoWI3HVbBgguLrkJc86iZ3Utaw7Gj0qRtNpbNWgqWA44_Yl_SviHd2Bngw1W7cALociJLNDYPUyE365lIc5YLUHxqXXIcJWktcTmStfDcTbMjeDh47Nz6qu7Zt_vyfNJ3EzY-_e2x-yvALF6RSk1qTp54fHjYFm8J";

type IpoTableProps = {
  ipos: IpoViewRow[];
  selectedId: string | null;
  onSelect: (ipoId: string) => void;
};

export const IpoTable = ({ ipos, selectedId, onSelect }: IpoTableProps) => (
  <div className="overflow-hidden rounded-lg border border-outline-variant/5 bg-surface-container">
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-outline-variant/10 bg-surface-container-low">
          {["Property", "Token Supply", "Price (USD)", "Subscription", "Status", "Actions"].map(
            (heading, index) => (
              <th
                key={heading}
                scope="col"
                className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${index === 0 ? "px-6" : ""} ${index === 5 ? "px-6 text-right" : ""}`}
              >
                {heading}
              </th>
            ),
          )}
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
          ipos.map((ipo) => (
            <tr
              key={ipo.ipoId}
              {...getRowActivationProps(() => onSelect(ipo.ipoId))}
              className={`cursor-pointer transition-colors hover:bg-surface-container-high ${
                selectedId === ipo.ipoId ? "bg-surface-container-low" : ""
              } ${ipo.highlighted ? "bg-surface-container-low/30" : ""}`}
              data-testid={`ipo-row-${ipo.ipoId}`}
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
                    <p className="text-[11px] text-on-surface-variant">{ipo.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-5 font-mono text-xs">{ipo.supply}</td>
              <td className="px-4 py-5 font-mono text-xs">{ipo.price}</td>
              <td className="px-4 py-5 text-xs text-on-surface-variant">
                {ipo.progressLabel}
              </td>
              <td className="px-4 py-5">
                <span
                  className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase ${ipo.statusColor}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${ipo.dotColor}`} />
                  {ipo.status}
                </span>
              </td>
              <td className="px-6 py-5 text-right text-[10px] text-on-surface-variant">
                Manage
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
