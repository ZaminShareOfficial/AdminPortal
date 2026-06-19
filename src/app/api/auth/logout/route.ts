import { NextResponse } from "next/server";
import { LOGIN_PATH } from "@/constants/routes";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

const clearSessionCookie = (response: NextResponse) => {
  response.cookies.delete(SESSION_COOKIE);
  return response;
};

export async function GET(request: Request) {
  const redirectTarget = new URL(request.url).searchParams.get("redirect");

  if (redirectTarget === "login") {
    return clearSessionCookie(
      NextResponse.redirect(new URL(LOGIN_PATH, request.url)),
    );
  }

  return clearSessionCookie(NextResponse.json({ ok: true }));
}

export async function POST() {
  return clearSessionCookie(NextResponse.json({ ok: true }));
}
