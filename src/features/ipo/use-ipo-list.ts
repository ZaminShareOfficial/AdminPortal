"use client";

import { useCallback, useEffect, useState } from "react";
import { listIpos } from "@/features/ipo/services/IpoApiService";
import type { IpoSummaryResponse } from "@/types/backend";

export const useIpoList = () => {
  const [ipos, setIpos] = useState<IpoSummaryResponse[]>([]);
  const [listRevision, setListRevision] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchIpos = useCallback(async (isRefetch = false) => {
    if (isRefetch) {
      setIsRefetching(true);
    } else {
      setIsLoading(true);
    }
    setLoadError(null);

    try {
      const nextIpos = await listIpos();
      setIpos(nextIpos);
      setListRevision((revision) => revision + 1);
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Could not load IPO list.",
      );
    } finally {
      if (isRefetch) {
        setIsRefetching(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const refetchIpos = useCallback(async () => {
    await fetchIpos(true);
  }, [fetchIpos]);

  // useEffect justified: data fetch — load IPO list on mount
  useEffect(() => {
    void fetchIpos(false);
  }, [fetchIpos]);

  return {
    ipos,
    refetchIpos,
    listRevision,
    isLoading,
    isRefetching,
    loadError
  };
};
