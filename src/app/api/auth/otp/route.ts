import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/server-client";
import { ApiError, getErrorMessage } from "@/lib/api/errors";
import type { SendOtpResponse } from "@/types/backend";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { mobileNumber?: string };

    if (!body.mobileNumber?.trim()) {
      return NextResponse.json(
        { message: "Mobile number is required" },
        { status: 400 },
      );
    }

    const data = await apiFetch<SendOtpResponse>("/otp", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({
        mobileNumber: body.mobileNumber.trim(),
        challengeType: "OTP",
        role: "ADMIN",
        scope: "LOGIN",
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    const message = getErrorMessage(error, "Send OTP request failed");
    const status = error instanceof ApiError ? error.status : 500;
    return NextResponse.json({ message }, { status });
  }
}
