import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

export async function POST(request: Request) {
  const body = (await request.json()) as { token?: string };

  if (!body.token?.trim()) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
