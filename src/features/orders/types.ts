export type SurveillanceOrderRow = {
  id: string;
  user: string;
  initials: string;
  color: string;
  property: string;
  side: "Buy" | "Sell";
  sideClass: string;
  price: string;
  qty: string;
  status: string;
  statusDot: string;
  highlighted?: boolean;
};

export type OrderFeedItem = {
  type: string;
  time: string;
  dotClass: string;
  typeClass?: string;
  glow?: boolean;
  summary: string;
};

export type OpenOrder = {
  orderId: string;
  propertyId: string;
  propertyTitle: string;
  side: "BUY" | "SELL";
  price: number | null;
  quantity: number | null;
  filledQuantity: number | null;
  remainingQuantity: number | null;
  status: "OPEN";
  createdAt?: string | null;
};

export type OrdersPageData = {
  orders: SurveillanceOrderRow[];
  feed: OrderFeedItem[];
  openOrderCount: number;
  error: string | null;
};

export type OrdersContentProps = {
  orders: SurveillanceOrderRow[];
  feed: OrderFeedItem[];
  openOrderCount: number;
  error?: string | null;
};
