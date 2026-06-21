export function formatInr(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: value >= 1_000_000 ? 1 : 2,
    notation: value >= 1_000_000 ? "compact" : "standard"
  }).format(value);
}

/** Backend monetary fields are stored in paise (1/100 of currency unit). */
export function formatPaise(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }

  return formatInr(value / 100);
}

export function formatPercent(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }

  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

/** Parse an INR input string into backend paise (1/100 currency unit). */
export function parseInrToPaise(value: string): number | null {
  const normalized = value.replace(/[^0-9.]/g, "");
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return Math.round(parsed * 100);
}

export function paiseToInrInput(value: number | null | undefined) {
  if (value == null) {
    return "";
  }

  return String(value / 100);
}

export function parseInrInput(value: string): number | null {
  const normalized = value.replace(/[^0-9.]/g, "");
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
}

export function formatRelativeTime(value: string | null | undefined) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  const diffMs = date.getTime() - Date.now();
  const absMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (absMs < 60_000) {
    return rtf.format(Math.round(diffMs / 1000), "second");
  }
  if (absMs < 3_600_000) {
    return rtf.format(Math.round(diffMs / 60_000), "minute");
  }
  if (absMs < 86_400_000) {
    return rtf.format(Math.round(diffMs / 3_600_000), "hour");
  }

  return rtf.format(Math.round(diffMs / 86_400_000), "day");
}
