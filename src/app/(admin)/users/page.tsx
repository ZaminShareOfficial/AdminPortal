import { UsersContent } from "@/features/users";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { mapUserPortfolioToRow } from "@/lib/mappers/portfolio";
import { listUserPortfolios } from "@/lib/services/backend";

export default async function UsersPage() {
  try {
    const portfolios = await listUserPortfolios();
    const users = portfolios.map(mapUserPortfolioToRow);
    const pendingKyc = users.filter((user) => user.kyc === "PENDING").length;

    return (
      <UsersContent
        users={users}
        totalUsers={users.length}
        pendingKyc={pendingKyc}
      />
    );
  } catch (error) {
    await guardUnauthorized(error);
    return (
      <UsersContent
        users={[]}
        totalUsers={0}
        pendingKyc={0}
        error={getErrorMessage(error, "Could not load users from GET /portfolio.")}
      />
    );
  }
}
