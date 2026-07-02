"use client";

import { Suspense } from "react";
import { TokensPageContent } from "@/components/tokens";

export default function TokensPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex flex-1 items-center justify-center text-on-surface-variant"
          data-testid="tokens-loading"
        >
          Loading token registry…
        </div>
      }
    >
      <TokensPageContent />
    </Suspense>
  );
}
