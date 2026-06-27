import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/server-client";
import { ApiError, getErrorMessage } from "@/lib/api/errors";
import type { VerifyOtpResponse } from "@/types/backend";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      sessionId?: string;
      mobileNumber?: string;
      challenge?: string;
    };

    if (!body.sessionId?.trim() || !body.mobileNumber?.trim() || !body.challenge?.trim()) {
      return NextResponse.json(
        { message: "Session ID, mobile number, and OTP are required" },
        { status: 400 },
      );
    }

    const data = await apiFetch<VerifyOtpResponse>("/otp/verify", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({
        sessionId: body.sessionId.trim(),
        challenge: body.challenge.trim(),
        challengeType: "OTP"
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    const message = getErrorMessage(error, "OTP verification failed");
    const status = error instanceof ApiError ? error.status : 500;
    return NextResponse.json({ message }, { status });
  }
}
