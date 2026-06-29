"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import { mapBrokerSummaryToRow } from "@/lib/mappers/broker";
import type { BrokerRow } from "@/lib/mappers/broker";
import { listBrokers } from "@/lib/services/brokers-api-service";

type BrokersPageData = {
  brokers: BrokerRow[];
  totalBrokers: number;
  pendingReview: number;
  activeBrokers: number;
  error: string | null;
  isLoading: boolean;
  refetchBrokers: () => Promise<void>;
};

export const useBrokersPageData = (): BrokersPageData => {
  const [brokers, setBrokers] = useState<BrokerRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBrokers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await listBrokers();
      setBrokers(response.map(mapBrokerSummaryToRow));
    } catch (loadError) {
      setBrokers([]);
      setError(getErrorMessage(loadError, "Could not load brokers from GET /admin/brokers."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load brokers on mount
  useEffect(() => {
    void fetchBrokers();
  }, [fetchBrokers]);

  return {
    brokers,
    totalBrokers: brokers.length,
    pendingReview: brokers.filter((broker) => broker.onboarding === "PROFILE_PENDING").length,
    activeBrokers: brokers.filter((broker) => broker.onboarding === "ACTIVE").length,
    error,
    isLoading,
    refetchBrokers: fetchBrokers
  };
};
