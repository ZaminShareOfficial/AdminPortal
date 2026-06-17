type OrdersHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function OrdersHeader({
  title = "Order Surveillance",
  subtitle = "Market Monitoring",
}: OrdersHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
          {subtitle}
        </span>
        <h1 className="font-headline text-3xl font-extrabold leading-tight text-on-surface">
          {title}
        </h1>
      </div>
      <div className="flex rounded bg-surface-container-low p-1">
        <button
          type="button"
          className="rounded bg-surface-container-high px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary"
        >
          Real-time
        </button>
        <button
          type="button"
          className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant"
        >
          History
        </button>
      </div>
    </div>
  );
}
