import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { listProperties } from "@/lib/services/backend";
import type { PropertiesContentProps } from "@/features/properties/types";

export async function loadPropertiesPageData(): Promise<PropertiesContentProps> {
  try {
    const initialProperties = await listProperties();
    return {
      initialProperties,
      error: null
    };
  } catch (error) {
    await guardUnauthorized(error);
    return {
      initialProperties: [],
      error: getErrorMessage(error, "Could not load properties from the backend.")
    };
  }
}
