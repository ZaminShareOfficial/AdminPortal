import { adminApiRequest } from "@/lib/api/admin-api";
import type {
  PropertyHoldersResponse,
  PropertyPortfolioSummaryResponse,
  UserPortfolioResponse
} from "@/types/backend";

export const listUserPortfolios = () =>
  adminApiRequest<UserPortfolioResponse[]>({
    method: "GET",
    url: "/portfolio"
  });

export const listPortfolioProperties = () =>
  adminApiRequest<PropertyPortfolioSummaryResponse[]>({
    method: "GET",
    url: "/portfolio/properties"
  });

export const getPropertyHolders = (propertyId: string) =>
  adminApiRequest<PropertyHoldersResponse>({
    method: "GET",
    url: `/portfolio/properties/${propertyId}`
  });
