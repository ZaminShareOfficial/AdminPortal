"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TokenRegistryProperty } from "@/components/tokens/components/property-asset-select";
import {
  TOKEN_REGISTRY_PROPERTY_PARAM,
  TOKENS_PATH
} from "@/constants/routes";
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
  properties: TokenRegistryProperty[];
  selectedPropertyId: string;
  totalTokens: string;
  holderCount: string;
  largestPct: string;
  holders: HolderRow[];
  error: string | null;
  isLoading: boolean;
  isPropertyLoading: boolean;
  onPropertySelect: (propertyId: string) => void;
};

const EMPTY_SUMMARY = {
  totalTokens: "—",
  holderCount: "0",
  largestPct: "—"
};

const resolveSelectedPropertyId = (
  properties: TokenRegistryProperty[],
  propertyIdFromUrl: string | null
) => {
  if (properties.length === 0) {
    return "";
  }

  const matchedProperty = propertyIdFromUrl
    ? properties.find((property) => property.propertyId === propertyIdFromUrl)
    : undefined;

  return matchedProperty?.propertyId ?? properties[0].propertyId;
};

export const useTokensPageData = (): TokensPageData => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyIdFromUrl = searchParams.get(TOKEN_REGISTRY_PROPERTY_PARAM);

  const [properties, setProperties] = useState<TokenRegistryProperty[]>([]);
  const [holders, setHolders] = useState<HolderRow[]>([]);
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPropertyLoading, setIsPropertyLoading] = useState(false);

  const selectedPropertyId = useMemo(
    () => resolveSelectedPropertyId(properties, propertyIdFromUrl),
    [properties, propertyIdFromUrl]
  );

  const updateUrlPropertyId = useCallback(
    (propertyId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(TOKEN_REGISTRY_PROPERTY_PARAM, propertyId);
      router.replace(`${TOKENS_PATH}?${params.toString()}`);
    },
    [router, searchParams]
  );

  const loadHoldersForProperty = useCallback(async (propertyId: string) => {
    setIsPropertyLoading(true);
    setError(null);

    try {
      const holdersResponse = await getPropertyHolders(propertyId);
      const nextSummary = summarizePropertyPortfolio(holdersResponse);

      setHolders(holdersResponse.holders.map(mapHolderToRow));
      setSummary({
        totalTokens: nextSummary.totalTokens,
        holderCount: nextSummary.holderCount,
        largestPct: nextSummary.largestPct
      });
      setError(null);
    } catch (loadError) {
      setHolders([]);
      setSummary(EMPTY_SUMMARY);
      setError(
        getErrorMessage(
          loadError,
          "Could not load token registry for the selected property."
        )
      );
    } finally {
      setIsPropertyLoading(false);
    }
  }, []);

  const onPropertySelect = useCallback(
    (propertyId: string) => {
      if (propertyId === selectedPropertyId) {
        return;
      }

      updateUrlPropertyId(propertyId);
    },
    [selectedPropertyId, updateUrlPropertyId]
  );

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const portfolioProperties = await listPortfolioProperties();
      const propertyOptions = portfolioProperties.map((property) => ({
        propertyId: property.propertyId,
        propertyTitle: property.propertyTitle
      }));

      setProperties(propertyOptions);
      setError(null);
    } catch (loadError) {
      setProperties([]);
      setHolders([]);
      setSummary(EMPTY_SUMMARY);
      setError(
        getErrorMessage(
          loadError,
          "Could not load token registry from admin portfolio APIs."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load portfolio properties on mount
  useEffect(() => {
    void fetchProperties();
  }, [fetchProperties]);

  // useEffect justified: data fetch — load holder data when selected property changes via URL or defaults
  useEffect(() => {
    if (!selectedPropertyId) {
      return;
    }

    void loadHoldersForProperty(selectedPropertyId);
  }, [selectedPropertyId, loadHoldersForProperty]);

  return {
    properties,
    selectedPropertyId,
    totalTokens: summary.totalTokens,
    holderCount: summary.holderCount,
    largestPct: summary.largestPct,
    holders,
    error,
    isLoading,
    isPropertyLoading,
    onPropertySelect
  };
};
