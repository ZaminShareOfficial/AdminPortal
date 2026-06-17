"use client";

import { Button } from "@heroui/react";
import { Icon } from "@/components/admin/icon";
import { useIpoActions } from "@/features/ipo/hooks";
import type { IpoViewRow } from "@/features/ipo/types";

type IpoInspectorPanelProps = {
  selectedIpo: IpoViewRow | null;
};

export const IpoInspectorPanel = ({ selectedIpo }: IpoInspectorPanelProps) => {
  const { actionError, isPending, pauseIpo, resumeIpo, submitMint } =
    useIpoActions();

  if (!selectedIpo) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select an IPO from the list to manage status and minting.
      </p>
    );
  }

  const canPause = selectedIpo.rawStatus === "CREATED";
  const canResume = selectedIpo.rawStatus === "PAUSED";
  const canMint =
    selectedIpo.rawStatus === "CREATED" ||
    selectedIpo.rawStatus === "PAUSED";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-headline text-xl font-bold">{selectedIpo.name}</h3>
        <p className="mt-1 text-xs text-on-surface-variant">{selectedIpo.id}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded bg-surface-container-low p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            Token supply
          </p>
          <p className="font-headline text-lg font-bold text-secondary">
            {selectedIpo.supply}
          </p>
        </div>
        <div className="rounded bg-surface-container-low p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            Token price
          </p>
          <p className="font-headline text-lg font-bold text-tertiary">
            {selectedIpo.price}
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
            onPress={() => pauseIpo(selectedIpo.ipoId)}
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
            onPress={() => resumeIpo(selectedIpo.ipoId)}
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
          onPress={() => submitMint(selectedIpo.ipoId)}
          data-testid="ipo-mint-button"
        >
          <Icon name="bolt" />
          {isPending ? "Minting..." : "Mint IPO"}
        </Button>
        <p className="text-center text-[10px] text-on-surface-variant">
          PATCH /admin/ipos/{"{ipoId}"}/status · POST /admin/ipos/{"{ipoId}"}/mint
        </p>
      </div>
    </div>
  );
};
