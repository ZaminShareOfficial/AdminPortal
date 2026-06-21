import { SettingsContent } from "@/features/settings";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { getKycStatus, getProfile } from "@/lib/services/backend";

export default async function SettingsPage() {
  try {
    const [profile, kycStatus] = await Promise.all([
      getProfile(),
      getKycStatus().catch(() => null)
    ]);

    return <SettingsContent profile={profile} kycStatus={kycStatus} />;
  } catch (error) {
    await guardUnauthorized(error);
    return (
      <SettingsContent
        profile={null}
        kycStatus={null}
        error={getErrorMessage(error, "Could not load settings data.")}
      />
    );
  }
}
