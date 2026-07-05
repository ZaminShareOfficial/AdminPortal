const ADMIN_TOKEN_KEY = "zs_admin_access_token";

export function getStoredAdminToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function storeAdminToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearStoredAdminToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}
