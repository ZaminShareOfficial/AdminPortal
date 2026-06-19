import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_AUTHENTICATED_PATH,
  isPublicPath,
  LOGIN_PATH,
} from "@/constants/routes";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

const isInternalPath = (pathname: string) =>
  pathname.startsWith("/_next") || pathname.includes(".");

const isAuthApiPath = (pathname: string) => pathname.startsWith("/api/auth");

const isProtectedApiPath = (pathname: string) =>
  pathname.startsWith("/api/admin") || pathname.startsWith("/api/v1");

const getSessionToken = (request: NextRequest) =>
  request.cookies.get(SESSION_COOKIE)?.value ?? null;

const redirectToLogin = (request: NextRequest, pathname: string) => {
  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
};

const unauthorizedApiResponse = () =>
  NextResponse.json({ message: "Authentication required" }, { status: 401 });

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getSessionToken(request);

  if (isInternalPath(pathname) || isAuthApiPath(pathname)) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    if (token) {
      return NextResponse.redirect(
        new URL(DEFAULT_AUTHENTICATED_PATH, request.url),
      );
    }

    return NextResponse.next();
  }

  if (isProtectedApiPath(pathname)) {
    if (!token) {
      return unauthorizedApiResponse();
    }

    return NextResponse.next();
  }

  if (!token) {
    return redirectToLogin(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
