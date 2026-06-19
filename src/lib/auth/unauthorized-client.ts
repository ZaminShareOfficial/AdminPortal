"use client";

import type { AxiosInstance } from "axios";
import axios from "axios";
import { LOGIN_PATH } from "@/constants/routes";
import { UNAUTHORIZED_STATUS } from "@/constants/auth";
import { clearSession } from "@/lib/auth/auth-service";

let isRedirectingToLogin = false;

export const handleClientUnauthorized = async (): Promise<void> => {
  if (isRedirectingToLogin || typeof window === "undefined") {
    return;
  }

  isRedirectingToLogin = true;

  try {
    await clearSession();
  } catch {
    // Session may already be cleared; still redirect to login.
  }

  window.location.replace(LOGIN_PATH);
};

export const attachUnauthorizedRedirect = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === UNAUTHORIZED_STATUS
      ) {
        await handleClientUnauthorized();
      }

      return Promise.reject(error);
    },
  );
};
