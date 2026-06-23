"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProperty } from "@/features/properties/services/PropertiesApiService";
import type { PropertyResponse } from "@/types/backend";

export const useSelectedPropertyDetail = (selectedId: string | null) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyResponse | null>(
    null,
  );
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const fetchDetail = useCallback(async (id: string, signal?: AbortSignal) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoadingDetail(true);
    setDetailError(null);

    try {
      const property = await getProperty(id, signal);
      if (requestIdRef.current !== requestId) {
        return;
      }
      setSelectedProperty(property);
    } catch (error) {
      if (signal?.aborted) {
        return;
      }
      if (requestIdRef.current !== requestId) {
        return;
      }
      setSelectedProperty(null);
      setDetailError(
        error instanceof Error ? error.message : "Could not load property.",
      );
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoadingDetail(false);
      }
    }
  }, []);

  // useEffect justified: fetch-on-selection — load full property detail when a row is selected
  useEffect(() => {
    if (!selectedId) {
      setSelectedProperty(null);
      setDetailError(null);
      setIsLoadingDetail(false);
      return;
    }

    setSelectedProperty(null);
    const controller = new AbortController();
    void fetchDetail(selectedId, controller.signal);

    return () => {
      controller.abort();
    };
  }, [selectedId, fetchDetail]);

  const refetchDetail = useCallback(() => {
    if (!selectedId) {
      return;
    }
    void fetchDetail(selectedId);
  }, [selectedId, fetchDetail]);

  return {
    selectedProperty,
    isLoadingDetail,
    detailError,
    refetchDetail
  };
};
