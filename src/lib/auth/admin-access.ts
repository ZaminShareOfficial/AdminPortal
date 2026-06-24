import { redirect } from "next/navigation";
import { AUTH } from "@/constants/auth";
import {
  ACCESS_DENIED_REDIRECT,
  LOGIN_PATH,
  SESSION_EXPIRED_PATH
} from "@/constants/routes";
import { apiFetch } from "@/lib/api/server-client";
import { isUnauthorizedError } from "@/lib/auth/unauthorized";
import { getAccessToken } from "@/lib/auth/session";
import type { ProfileResponse } from "@/types/backend";

export const isAdminRole = (
  role: ProfileResponse["role"] | undefined
): boolean => role === AUTH.ADMIN_ROLE;

export const fetchProfileWithToken = (token: string) =>
  apiFetch<ProfileResponse>("/me", {
    skipAuth: true,
    headers: { Authorization: `Bearer ${token}` }
  });

export async function requireAdminSession(): Promise<string> {
  const token = await getAccessToken();

  if (!token) {
    redirect(LOGIN_PATH);
  }

  try {
    const profile = await apiFetch<ProfileResponse>("/me");

    if (!isAdminRole(profile.role)) {
      redirect(ACCESS_DENIED_REDIRECT);
    }

    return token;
  } catch (error) {
    if (isUnauthorizedError(error)) {
      redirect(SESSION_EXPIRED_PATH);
    }

    throw error;
  }
}
