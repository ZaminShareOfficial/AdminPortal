import { NextResponse } from "next/server";
import { AUTH } from "@/constants/auth";
import { SESSION_COOKIE } from "@/lib/auth/cookie";
import {
  fetchProfileWithToken,
  isAdminRole
} from "@/lib/auth/admin-access";
import { ApiError, getErrorMessage } from "@/lib/api/errors";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };

    if (!body.token?.trim()) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const token = body.token.trim();
    const profile = await fetchProfileWithToken(token);

    if (!isAdminRole(profile.role)) {
      return NextResponse.json(
        { message: AUTH.NOT_ADMIN_MESSAGE },
        { status: AUTH.FORBIDDEN_STATUS }
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    const message = getErrorMessage(error, "Could not persist admin session");
    const status = error instanceof ApiError ? error.status : 500;
    return NextResponse.json({ message }, { status });
  }
}
