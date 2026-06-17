import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/server-client";
import { ApiError, getErrorMessage } from "@/lib/api/errors";

type AdminRouteContext = {
  params: Promise<Record<string, string>>;
};

type AdminHandlerOptions = {
  method: "GET" | "POST" | "PATCH";
  resolvePath: (
    params: Record<string, string>,
  ) => string;
  hasBody?: boolean;
};

export function createAdminRouteHandler<T>({
  method,
  resolvePath,
  hasBody = method !== "GET"
}: AdminHandlerOptions) {
  return async function handler(
    request: Request,
    context: AdminRouteContext,
  ) {
    try {
      const params = await context.params;
      const path = resolvePath(params);
      const options: RequestInit = { method };

      if (hasBody) {
        options.body = JSON.stringify(await request.json());
      }

      const data = await apiFetch<T>(path, options);
      return NextResponse.json(data ?? { ok: true });
    } catch (error) {
      const status = error instanceof ApiError ? error.status : 500;
      return NextResponse.json(
        { message: getErrorMessage(error) },
        { status },
      );
    }
  };
}
