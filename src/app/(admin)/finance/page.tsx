import { FinanceContent } from "@/components/finance/finance-content";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { formatPaise } from "@/lib/format";
import {
  mapPortfolioToFinanceRow,
  summarizePortfolios,
} from "@/lib/mappers/portfolio";
import { listUserPortfolios } from "@/lib/services/backend";

export default async function FinancePage() {
  try {
    const portfolios = await listUserPortfolios();
    const summary = summarizePortfolios(portfolios);

    return (
      <FinanceContent
        totalInvested={formatPaise(summary.totalInvested)}
        totalCurrent={formatPaise(summary.totalCurrent)}
        netGain={formatPaise(summary.netGain)}
        investorCount={summary.investorCount}
        payouts={portfolios.map(mapPortfolioToFinanceRow)}
      />
    );
  } catch (error) {
    await guardUnauthorized(error);
    return (
      <FinanceContent
        totalInvested="—"
        totalCurrent="—"
        netGain="—"
        investorCount={0}
        payouts={[]}
        error={getErrorMessage(
          error,
          "Could not load finance data from GET /portfolio.",
        )}
      />
    );
  }
}
