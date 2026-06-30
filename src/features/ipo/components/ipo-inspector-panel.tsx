"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { useOverlayState } from "@heroui/react";
import { Icon } from "@/components/admin/icon";
import type { IpoActions } from "@/features/ipo/use-ipo-actions";
import { canFailIpo, canMintIpo, getIpoToggleTarget } from "@/features/ipo/utils";
import { FailIpoModal } from "@/features/ipo/components/fail-ipo-modal";
import { IpoSubscriptionBar } from "@/features/ipo/components/ipo-subscription-bar";
import { mapIpoDetailMetadata, mapIpoToRow } from "@/lib/mappers/ipo";
import type {
  IpoDetailResponse,
  IpoSubscriptionSummaryResponse,
  IpoSummaryResponse
} from "@/types/backend";

const placeholderImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu1lg4swJwDIAlT-bJscsUntDuZgsX4bx-xwlAP87m1nYpEiXjOlk3SHwdhtfG71K9s8zDXsE-6oi4LmiJt6wwRIMJZjYP-f5ZjAEOALLKA4ysoWI3HVbBgguLrkJc86iZ3Utaw7Gj0qRtNpbNWgqWA44_Yl_SviHd2Bngw1W7cALociJLNDYPUyE365lIc5YLUHxqXXIcJWktcTmStfDcTbMjeDh47Nz6qu7Zt_vyfNJ3EzY-_e2x-yvALF6RSk1qTp54fHjYFm8J";

type IpoInspectorPanelProps = {
  ipo: IpoSummaryResponse | null;
  ipoDetail: IpoDetailResponse | null;
  isDetailLoading: boolean;
  detailError: string | null;
  subscription: IpoSubscriptionSummaryResponse | null | undefined;
  isSubscriptionLoading: boolean;
  ipoActions: IpoActions;
};

export const IpoInspectorPanel = ({
  ipo,
  ipoDetail,
  isDetailLoading,
  detailError,
  subscription,
  isSubscriptionLoading,
  ipoActions
}: IpoInspectorPanelProps) => {
  const failModal = useOverlayState();
  const {
    statusActionError,
    isStatusPending,
    isMintPending,
    submitStatusToggle,
    submitMint,
    submitFail,
    clearStatusActionError
  } = ipoActions;

  if (!ipo) {
    return (
      <p className="text-sm text-on-surface-variant">
        Select an IPO from the list to inspect details.
      </p>
    );
  }

  const row = mapIpoToRow(ipo, subscription, isSubscriptionLoading);
  const detailMetadata = ipoDetail ? mapIpoDetailMetadata(ipoDetail) : [];
  const toggleTarget = getIpoToggleTarget(ipo.status);
  const isPaused = ipo.status === "PAUSED";
  const canToggle = toggleTarget != null;
  const canMint = canMintIpo(ipo.status);
  const canFail = canFailIpo(ipo.status);

  const handleToggle = () => {
    clearStatusActionError();
    submitStatusToggle(ipo.ipoId, ipo.status);
  };

  const handleMint = () => {
    clearStatusActionError();
    submitMint(ipo.ipoId, ipo.status);
  };

  const handleFailConfirm = () => {
    clearStatusActionError();
    submitFail(ipo.ipoId, ipo.status, () => failModal.close());
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 overflow-hidden rounded">
            <Image
              src={placeholderImage}
              alt={row.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-xl font-bold leading-none">
              {row.name}
            </h3>
            <p className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant">
              <Icon name="location_on" className="text-[14px]" />
              {row.location}
            </p>
          </div>
        </div>

        {isDetailLoading ? (
          <p
            className="text-xs text-on-surface-variant"
            data-testid="ipo-detail-loading"
          >
            Loading IPO details...
          </p>
        ) : null}

        {detailError ? (
          <p className="text-sm text-error" role="alert" data-testid="ipo-detail-error">
            {detailError}
          </p>
        ) : null}

        {detailMetadata.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {detailMetadata.map((item) => (
              <div
                key={item.testId}
                className="rounded bg-surface-container-low p-3"
              >
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {item.label}
                </p>
                <p
                  className="break-all text-sm font-medium text-on-surface"
                  data-testid={item.testId}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded bg-surface-container-low p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              Token Supply
            </p>
            <p className="font-headline text-lg font-bold text-secondary">
              {row.supply}
            </p>
          </div>
          <div className="rounded bg-surface-container-low p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              Token Price
            </p>
            <p className="font-headline text-lg font-bold text-tertiary">
              {row.price}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded bg-surface-container-low p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              Start Time
            </p>
            <p className="text-sm font-medium text-on-surface">{row.startTime}</p>
          </div>
          <div className="rounded bg-surface-container-low p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              End Time
            </p>
            <p className="text-sm font-medium text-on-surface">{row.endTime}</p>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Subscription
          </p>
          <IpoSubscriptionBar
            progress={row.progress}
            progressLabel={row.progressLabel}
            dimmed={row.dimmed}
            testId="ipo-inspector-subscription"
          />
        </div>
        <div className="space-y-3 border-t border-outline-variant/10 pt-4">
          <Button
            variant="secondary"
            className="flex w-full items-center justify-center gap-2 py-3 text-xs font-bold"
            isDisabled={!canToggle || isStatusPending}
            onPress={handleToggle}
            data-testid="ipo-toggle-subscription"
          >
            <Icon
              name={isPaused ? "play_circle" : "pause_circle"}
              className="text-primary"
            />
            {isStatusPending
              ? "Updating..."
              : isPaused
                ? "Resume Subscription"
                : "Pause Subscription"}
          </Button>
          <Button
            variant="primary"
            className="flex w-full items-center justify-center gap-2 py-3 text-xs font-bold"
            isDisabled={!canMint || isMintPending || isStatusPending}
            onPress={handleMint}
            data-testid="ipo-trigger-go-live"
          >
            <Icon name="bolt" />
            {isMintPending ? "Minting..." : "Trigger Go-Live"}
          </Button>
          <Button
            variant="secondary"
            className="flex w-full items-center justify-center gap-2 border border-error/20 py-3 text-xs font-bold text-error"
            isDisabled={!canFail || isStatusPending || isMintPending}
            onPress={failModal.open}
            data-testid="ipo-fail-trigger"
          >
            <Icon name="cancel" className="text-error" />
            Fail IPO
          </Button>
          <p className="text-center text-[10px] italic text-on-surface-variant">
            Unsubscribed tokens are allotted to the company wallet.
          </p>
          {statusActionError ? (
            <p className="text-sm text-error" role="alert">
              {statusActionError}
            </p>
          ) : null}
        </div>
      </div>

      <FailIpoModal
        isOpen={failModal.isOpen}
        onOpenChange={failModal.setOpen}
        ipoId={ipo.ipoId}
        isFailing={isStatusPending}
        onConfirm={handleFailConfirm}
      />
    </>
  );
};
