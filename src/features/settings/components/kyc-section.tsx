import type { KycStatusResponse } from "@/types/backend";

type KycSectionProps = {
  kycStatus: KycStatusResponse | null;
};

export const KycSection = ({ kycStatus }: KycSectionProps) => (
  <div className="space-y-4 rounded-lg bg-surface-container p-6">
    <h2 className="font-headline text-lg font-bold">KYC status</h2>
    <p className="text-xs text-on-surface-variant">GET /kyc</p>
    {kycStatus ? (
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-on-surface-variant">Status</dt>
          <dd className="font-semibold">{kycStatus.kycStatus ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Verification</dt>
          <dd>{kycStatus.verificationStatus ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Masked PAN</dt>
          <dd>{kycStatus.maskedPan ?? "—"}</dd>
        </div>
      </dl>
    ) : (
      <p className="text-sm text-on-surface-variant">
        KYC details are not available for this admin session.
      </p>
    )}
  </div>
);
