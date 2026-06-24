export const LOGIN_PATH = "/login";
export const ACCESS_DENIED_PATH = "/access-denied";
export const DEFAULT_AUTHENTICATED_PATH = "/";
export const LOGOUT_PATH = "/api/auth/logout";
export const SESSION_EXPIRED_PATH = `${LOGOUT_PATH}?redirect=login`;
export const ACCESS_DENIED_REDIRECT = `${LOGOUT_PATH}?redirect=access-denied`;

export const PUBLIC_PATHS = [LOGIN_PATH, ACCESS_DENIED_PATH] as const;

export type PublicPath = (typeof PUBLIC_PATHS)[number];

export const isPublicPath = (pathname: string): pathname is PublicPath =>
  PUBLIC_PATHS.some((path) => pathname === path);
