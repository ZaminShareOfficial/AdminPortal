"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";

import { AuthErrorBanner } from "@/components/auth/auth-error-banner";
import { MobileNumberField } from "@/components/auth/mobile-number-field";
import { OtpCodeField } from "@/components/auth/otp-code-field";
import { AUTH, LOGIN_STEP_COPY } from "@/constants/auth";
import { DEFAULT_COUNTRY_ISO } from "@/constants/countries";
import {
  persistSession,
  sendAdminOtp,
  verifyAdminOtp
} from "@/lib/auth/auth-service";
import {
  buildE164MobileNumber,
  INVALID_MOBILE_NUMBER_MESSAGE,
  isValidE164MobileNumber
} from "@/lib/phone";

type Step = keyof typeof LOGIN_STEP_COPY;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("mobile");
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [localNumber, setLocalNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState<string | undefined>();
  const [sessionId, setSessionId] = useState("");
  const [challenge, setChallenge] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const redirectTo = searchParams.get("from") || "/";
  const fullMobileNumber = useMemo(
    () => buildE164MobileNumber(countryIso, localNumber),
    [countryIso, localNumber]
  );

  const onSendOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isValidE164MobileNumber(fullMobileNumber)) {
      setMobileError(INVALID_MOBILE_NUMBER_MESSAGE);
      return;
    }

    setMobileError(undefined);

    startTransition(async () => {
      try {
        const response = await sendAdminOtp(fullMobileNumber);
        setMobileNumber(fullMobileNumber);
        setSessionId(response.sessionId);
        setChallenge("");
        setStep("otp");
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Could not send the code."
        );
      }
    });
  };

  const onVerifyOtp = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await verifyAdminOtp({
          sessionId,
          mobileNumber,
          challenge: challenge.trim()
        });
        await persistSession(response.token);
        router.replace(redirectTo);
        router.refresh();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "OTP verification failed."
        );
      }
    });
  };

  const handleOtpComplete = () => {
    if (challenge.length === AUTH.OTP_LENGTH) {
      onVerifyOtp();
    }
  };

  const goBackToMobile = () => {
    setStep("mobile");
    setChallenge("");
    setError(null);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-sm rounded-md border border-outline-variant/20 bg-surface-container text-on-surface shadow-2xl"
        data-testid="login-card"
      >
        <div className="space-y-1.5 p-5">
          <h1 className="text-lg font-medium tracking-tight">Sign in</h1>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {LOGIN_STEP_COPY[step]}
          </p>
        </div>

        <div className="p-5 pt-0">
          {step === "mobile" ? (
            <form className="flex flex-col gap-5" onSubmit={onSendOtp}>
              <MobileNumberField
                countryIso={countryIso}
                localNumber={localNumber}
                onCountryChange={setCountryIso}
                onLocalNumberChange={(value) => {
                  setLocalNumber(value);
                  if (mobileError) {
                    setMobileError(undefined);
                  }
                }}
                error={mobileError}
                disabled={isPending}
              />

              {error ? <AuthErrorBanner message={error} /> : null}

              <Button
                type="submit"
                variant="primary"
                className="saffron-gradient w-full text-sm font-medium text-on-primary-fixed"
                isDisabled={isPending}
                data-testid="login-send-otp-button"
              >
                {isPending ? "Sending…" : "Send OTP"}
              </Button>
            </form>
          ) : null}

          {step === "otp" ? (
            <form className="flex flex-col gap-5" onSubmit={onVerifyOtp}>
              <p className="text-sm text-on-surface-variant">
                Code sent to{" "}
                <span className="text-on-surface">{mobileNumber}</span>
              </p>

              <OtpCodeField
                id="login-challenge"
                value={challenge}
                onChange={setChallenge}
                error={undefined}
                disabled={isPending}
                onComplete={handleOtpComplete}
              />

              {error ? <AuthErrorBanner message={error} /> : null}

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="saffron-gradient w-full text-sm font-medium text-on-primary-fixed"
                  isDisabled={isPending}
                  data-testid="login-verify-button"
                >
                  {isPending ? "Signing in…" : "Sign in"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full text-sm font-medium"
                  isDisabled={isPending}
                  onPress={goBackToMobile}
                  data-testid="login-back-button"
                >
                  Back
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};
