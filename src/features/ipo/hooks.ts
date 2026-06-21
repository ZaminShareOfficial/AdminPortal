import type { IpoContentProps } from "@/features/ipo/types";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { listIpos } from "@/lib/services/backend";

export async function loadIpoPageData(): Promise<IpoContentProps> {
  try {
    const initialIpos = await listIpos();

    return {
      initialIpos,
      error: null
    };
  } catch (error) {
    await guardUnauthorized(error);
    return {
      initialIpos: [],
      error: getErrorMessage(error, "Could not load IPO data from the backend.")
    };
  }
}
