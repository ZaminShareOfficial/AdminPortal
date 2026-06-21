"use client";

type IpoSubscriptionBarProps = {
  progress: number;
  progressLabel: string;
  dimmed?: boolean;
  testId?: string;
};

export const IpoSubscriptionBar = ({
  progress,
  progressLabel,
  dimmed = false,
  testId
}: IpoSubscriptionBarProps) => (
  <div className="space-y-1.5" data-testid={testId}>
    <div className="flex justify-between text-[10px] font-bold">
      <span>{progress}%</span>
      <span className="text-on-surface-variant">{progressLabel}</span>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-lowest">
      <div
        className={`h-full rounded-full ${progress === 100 ? "bg-tertiary" : dimmed ? "bg-outline-variant" : "bg-primary shadow-primary-glow"}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
