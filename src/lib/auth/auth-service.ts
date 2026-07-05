import type {
  SendOtpResponse,
  VerifyOtpResponse
} from "@/types/backend";
import { AUTH } from "@/constants/auth";
import { getPublicApiUrl } from "@/lib/api/browser-client";
import { getErrorMessage } from "@/lib/api/errors";
import { clearStoredAdminToken, storeAdminToken } from "@/lib/auth/token-storage";

async function authFetch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(getPublicApiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // ignore non-json bodies
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function sendAdminOtp(mobileNumber: string) {
  try {
    const data = await authFetch<SendOtpResponse>("/otp", {
      mobileNumber,
      challengeType: "OTP"
    });

    if (!data.sessionId) {
      throw new Error("Send OTP response did not include sessionId");
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Send OTP request failed"));
  }
}

export async function verifyAdminOtp(payload: {
  sessionId: string;
  mobileNumber: string;
  challenge: string;
}) {
  try {
    const data = await authFetch<VerifyOtpResponse>("/otp/verify", {
      sessionId: payload.sessionId,
      challenge: payload.challenge,
      challengeType: "OTP"
    });

    if (!data.token) {
      throw new Error("Authentication response is missing token");
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "OTP verification failed"));
  }
}

export async function persistSession(token: string) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  if (response.status === AUTH.FORBIDDEN_STATUS) {
    throw new Error(AUTH.NOT_ADMIN_MESSAGE);
  }

  if (!response.ok) {
    let message = "Could not persist admin session";
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // ignore non-json bodies
    }
    throw new Error(message);
  }

  storeAdminToken(token);
}

export async function clearSession() {
  clearStoredAdminToken();
  await fetch("/api/auth/logout", { method: "POST" });
}
