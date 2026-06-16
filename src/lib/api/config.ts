const API_PREFIX = "/api/v1";

export function getApiBaseUrl() {
  const origin = process.env.API_BASE_URL?.trim();
  if (origin) {
    return `${origin.replace(/\/+$/, "")}${API_PREFIX}`;
  }

  if (typeof window !== "undefined") {
    return API_PREFIX;
  }

  const fallback = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fallback) {
    return `${fallback.replace(/\/+$/, "")}${API_PREFIX}`;
  }

  return `http://localhost:8080${API_PREFIX}`;
}
