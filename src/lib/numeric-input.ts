export type NumericInputOptions = {
  allowDecimal?: boolean;
  maxDecimalPlaces?: number;
  allowNegative?: boolean;
};

const formatIntegerDigits = (digits: string): string => {
  if (!digits || digits === "-") {
    return digits;
  }

  const isNegative = digits.startsWith("-");
  const absolute = isNegative ? digits.slice(1) : digits;

  if (!absolute) {
    return isNegative ? "-" : "";
  }

  const withoutLeadingZeros = absolute.replace(/^0+(?=\d)/, "") || absolute;
  const formatted = new Intl.NumberFormat("en-IN").format(
    Number(withoutLeadingZeros),
  );

  return isNegative ? `-${formatted}` : formatted;
};

export const sanitizeNumericInput = (
  value: string,
  options: NumericInputOptions = {},
): string => {
  const {
    allowDecimal = false,
    maxDecimalPlaces = 2,
    allowNegative = false
  } = options;

  const stripped = value.replace(/,/g, "");
  let result = "";
  let hasDot = false;

  for (let index = 0; index < stripped.length; index += 1) {
    const char = stripped[index];

    if (char >= "0" && char <= "9") {
      result += char;
      continue;
    }

    if (char === "-" && allowNegative && index === 0 && result.length === 0) {
      result += char;
      continue;
    }

    if (char === "." && allowDecimal && !hasDot) {
      hasDot = true;
      result += char;
    }
  }

  let normalized = result;

  if (allowDecimal && normalized.startsWith(".")) {
    normalized = `0${normalized}`;
  }

  if (
    allowDecimal &&
    maxDecimalPlaces != null &&
    normalized.includes(".")
  ) {
    const [intPart, decPart] = normalized.split(".");

    if (decPart != null && decPart.length > maxDecimalPlaces) {
      normalized = `${intPart}.${decPart.slice(0, maxDecimalPlaces)}`;
    }
  }

  return normalized;
};

export const formatNumericInputDisplay = (
  rawValue: string,
  options: NumericInputOptions = {},
): string => {
  if (!rawValue) {
    return "";
  }

  const sanitized = sanitizeNumericInput(rawValue, options);

  if (!sanitized || sanitized === "-") {
    return sanitized;
  }

  const { allowDecimal = false } = options;

  if (allowDecimal) {
    const endsWithDot = sanitized.endsWith(".");
    const [intPart = "", decPart] = sanitized.split(".");
    const formattedInt = formatIntegerDigits(intPart || "0");

    if (decPart !== undefined) {
      return `${formattedInt}.${decPart}`;
    }

    if (endsWithDot) {
      return `${formattedInt}.`;
    }
  }

  return formatIntegerDigits(sanitized);
};
