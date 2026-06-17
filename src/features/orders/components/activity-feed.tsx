import { Button } from "@heroui/react";
import { Icon } from "@/components/admin/icon";
import type { OrderFeedItem } from "@/features/orders/types";

type ActivityFeedProps = {
  feed: OrderFeedItem[];
};

export function ActivityFeed({ feed }: ActivityFeedProps) {
  return (
    <aside className="flex w-80 shrink-0 flex-col overflow-hidden border-l border-outline-variant/10 bg-surface-container-lowest">
      <div className="border-b border-outline-variant/10 p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface">
          Live Activity Feed
        </h2>
        <p className="mt-1 text-[10px] text-on-surface-variant">
          Real-time surveillance stream
        </p>
      </div>
      <div className="hide-scrollbar flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {feed.length === 0 ? (
            <p className="text-xs text-on-surface-variant">
              No live order activity yet.
            </p>
          ) : (
            feed.map((item) => (
              <div
                key={item.time + item.type}
                className="relative border-l border-outline-variant/10 pb-6 pl-6"
              >
                <span
                  className={`absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[3px] rounded-full ${item.dotClass}${item.glow ? " shadow-primary-glow-strong" : ""}`}
                />
                <div className="mb-1 flex items-start justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase ${item.typeClass ?? "text-on-surface"}`}
                  >
                    {item.type}
                  </span>
                  <span className="font-mono text-[9px] text-on-surface-variant">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  {item.summary}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bg-surface-container-low/50 p-4">
        <Button
          type="button"
          variant="primary"
          className="w-full text-[10px] font-bold uppercase tracking-widest"
          data-testid="export-activity-log"
        >
          <Icon name="download" className="text-sm" />
          Export Activity Log
        </Button>
      </div>
    </aside>
  );
}
