"use client";

import { FinanceContent } from "@/components/finance/finance-content";
import { useFinancePageData } from "@/components/finance/hooks";

export const FinancePageContent = () => {
  const {
    totalInvested,
    totalCurrent,
    netGain,
    investorCount,
    payouts,
    error,
    isLoading
  } = useFinancePageData();

  if (isLoading) {
    return (
      <div
        className="flex flex-1 items-center justify-center text-on-surface-variant"
        data-testid="finance-loading"
      >
        Loading finance data…
      </div>
    );
  }

  return (
    <FinanceContent
      totalInvested={totalInvested}
      totalCurrent={totalCurrent}
      netGain={netGain}
      investorCount={investorCount}
      payouts={payouts}
      error={error}
    />
  );
};
