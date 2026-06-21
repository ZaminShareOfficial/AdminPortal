"use client";

import { useCallback, useState } from "react";
import { listIpos } from "@/features/ipo/services/IpoApiService";
import type { IpoSummaryResponse } from "@/types/backend";

export const useIpoList = (initialIpos: IpoSummaryResponse[]) => {
  const [ipos, setIpos] = useState(initialIpos);
  const [isRefetching, setIsRefetching] = useState(false);
  const [refetchError, setRefetchError] = useState<string | null>(null);

  const refetchIpos = useCallback(async () => {
    setIsRefetching(true);
    setRefetchError(null);

    try {
      const nextIpos = await listIpos();
      setIpos(nextIpos);
    } catch (error) {
      setRefetchError(
        error instanceof Error ? error.message : "Could not refresh IPO list.",
      );
    } finally {
      setIsRefetching(false);
    }
  }, []);

  return {
    ipos,
    refetchIpos,
    isRefetching,
    refetchError
  };
};
