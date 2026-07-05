import axios, { type AxiosRequestConfig } from "axios";
import { attachUnauthorizedRedirect } from "@/lib/auth/unauthorized-client";
import { ApiError } from "@/lib/api/errors";
import { getApiBaseUrl } from "@/lib/api/config";
import { getStoredAdminToken } from "@/lib/auth/token-storage";

const adminClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json"
  }
});

adminClient.interceptors.request.use((config) => {
  const token = getStoredAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

attachUnauthorizedRedirect(adminClient);

export async function adminApiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await adminClient.request<T>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data as { message?: string } | undefined;
      const message =
        payload?.message ?? error.response?.statusText ?? error.message;
      throw new ApiError(error.response?.status ?? 500, message);
    }
    throw error;
  }
}

export const ADMIN_API_BASE_URL = getApiBaseUrl();
