import type {
  CreatePropertyRequest,
  PropertyResponse,
  PropertyType,
  UpdatePropertyRequest
} from "@/types/backend";
import { adminClient } from "@/lib/api/admin-client";

export const createProperty = (body: CreatePropertyRequest) =>
  adminClient.post<PropertyResponse>("/properties", body);

export const updateProperty = (id: string, body: UpdatePropertyRequest) =>
  adminClient.patch<PropertyResponse>(`/properties/${id}`, body);

export type { PropertyType };
