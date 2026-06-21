"use client";

import { useEffect, useMemo, useState } from "react";
import { getIpoDetail } from "@/features/ipo/services/IpoApiService";
import type { IpoDetailResponse } from "@/types/backend";

export const useIpoDetails = (ipoIds: string[], refreshKey: number) => {
  const [details, setDetails] = useState<Record<string, IpoDetailResponse>>({});
  const [isLoading, setIsLoading] = useState(false);

  const ipoIdsKey = useMemo(
    () => [...ipoIds].sort().join("|"),
    [ipoIds],
  );

  // useEffect justified: data fetch — load IPO detail (incl. subscribed tokens) when list changes or refreshes
  useEffect(() => {
    if (ipoIds.length === 0) {
      setDetails({});
      return;
    }

    let cancelled = false;

    const loadDetails = async () => {
      setIsLoading(true);

      try {
        const results = await Promise.all(
          ipoIds.map(async (ipoId) => {
            try {
              const detail = await getIpoDetail(ipoId);
              return [ipoId, detail] as const;
            } catch {
              return [ipoId, null] as const;
            }
          }),
        );

        if (cancelled) {
          return;
        }

        const nextDetails: Record<string, IpoDetailResponse> = {};

        for (const [ipoId, detail] of results) {
          if (detail) {
            nextDetails[ipoId] = detail;
          }
        }

        setDetails(nextDetails);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDetails();

    return () => {
      cancelled = true;
    };
  }, [ipoIds, ipoIdsKey, refreshKey]);

  return { details, isLoading };
};
