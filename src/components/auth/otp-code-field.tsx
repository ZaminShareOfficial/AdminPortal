"use client";

import { useEffect, useRef } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Label } from "@heroui/react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { AUTH } from "@/constants/auth";
import { cn } from "@/lib/cn";

const normalizeOtp = (value: string) =>
  value.replace(/\D/g, "").slice(0, AUTH.OTP_LENGTH);

type OtpCodeFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  id?: string;
  error?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  onComplete?: () => void;
};

export const OtpCodeField = ({
  value,
  onChange,
  onBlur,
  label = "OTP code",
  id = "otp-code",
  error,
  autoFocus = true,
  disabled,
  className,
  onComplete
}: OtpCodeFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect justified: DOM API — focus OTP input after step transition for keyboard entry
  useEffect(() => {
    if (!autoFocus || disabled) {
      return;
    }

    const timer = window.setTimeout(() => {
      const input = containerRef.current?.querySelector("input");
      input?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [autoFocus, disabled]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div ref={containerRef} className="flex justify-center sm:justify-start">
        <InputOTP
          id={id}
          maxLength={AUTH.OTP_LENGTH}
          pattern={REGEXP_ONLY_DIGITS}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus={autoFocus}
          disabled={disabled}
          value={value}
          pasteTransformer={normalizeOtp}
          onChange={(nextValue) => onChange(normalizeOtp(nextValue))}
          onBlur={onBlur}
          onComplete={onComplete}
          containerClassName="w-full justify-center sm:justify-start"
          data-testid="otp-code-input"
        >
          <InputOTPGroup>
            {Array.from({ length: 3 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {Array.from({ length: 3 }).map((_, index) => (
              <InputOTPSlot key={index + 3} index={index + 3} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p className="text-sm text-error">{error ?? " "}</p>
    </div>
  );
};
