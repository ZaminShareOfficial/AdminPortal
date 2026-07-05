"use client";

import axios, { type AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { attachUnauthorizedRedirect } from "@/lib/auth/unauthorized-client";
import { ApiError } from "@/lib/api/errors";
import { getApiBaseUrl } from "@/lib/api/config";
import { getStoredAdminToken } from "@/lib/auth/token-storage";

type UseAxiosOptions = Omit<AxiosRequestConfig, "url"> & {
  autoFetch?: boolean;
};

type UseAxiosResult<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  startFetch: (
    override?: Partial<AxiosRequestConfig>,
  ) => Promise<T | null>;
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

attachUnauthorizedRedirect(apiClient);

function toApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data as { message?: string } | undefined;
    if (message?.message) {
      return message.message;
    }
    if (error.response?.statusText) {
      return error.response.statusText;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Request failed";
}

export const useAxios = <T>(
  url: string,
  options: UseAxiosOptions = {},
): UseAxiosResult<T> => {
  const {
    autoFetch = false,
    method = "GET",
    data: body,
    headers,
    params,
    ...rest
  } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startFetch = useCallback(
    async (override: Partial<AxiosRequestConfig> = {}): Promise<T | null> => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.request<T>({
          url,
          method,
          data: body,
          headers,
          params,
          signal: controller.signal,
          ...rest,
          ...override,
        });
        setData(response.data);
        return response.data;
      } catch (requestError) {
        if (axios.isCancel(requestError)) {
          return null;
        }
        const message = toApiError(requestError);
        setError(message);
        return null;
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [body, headers, method, params, rest, url],
  );

  // useEffect justified: fetch-on-mount — autoFetch triggers initial data load when hook mounts
  useEffect(() => {
    if (!autoFetch) {
      return;
    }
    void startFetch();
  }, [autoFetch, startFetch]);

  // useEffect justified: cleanup — cancel in-flight request when component unmounts
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    data,
    error,
    isLoading,
    startFetch,
  };
};
