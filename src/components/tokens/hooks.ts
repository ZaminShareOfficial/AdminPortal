"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import {
  mapHolderToRow,
  summarizePropertyPortfolio
} from "@/lib/mappers/portfolio";
import type { HolderRow } from "@/lib/mappers/portfolio";
import {
  getPropertyHolders,
  listPortfolioProperties
} from "@/lib/services/portfolio-api-service";

type TokensPageData = {
  propertyTitle: string;
  propertyId: string;
  totalTokens: string;
  holderCount: string;
  largestPct: string;
  holders: HolderRow[];
  error: string | null;
  isLoading: boolean;
};

const EMPTY_TOKENS_DATA: TokensPageData = {
  propertyTitle: "—",
  propertyId: "—",
  totalTokens: "—",
  holderCount: "0",
  largestPct: "—",
  holders: [],
  error: null,
  isLoading: true
};

export const useTokensPageData = (): TokensPageData => {
  const [data, setData] = useState<TokensPageData>(EMPTY_TOKENS_DATA);

  const fetchTokens = useCallback(async () => {
    setData((current) => ({ ...current, isLoading: true, error: null }));

    try {
      const properties = await listPortfolioProperties();

      if (properties.length === 0) {
        setData({
          propertyTitle: "No active property",
          propertyId: "—",
          totalTokens: "—",
          holderCount: "0",
          largestPct: "—",
          holders: [],
          error: null,
          isLoading: false
        });
        return;
      }

      const selected = properties[0];
      const holdersResponse = await getPropertyHolders(selected.propertyId);
      const summary = summarizePropertyPortfolio(holdersResponse);

      setData({
        propertyTitle: selected.propertyTitle,
        propertyId: selected.propertyId,
        totalTokens: summary.totalTokens,
        holderCount: summary.holderCount,
        largestPct: summary.largestPct,
        holders: holdersResponse.holders.map(mapHolderToRow),
        error: null,
        isLoading: false
      });
    } catch (loadError) {
      setData({
        propertyTitle: "—",
        propertyId: "—",
        totalTokens: "—",
        holderCount: "0",
        largestPct: "—",
        holders: [],
        error: getErrorMessage(
          loadError,
          "Could not load token registry from admin portfolio APIs."
        ),
        isLoading: false
      });
    }
  }, []);

  // useEffect justified: data fetch — load token registry on mount
  useEffect(() => {
    void fetchTokens();
  }, [fetchTokens]);

  return data;
};
