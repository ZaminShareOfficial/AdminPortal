export type PropertyStatus =
  | "DRAFT"
  | "APPROVED"
  | "IPO_OPEN"
  | "IPO_PAUSE"
  | "IPO_CLOSED"
  | "TRADING";

export type PropertyResponse = {
  id: string;
  title: string;
  location: string;
  valuation: number | null;
  tokenSupply: number | null;
  tokenPrice: number | null;
  status: PropertyStatus;
  photos?: string[] | null;
  documents?: string[] | null;
  coordinates?: PropertyCoordinates | null;
  listingBroker?: string | null;
  promoterBroker?: string | null;
  propertyType?: string | null;
};

export type OrderSide = "BUY" | "SELL";
export type OrderType = "LIMIT" | "MARKET";
export type OrderStatus = "OPEN" | "PARTIAL" | "FILLED" | "CANCELLED";

export type OrderResponse = {
  orderId: string;
  propertyId: string;
  side: OrderSide;
  type: OrderType;
  price: number | null;
  quantity: number | null;
  filledQuantity: number | null;
  remainingQuantity: number | null;
  status: OrderStatus;
  mandateId?: string | null;
  createdAt?: string | null;
};

export type BulletinBoardEntryResponse = {
  propertyId: string;
  propertyTitle: string;
  bestBid: number | null;
  bestAsk: number | null;
  openBuyCount: number | null;
  openSellCount: number | null;
};

export type PropertyOrderBookResponse = {
  propertyId: string;
  propertyTitle: string;
  bids: PropertyOrderBookLevel[];
  asks: PropertyOrderBookLevel[];
};

export type PropertyOrderBookLevel = {
  orderId: string;
  price: number | null;
  quantity: number | null;
  filledQuantity: number | null;
  createdAt?: string | null;
};

export type IpoStatus = "CREATED" | "PAUSED" | "MINTED" | "FAILED";

export type IpoSummaryResponse = {
  ipoId: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  status: IpoStatus;
  tokenPrice: number | null;
  totalTokens: number | null;
  startTime?: string | null;
  endTime?: string | null;
};

export type SendOtpResponse = {
  sessionId: string;
};

export type VerifyOtpResponse = {
  token: string;
  newUser?: boolean;
};

export type ProfileResponse = {
  id?: string;
  mobileNumber?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  referral?: string | null;
  role?: "USER" | "ADMIN" | "BROKER";
  kycStatus?: "PENDING" | "APPROVED" | "REJECTED";
  status?: "PENDING_PROFILE" | "ACTIVE" | "DELETED";
};

export type PortfolioHoldingResponse = {
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  tokenQuantity: number | null;
  investedAmount: number | null;
  currentAmount: number | null;
  returnsPercentage: number | null;
};

export type UserPortfolioResponse = {
  userId: string;
  userName: string;
  totalInvestedAmount: number | null;
  totalCurrentAmount: number | null;
  totalReturnsPercentage: number | null;
  holdings: PortfolioHoldingResponse[];
};

export type PropertyPortfolioSummaryResponse = {
  propertyId: string;
  propertyTitle: string;
  totalTokens: number | null;
  ipoPrice: number | null;
  currentPrice: number | null;
  returnsPercentage: number | null;
  holderCount: number | null;
};

export type PropertyHolderResponse = {
  userId: string;
  userName: string;
  tokenQuantity: number | null;
  percentageHolding: number | null;
  investedAmount: number | null;
  currentAmount: number | null;
};

export type PropertyHoldersResponse = {
  propertyId: string;
  propertyTitle: string;
  totalTokens: number | null;
  ipoPrice: number | null;
  currentPrice: number | null;
  holders: PropertyHolderResponse[];
};

export type IpoDetailResponse = {
  id: string;
  propertyId: string;
  status: IpoStatus;
  tokenPrice: number | null;
  totalTokens: number | null;
  subscribedTokens?: number | null;
  startTime?: string | null;
  endTime?: string | null;
};

export type CreateIpoRequest = {
  propertyId: string;
  startTime: string;
  endTime: string;
};

export type CreateIpoResponse = {
  propertyId: string;
  ipoId: string;
  status: IpoStatus;
};

export type UpdateIpoStatusRequest = {
  status: IpoStatus;
};

export type IpoStatusResponse = {
  ipoId: string;
  status: IpoStatus;
};

export type MintIpoResponse = {
  ipoId: string;
  status: IpoStatus;
  totalTokens: number | null;
  allottedSubscribers: number | null;
  refundedSubscribers: number | null;
};

export type IpoSubscriptionSummaryResponse = {
  ipoId: string;
  totalTokens: number;
  subscribedTokens: number;
  subscriptionPercent: number;
};

export type PropertyType =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "AGRICULTURE"
  | "PLOT";

export type PropertyCoordinates = {
  latitude: number;
  longitude: number;
};

export type CreatePropertyRequest = {
  title: string;
  location: string;
  valuation: number;
  tokenSupply: number;
  tokenPrice: number;
  photos?: string[];
  coordinates?: PropertyCoordinates;
  documents?: string[];
  listingBroker?: string;
  promoterBroker?: string;
  propertyType?: PropertyType;
  status?: PropertyStatus;
};

export type UpdatePropertyRequest = Partial<CreatePropertyRequest>;
