"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import { formatPaise } from "@/lib/format";
import {
  mapPortfolioToFinanceRow,
  summarizePortfolios
} from "@/lib/mappers/portfolio";
import type { FinanceInvestorRow } from "@/lib/mappers/portfolio";
import { listUserPortfolios } from "@/lib/services/portfolio-api-service";

type FinancePageData = {
  totalInvested: string;
  totalCurrent: string;
  netGain: string;
  investorCount: number;
  payouts: FinanceInvestorRow[];
  error: string | null;
  isLoading: boolean;
};

const EMPTY_FINANCE_DATA: FinancePageData = {
  totalInvested: "—",
  totalCurrent: "—",
  netGain: "—",
  investorCount: 0,
  payouts: [],
  error: null,
  isLoading: true
};

export const useFinancePageData = (): FinancePageData => {
  const [data, setData] = useState<FinancePageData>(EMPTY_FINANCE_DATA);

  const fetchFinance = useCallback(async () => {
    setData((current) => ({ ...current, isLoading: true, error: null }));

    try {
      const portfolios = await listUserPortfolios();
      const summary = summarizePortfolios(portfolios);

      setData({
        totalInvested: formatPaise(summary.totalInvested),
        totalCurrent: formatPaise(summary.totalCurrent),
        netGain: formatPaise(summary.netGain),
        investorCount: summary.investorCount,
        payouts: portfolios.map(mapPortfolioToFinanceRow),
        error: null,
        isLoading: false
      });
    } catch (loadError) {
      setData({
        totalInvested: "—",
        totalCurrent: "—",
        netGain: "—",
        investorCount: 0,
        payouts: [],
        error: getErrorMessage(
          loadError,
          "Could not load finance data from GET /portfolio."
        ),
        isLoading: false
      });
    }
  }, []);

  // useEffect justified: data fetch — load finance data on mount
  useEffect(() => {
    void fetchFinance();
  }, [fetchFinance]);

  return data;
};
