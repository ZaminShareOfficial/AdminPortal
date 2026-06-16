export function formatUsd(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1_000_000 ? 1 : 2,
    notation: value >= 1_000_000 ? "compact" : "standard",
  }).format(value);
}

/** Backend monetary fields are stored in paise (1/100 of currency unit). */
export function formatPaise(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }

  return formatUsd(value / 100);
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

  return new Intl.NumberFormat("en-US").format(value);
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
