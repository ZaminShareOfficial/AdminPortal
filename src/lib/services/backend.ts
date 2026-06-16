import type {
  BulletinBoardEntryResponse,
  IpoDetailResponse,
  IpoSummaryResponse,
  ProfileResponse,
  PropertyHoldersResponse,
  PropertyOrderBookResponse,
  PropertyPortfolioSummaryResponse,
  PropertyResponse,
  UserPortfolioResponse,
} from "@/types/backend";
import { apiFetch } from "@/lib/api/server-client";

export function getProfile() {
  return apiFetch<ProfileResponse>("/me");
}

export function listProperties() {
  return apiFetch<PropertyResponse[]>("/properties");
}

export function getProperty(id: string) {
  return apiFetch<PropertyResponse>(`/properties/${id}`);
}

export function listIpos(params?: { active?: boolean }) {
  const search = new URLSearchParams();
  if (params?.active) {
    search.set("active", "true");
  }
  const query = search.toString();
  return apiFetch<IpoSummaryResponse[]>(`/ipos${query ? `?${query}` : ""}`);
}

export function getIpo(ipoId: string) {
  return apiFetch<IpoDetailResponse>(`/ipos/${ipoId}`);
}

export function listUserPortfolios() {
  return apiFetch<UserPortfolioResponse[]>("/portfolio");
}

export function listPortfolioProperties() {
  return apiFetch<PropertyPortfolioSummaryResponse[]>(
    "/admin/portfolio/properties",
  );
}

export function getPropertyHolders(propertyId: string) {
  return apiFetch<PropertyHoldersResponse>(
    `/admin/portfolio/properties/${propertyId}`,
  );
}

export function getBulletinBoard() {
  return apiFetch<BulletinBoardEntryResponse[]>("/orders/all");
}

export function getPropertyOrderBook(propertyId: string) {
  return apiFetch<PropertyOrderBookResponse>(
    `/properties/${propertyId}/orderbook`,
  );
}

export async function listOpenOrders() {
  const bulletin = await getBulletinBoard();
  const active = bulletin.filter(
    (entry) =>
      (entry.openBuyCount ?? 0) > 0 || (entry.openSellCount ?? 0) > 0,
  );

  const books = await Promise.all(
    active.map((entry) => getPropertyOrderBook(entry.propertyId)),
  );

  return books.flatMap((book) => {
    const mapLevel = (
      side: "BUY" | "SELL",
      level: PropertyOrderBookResponse["bids"][number],
    ) => ({
      orderId: level.orderId,
      propertyId: book.propertyId,
      propertyTitle: book.propertyTitle,
      side,
      price: level.price,
      quantity: level.quantity,
      filledQuantity: level.filledQuantity,
      remainingQuantity:
        level.quantity != null && level.filledQuantity != null
          ? level.quantity - level.filledQuantity
          : level.quantity,
      status: "OPEN" as const,
      createdAt: level.createdAt,
    });

    return [
      ...book.bids.map((level) => mapLevel("BUY", level)),
      ...book.asks.map((level) => mapLevel("SELL", level)),
    ];
  });
}

export async function loadDashboardData() {
  const [properties, ipos, openOrders, portfolioProperties, userPortfolios] =
    await Promise.all([
      listProperties(),
      listIpos({ active: true }),
      listOpenOrders(),
      listPortfolioProperties(),
      listUserPortfolios(),
    ]);

  return { properties, ipos, openOrders, portfolioProperties, userPortfolios };
}
