"use client";

import { Button } from "@heroui/react";
import { Icon } from "@/components/admin/icon";
import type { IpoActions } from "@/features/ipo/hooks";
import type { IpoStatus } from "@/types/backend";

type IpoInspectorPanelProps = {
  ipoId: string | null;
  name: string | null;
  displayId: string | null;
  supply: string | null;
  price: string | null;
  rawStatus: IpoStatus | null;
  ipoActions: IpoActions;
};

export const IpoInspectorPanel = ({
  ipoId,
  name,
  displayId,
  supply,
  price,
  rawStatus,
  ipoActions
}: IpoInspectorPanelProps) => {
  const { actionError, isPending, pauseIpo, resumeIpo, submitMint } = ipoActions;

  if (!ipoId || !name || !rawStatus) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select an IPO from the list to manage status and minting.
      </p>
    );
  }

  const canPause = rawStatus === "CREATED";
  const canResume = rawStatus === "PAUSED";
  const canMint = rawStatus === "CREATED" || rawStatus === "PAUSED";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-headline text-xl font-bold">{name}</h3>
        <p className="mt-1 text-xs text-on-surface-variant">{displayId}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded bg-surface-container-low p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            Token supply
          </p>
          <p className="font-headline text-lg font-bold text-secondary">
            {supply}
          </p>
        </div>
        <div className="rounded bg-surface-container-low p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            Token price
          </p>
          <p className="font-headline text-lg font-bold text-tertiary">
            {price}
          </p>
        </div>
      </div>

      {actionError ? (
        <p className="text-sm text-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className="space-y-3 border-t border-outline-variant/10 pt-4">
        {canPause ? (
          <Button
            variant="secondary"
            className="w-full"
            isDisabled={isPending}
            onPress={() => pauseIpo(ipoId)}
            data-testid="ipo-pause-button"
          >
            <Icon name="pause_circle" className="text-primary" />
            Pause subscription
          </Button>
        ) : null}
        {canResume ? (
          <Button
            variant="secondary"
            className="w-full"
            isDisabled={isPending}
            onPress={() => resumeIpo(ipoId)}
            data-testid="ipo-resume-button"
          >
            <Icon name="play_circle" className="text-primary" />
            Resume subscription
          </Button>
        ) : null}
        <Button
          variant="primary"
          className="w-full"
          isDisabled={isPending || !canMint}
          onPress={() => submitMint(ipoId)}
          data-testid="ipo-mint-button"
        >
          <Icon name="bolt" />
          {isPending ? "Minting..." : "Mint IPO"}
        </Button>
      </div>
    </div>
  );
};
