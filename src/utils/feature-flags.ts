const _FEATURE_FLAG_CONFIG: Record<string, string> = {
  ORDERS_V2: process.env.NEXT_PUBLIC_IS_ORDERS_V2_VISIBLE || "false",
};

function parseBooleanFlag(value: string | undefined): boolean {
  return value === "true" || value === "1";
}

export const FEATURE_FLAG = Object.fromEntries(
  Object.entries(_FEATURE_FLAG_CONFIG).map(([key, value]) => [
    key,
    parseBooleanFlag(value),
  ]),
) as Record<keyof typeof _FEATURE_FLAG_CONFIG, boolean>;

export const isOrdersV2Enabled = (
  tenantId: string | number | null | undefined,
): boolean => {
  const allowedTenants = process.env.NEXT_PUBLIC_ORDERS_V2_VISIBLE_TENANTS;
  if (!allowedTenants) {
    return false;
  }
  if (!tenantId) {
    return false;
  }
  const allowedTenantIds = allowedTenants.split(",").map((id) => id.trim());
  return allowedTenantIds.includes(String(tenantId));
};
