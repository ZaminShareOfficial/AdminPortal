"use client";

import { useCallback, useEffect, useState } from "react";
import { listProperties } from "@/features/properties/services/PropertiesApiService";
import { getErrorMessage } from "@/lib/api/errors";
import type { PropertyResponse } from "@/types/backend";

type PropertiesPageData = {
  initialProperties: PropertyResponse[];
  error: string | null;
  isLoading: boolean;
};

export const usePropertiesPageData = (): PropertiesPageData => {
  const [initialProperties, setInitialProperties] = useState<PropertyResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const properties = await listProperties();
      setInitialProperties(properties);
    } catch (loadError) {
      setInitialProperties([]);
      setError(
        getErrorMessage(loadError, "Could not load properties from the backend.")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load properties on mount
  useEffect(() => {
    void fetchProperties();
  }, [fetchProperties]);

  return { initialProperties, error, isLoading };
};
