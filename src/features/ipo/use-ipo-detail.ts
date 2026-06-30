"use client";

import { useEffect, useState } from "react";
import { getIpo } from "@/features/ipo/services/IpoApiService";
import type { IpoDetailResponse } from "@/types/backend";

export const useIpoDetail = (ipoId: string | null, refreshKey: number) => {
  const [detail, setDetail] = useState<IpoDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // useEffect justified: data fetch — load IPO detail when selection changes or list refreshes
  useEffect(() => {
    if (!ipoId) {
      setDetail(null);
      setLoadError(null);
      return;
    }

    let cancelled = false;

    const loadDetail = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const nextDetail = await getIpo(ipoId);
        if (!cancelled) {
          setDetail(nextDetail);
        }
      } catch (error) {
        if (!cancelled) {
          setDetail(null);
          setLoadError(
            error instanceof Error
              ? error.message
              : "Could not load IPO details.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      cancelled = true;
    };
  }, [ipoId, refreshKey]);

  return { detail, isLoading, loadError };
};
