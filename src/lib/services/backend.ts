import type {
  IpoDetailResponse,
  IpoSummaryResponse,
  ProfileResponse,
  PropertyHoldersResponse,
  PropertyPortfolioSummaryResponse,
  PropertyResponse,
  UserPortfolioResponse
} from "@/types/backend";
import { listOpenOrders } from "@/features/orders/services/orders-service";
import { apiFetch } from "@/lib/api/server-client";

export function getProfile() {
  return apiFetch<ProfileResponse>("/me");
}

export function getKycStatus() {
  return apiFetch<import("@/types/backend").KycStatusResponse>("/kyc");
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

export { listOpenOrders };

export async function loadDashboardData() {
  const [properties, ipos, openOrders, portfolioProperties, userPortfolios] =
    await Promise.all([
      listProperties(),
      listIpos({ active: true }),
      listOpenOrders(),
      listPortfolioProperties(),
      listUserPortfolios()
    ]);

  return { properties, ipos, openOrders, portfolioProperties, userPortfolios };
}
