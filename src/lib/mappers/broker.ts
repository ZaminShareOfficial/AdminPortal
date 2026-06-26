import type {
  AdminBrokerSummaryResponse,
  BrokerKycStatus,
  BrokerOnboardingStatus
} from "@/types/backend";
import { formatDateTime } from "@/lib/format";

export type BrokerRow = {
  id: string;
  userId: string;
  initials: string;
  name: string;
  company: string;
  contact: string;
  kyc: string;
  kycClass: string;
  onboarding: string;
  onboardingClass: string;
  submittedAt: string;
  mobileNumber: string;
};

const kycStatusClass: Record<BrokerKycStatus, string> = {
  PENDING: "border-primary/30 bg-primary-container/20 text-primary",
  APPROVED: "border-tertiary/20 bg-tertiary/10 text-tertiary",
  REJECTED: "border-error/20 bg-error/10 text-error"
};

const onboardingStatusClass: Record<BrokerOnboardingStatus, string> = {
  PROFILE_PENDING: "border-primary/30 bg-primary-container/20 text-primary",
  APPROVED: "border-secondary/20 bg-secondary/10 text-secondary",
  AGREEMENT_SIGNED: "border-tertiary/20 bg-tertiary/10 text-tertiary",
  ACTIVE: "border-tertiary/20 bg-tertiary/10 text-tertiary",
  REJECTED: "border-error/20 bg-error/10 text-error"
};

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatContact = (
  mobileNumber?: string | null,
  email?: string | null,
) => {
  if (mobileNumber && email) {
    return `${mobileNumber} · ${email}`;
  }

  return mobileNumber ?? email ?? "—";
};

export const mapBrokerSummaryToRow = (
  broker: AdminBrokerSummaryResponse,
): BrokerRow => {
  const name = broker.brokerName || "Unknown broker";
  const kyc = broker.kycStatus ?? "PENDING";
  const onboarding = broker.onboardingStatus ?? "PROFILE_PENDING";

  return {
    id: `#BRK-${broker.brokerId.slice(0, 8).toUpperCase()}`,
    userId: broker.userId,
    initials: initialsFromName(name),
    name,
    company: broker.companyName ?? "—",
    contact: formatContact(broker.mobileNumber, broker.email),
    kyc,
    kycClass: kycStatusClass[kyc],
    onboarding,
    onboardingClass: onboardingStatusClass[onboarding],
    submittedAt: formatDateTime(broker.submittedAt),
    mobileNumber: broker.mobileNumber ?? ""
  };
};
