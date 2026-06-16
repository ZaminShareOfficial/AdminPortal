"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  persistSession,
  sendAdminOtp,
  verifyAdminOtp,
} from "@/lib/auth/auth-service";
import { Icon } from "@/components/admin/icon";

type Step = "mobile" | "otp";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [challenge, setChallenge] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const redirectTo = searchParams.get("from") || "/";

  const onSendOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await sendAdminOtp(mobileNumber.trim());
        setSessionId(response.sessionId);
        setStep("otp");
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Could not send the code.",
        );
      }
    });
  };

  const onVerifyOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await verifyAdminOtp({
          sessionId,
          mobileNumber: mobileNumber.trim(),
          challenge: challenge.trim(),
        });
        await persistSession(response.token);
        router.replace(redirectTo);
        router.refresh();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "OTP verification failed.",
        );
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md border border-outline-variant/10 bg-surface-container p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            ZaminShare
          </p>
          <h1 className="mt-2 font-headline text-3xl font-extrabold text-on-surface">
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Sign in with your admin mobile number and OTP.
          </p>
        </div>

        {step === "mobile" ? (
          <form className="space-y-4" onSubmit={onSendOtp}>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Mobile Number
              </span>
              <input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={mobileNumber}
                onChange={(event) => setMobileNumber(event.target.value)}
                className="w-full rounded border-none bg-surface-container-lowest px-4 py-3 text-sm text-on-surface focus:ring-1 focus:ring-primary"
                placeholder="+91 98765 43210"
              />
            </label>
            {error ? (
              <p className="text-sm text-error" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isPending}
              className="saffron-gradient flex w-full items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-on-primary-fixed disabled:opacity-60"
            >
              <Icon name="sms" className="text-base" />
              {isPending ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={onVerifyOtp}>
            <p className="text-sm text-on-surface-variant">
              Code sent to <span className="text-on-surface">{mobileNumber}</span>
            </p>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                One-Time Password
              </span>
              <input
                required
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={challenge}
                onChange={(event) => setChallenge(event.target.value)}
                className="w-full rounded border-none bg-surface-container-lowest px-4 py-3 text-sm tracking-[0.3em] text-on-surface focus:ring-1 focus:ring-primary"
                placeholder="Enter OTP"
              />
            </label>
            {error ? (
              <p className="text-sm text-error" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isPending}
              className="saffron-gradient flex w-full items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-on-primary-fixed disabled:opacity-60"
            >
              <Icon name="login" className="text-base" />
              {isPending ? "Verifying..." : "Verify & Enter"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("mobile");
                setChallenge("");
                setError(null);
              }}
              className="w-full py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
            >
              Use a different number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
