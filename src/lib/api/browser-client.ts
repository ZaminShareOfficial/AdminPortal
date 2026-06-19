import { getApiBaseUrl } from "@/lib/api/config";
import { UNAUTHORIZED_STATUS } from "@/constants/auth";
import { handleClientUnauthorized } from "@/lib/auth/unauthorized-client";
import { ApiError } from "@/lib/api/errors";

export async function clientFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `/api/v1${normalizedPath}`;

  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === UNAUTHORIZED_STATUS) {
      await handleClientUnauthorized();
    }

    let message = response.statusText;
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) {
        message = body.message;
      }
    } catch {
      // ignore non-json bodies
    }
    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}

export function getPublicApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
