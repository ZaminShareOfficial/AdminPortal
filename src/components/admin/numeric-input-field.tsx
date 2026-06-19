"use client";

import { Input, Label, TextField } from "@heroui/react";
import {
  formatNumericInputDisplay,
  sanitizeNumericInput,
  type NumericInputOptions
} from "@/lib/numeric-input";

type NumericInputFieldProps = NumericInputOptions & {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  testId?: string;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-error" role="alert">
      {message}
    </p>
  ) : null;

export const NumericInputField = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  isRequired,
  isInvalid,
  errorMessage,
  testId,
  allowDecimal = false,
  maxDecimalPlaces = 2,
  allowNegative = false
}: NumericInputFieldProps) => {
  const inputOptions = { allowDecimal, maxDecimalPlaces, allowNegative };
  const displayValue = formatNumericInputDisplay(value, inputOptions);

  const handleChange = (input: string) => {
    onChange(sanitizeNumericInput(input, inputOptions));
  };

  return (
    <TextField
      name={name}
      isRequired={isRequired}
      value={displayValue}
      onChange={handleChange}
      isInvalid={isInvalid}
    >
      <Label>{label}</Label>
      <Input
        data-testid={testId}
        placeholder={placeholder}
        inputMode={allowDecimal ? "decimal" : "numeric"}
      />
      <FieldError message={errorMessage} />
    </TextField>
  );
};
