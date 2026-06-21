"use client";

import { useEffect, useState } from "react";
import { getLaunchEligibleProperties } from "@/features/ipo/utils";
import { listProperties } from "@/features/properties/services/PropertiesApiService";
import type { PropertyResponse } from "@/types/backend";

export const useLaunchEligibleProperties = (isOpen: boolean) => {
  const [eligibleProperties, setEligibleProperties] = useState<PropertyResponse[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // useEffect justified: fetch-on-open — load fresh properties when the launch modal opens
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;

    const loadProperties = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const properties = await listProperties();
        if (!cancelled) {
          setEligibleProperties(getLaunchEligibleProperties(properties));
        }
      } catch (error) {
        if (!cancelled) {
          setEligibleProperties([]);
          setLoadError(
            error instanceof Error
              ? error.message
              : "Could not load properties.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProperties();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  return {
    eligibleProperties,
    isLoading,
    loadError
  };
};
