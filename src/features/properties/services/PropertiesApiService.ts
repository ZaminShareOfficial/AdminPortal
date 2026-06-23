import type {
  CreatePropertyRequest,
  PropertyResponse,
  UpdatePropertyRequest
} from "@/types/backend";
import { adminApiRequest } from "@/lib/api/admin-api";

export const listProperties = () =>
  adminApiRequest<PropertyResponse[]>({
    method: "GET",
    url: "/properties"
  });

export const getProperty = (id: string, signal?: AbortSignal) =>
  adminApiRequest<PropertyResponse>({
    method: "GET",
    url: `/properties/${id}`,
    signal
  });

export const createProperty = (body: CreatePropertyRequest) =>
  adminApiRequest<PropertyResponse>({
    method: "POST",
    url: "/properties",
    data: body
  });

export const updateProperty = (id: string, body: UpdatePropertyRequest) =>
  adminApiRequest<PropertyResponse>({
    method: "PATCH",
    url: `/properties/${id}`,
    data: body
  });
