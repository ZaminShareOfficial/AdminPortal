import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/cn";

const InputOTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput>) => (
  <OTPInput
    containerClassName={cn(
      "flex items-center gap-2 has-disabled:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);

const InputOTPGroup = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("flex items-center gap-1.5 sm:gap-2", className)} {...props} />
);

const InputOTPSeparator = ({ ...props }: React.ComponentProps<"div">) => (
  <div role="separator" className="text-on-surface-variant" {...props}>
    <span aria-hidden="true" className="text-sm">
      -
    </span>
  </div>
);

type InputOTPSlotProps = React.ComponentProps<"div"> & {
  index: number;
};

const InputOTPSlot = ({ index, className, ...props }: InputOTPSlotProps) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]!;

  return (
    <div
      data-active={isActive}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-md border border-outline-variant/40 bg-surface-container-lowest text-sm font-medium tabular-nums text-on-surface shadow-sm transition-all sm:size-10",
        "data-[active=true]:z-10 data-[active=true]:border-primary/50 data-[active=true]:ring-2 data-[active=true]:ring-primary/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-on-surface" />
        </div>
      ) : null}
    </div>
  );
};

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
