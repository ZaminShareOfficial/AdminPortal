import { NextResponse } from "next/server";
import { ACCESS_DENIED_PATH, LOGIN_PATH } from "@/constants/routes";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

const clearSessionCookie = (response: NextResponse) => {
  response.cookies.delete(SESSION_COOKIE);
  return response;
};

const resolveLogoutRedirect = (redirectTarget: string | null, requestUrl: string) => {
  if (redirectTarget === "login") {
    return new URL(LOGIN_PATH, requestUrl);
  }

  if (redirectTarget === "access-denied") {
    return new URL(ACCESS_DENIED_PATH, requestUrl);
  }

  return null;
};

export async function GET(request: Request) {
  const requestUrl = request.url;
  const redirectTarget = new URL(requestUrl).searchParams.get("redirect");
  const redirectUrl = resolveLogoutRedirect(redirectTarget, requestUrl);

  if (redirectUrl) {
    return clearSessionCookie(NextResponse.redirect(redirectUrl));
  }

  return clearSessionCookie(NextResponse.json({ ok: true }));
}

export async function POST() {
  return clearSessionCookie(NextResponse.json({ ok: true }));
}
