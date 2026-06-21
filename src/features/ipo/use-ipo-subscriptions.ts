"use client";

import { useEffect, useMemo, useState } from "react";
import { getIpoSubscriptionSummary } from "@/features/ipo/services/IpoApiService";
import type { IpoSubscriptionSummaryResponse } from "@/types/backend";

export const useIpoSubscriptions = (ipoIds: string[], refreshKey: number) => {
  const [summaries, setSummaries] = useState<
    Record<string, IpoSubscriptionSummaryResponse>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const ipoIdsKey = useMemo(
    () => [...ipoIds].sort().join("|"),
    [ipoIds],
  );

  // useEffect justified: data fetch — load admin subscription summaries when IPO list changes or refreshes
  useEffect(() => {
    if (ipoIds.length === 0) {
      setSummaries({});
      return;
    }

    let cancelled = false;

    const loadSummaries = async () => {
      setIsLoading(true);

      try {
        const results = await Promise.all(
          ipoIds.map(async (ipoId) => {
            try {
              const summary = await getIpoSubscriptionSummary(ipoId);
              return [ipoId, summary] as const;
            } catch {
              return [ipoId, null] as const;
            }
          }),
        );

        if (cancelled) {
          return;
        }

        const nextSummaries: Record<string, IpoSubscriptionSummaryResponse> =
          {};

        for (const [ipoId, summary] of results) {
          if (summary) {
            nextSummaries[ipoId] = summary;
          }
        }

        setSummaries(nextSummaries);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadSummaries();

    return () => {
      cancelled = true;
    };
  }, [ipoIds, ipoIdsKey, refreshKey]);

  return { summaries, isLoading };
};
