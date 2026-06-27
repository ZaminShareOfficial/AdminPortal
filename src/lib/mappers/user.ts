import type { AdminUserSummaryResponse, ProfileResponse } from "@/types/backend";
import { formatDateTime } from "@/lib/format";

type KycStatus = NonNullable<ProfileResponse["kycStatus"]>;
type AccountStatus = NonNullable<ProfileResponse["status"]>;

export type AdminUserRow = {
  id: string;
  displayId: string;
  initials: string;
  name: string;
  kyc: string;
  kycClass: string;
  status: string;
  statusClass: string;
  joinedAt: string;
};

const kycStatusClass: Record<KycStatus, string> = {
  PENDING: "border-primary/30 bg-primary-container/20 text-primary",
  APPROVED: "border-tertiary/20 bg-tertiary/10 text-tertiary",
  REJECTED: "border-error/20 bg-error/10 text-error"
};

const accountStatusClass: Record<AccountStatus, string> = {
  PENDING_PROFILE: "border-primary/30 bg-primary-container/20 text-primary",
  ACTIVE: "border-tertiary/20 bg-tertiary/10 text-tertiary",
  DELETED: "border-error/20 bg-error/10 text-error"
};

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatName = (user: AdminUserSummaryResponse) => {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || "Unknown user";
};

export const mapAdminUserToRow = (user: AdminUserSummaryResponse): AdminUserRow => {
  const name = formatName(user);
  const kyc = user.kycStatus ?? "PENDING";
  const status = user.status ?? "PENDING_PROFILE";

  return {
    id: user.id,
    displayId: `#USR-${user.id.slice(0, 8).toUpperCase()}`,
    initials: initialsFromName(name),
    name,
    kyc,
    kycClass: kycStatusClass[kyc],
    status,
    statusClass: accountStatusClass[status],
    joinedAt: formatDateTime(user.createdAt)
  };
};
