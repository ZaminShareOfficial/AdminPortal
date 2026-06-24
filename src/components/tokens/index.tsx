"use client";

import { TokensContent } from "@/components/tokens/tokens-content";
import { useTokensPageData } from "@/components/tokens/hooks";

export const TokensPageContent = () => {
  const {
    propertyTitle,
    propertyId,
    totalTokens,
    holderCount,
    largestPct,
    holders,
    error,
    isLoading
  } = useTokensPageData();

  if (isLoading) {
    return (
      <div
        className="flex flex-1 items-center justify-center text-on-surface-variant"
        data-testid="tokens-loading"
      >
        Loading token registry…
      </div>
    );
  }

  return (
    <TokensContent
      propertyTitle={propertyTitle}
      propertyId={propertyId}
      totalTokens={totalTokens}
      holderCount={holderCount}
      largestPct={largestPct}
      holders={holders}
      error={error}
    />
  );
};
