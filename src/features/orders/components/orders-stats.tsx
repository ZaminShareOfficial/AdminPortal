type OrdersStatsProps = {
  openOrderCount: number;
  feedItemCount: number;
};

export function OrdersStats({ openOrderCount, feedItemCount }: OrdersStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-4 bg-surface-container-low p-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
          Open Orders
        </span>
        <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">
          {openOrderCount}
        </div>
      </div>
      <div className="flex flex-col gap-1 bg-surface-container-low p-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
          Feed Items
        </span>
        <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">
          {feedItemCount}
        </div>
        <p className="mt-1 text-[10px] font-medium text-on-surface-variant">
          From live order book
        </p>
      </div>
      <div className="flex flex-col gap-1 bg-surface-container-low p-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
          Order Liquidity
        </span>
        <div className="mt-2 font-headline text-3xl font-extrabold text-on-surface">
          {openOrderCount}
          <span className="ml-1 text-lg font-medium text-on-surface-variant">
            Orders
          </span>
        </div>
        <p className="mt-1 text-[10px] font-medium text-on-surface-variant">
          Open market orders
        </p>
      </div>
    </div>
  );
}
