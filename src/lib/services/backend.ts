import type {
  CreateIpoRequest,
  CreateIpoResponse,
  CreatePropertyRequest,
  IpoDetailResponse,
  IpoStatusResponse,
  IpoSummaryResponse,
  KycStatusResponse,
  MintResponse,
  ModifyOrderRequest,
  PatchProfileRequest,
  ProfileResponse,
  PropertyHoldersResponse,
  PropertyPortfolioSummaryResponse,
  PropertyResponse,
  SendNotificationRequest,
  SendNotificationResponse,
  TemplateRequest,
  TemplateResponse,
  TradeResponse,
  UpdatePropertyRequest,
  UserPortfolioResponse,
} from "@/types/backend";
import type { OrderResponse } from "@/types/backend";
import { listOpenOrders } from "@/features/orders/services/orders-service";
import { apiFetch } from "@/lib/api/server-client";

export function getProfile() {
  return apiFetch<ProfileResponse>("/me");
}

export function updateProfile(body: PatchProfileRequest) {
  return apiFetch<ProfileResponse>("/me", {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}

export function getKycStatus() {
  return apiFetch<KycStatusResponse>("/kyc");
}

export function listProperties() {
  return apiFetch<PropertyResponse[]>("/properties");
}

export function getProperty(id: string) {
  return apiFetch<PropertyResponse>(`/properties/${id}`);
}

export function createProperty(body: CreatePropertyRequest) {
  return apiFetch<PropertyResponse>("/admin/properties", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function updateProperty(id: string, body: UpdatePropertyRequest) {
  return apiFetch<PropertyResponse>(`/admin/properties/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body)
  });
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

export function createIpo(body: CreateIpoRequest) {
  return apiFetch<CreateIpoResponse>("/admin/ipos", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function updateIpoStatus(ipoId: string, status: "CREATED" | "PAUSED") {
  return apiFetch<IpoStatusResponse>(`/admin/ipos/${ipoId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
}

export function mintIpo(ipoId: string) {
  return apiFetch<MintResponse>(`/admin/ipos/${ipoId}/mint`, {
    method: "POST"
  });
}

export function modifyOrder(orderId: string, body: ModifyOrderRequest) {
  return apiFetch<OrderResponse>(`/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}

export function listOrderTrades(orderId: string) {
  return apiFetch<TradeResponse[]>(`/orders/${orderId}/trades`);
}

export function createTemplate(body: TemplateRequest) {
  return apiFetch<TemplateResponse>("/admin/template", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function updateTemplate(body: TemplateRequest) {
  return apiFetch<TemplateResponse>("/admin/template", {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}

export function sendNotification(body: SendNotificationRequest) {
  return apiFetch<SendNotificationResponse>(
    "/internal/admin/notification/send",
    {
      method: "POST",
      body: JSON.stringify(body)
    },
  );
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
      listUserPortfolios(),
    ]);

  return { properties, ipos, openOrders, portfolioProperties, userPortfolios };
}
