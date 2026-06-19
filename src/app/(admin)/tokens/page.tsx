import { TokensContent } from "@/components/tokens/tokens-content";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import {
  mapHolderToRow,
  summarizePropertyPortfolio,
} from "@/lib/mappers/portfolio";
import {
  getPropertyHolders,
  listPortfolioProperties,
} from "@/lib/services/backend";

export default async function TokensPage() {
  try {
    const properties = await listPortfolioProperties();

    if (properties.length === 0) {
      return (
        <TokensContent
          propertyTitle="No active property"
          propertyId="—"
          totalTokens="—"
          holderCount="0"
          largestPct="—"
          holders={[]}
        />
      );
    }

    const selected = properties[0];
    const holdersResponse = await getPropertyHolders(selected.propertyId);
    const summary = summarizePropertyPortfolio(holdersResponse);

    return (
      <TokensContent
        propertyTitle={selected.propertyTitle}
        propertyId={selected.propertyId}
        totalTokens={summary.totalTokens}
        holderCount={summary.holderCount}
        largestPct={summary.largestPct}
        holders={holdersResponse.holders.map(mapHolderToRow)}
      />
    );
  } catch (error) {
    await guardUnauthorized(error);
    return (
      <TokensContent
        propertyTitle="—"
        propertyId="—"
        totalTokens="—"
        holderCount="0"
        largestPct="—"
        holders={[]}
        error={getErrorMessage(
          error,
          "Could not load token registry from admin portfolio APIs.",
        )}
      />
    );
  }
}
