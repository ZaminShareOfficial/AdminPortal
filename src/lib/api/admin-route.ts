import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/cookie";
import { isUnauthorizedError } from "@/lib/auth/unauthorized";
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

async function readJsonBody(request: Request) {
  const text = await request.text();
  if (!text.trim()) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError(400, "Request body must be valid JSON.");
  }
}

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
        const body = await readJsonBody(request);
        if (body !== undefined) {
          options.body = JSON.stringify(body);
        }
      }

      const data = await apiFetch<T>(path, options);
      return NextResponse.json(data ?? { ok: true });
    } catch (error) {
      const status = error instanceof ApiError ? error.status : 500;
      const response = NextResponse.json(
        { message: getErrorMessage(error) },
        { status },
      );

      if (isUnauthorizedError(error)) {
        response.cookies.delete(SESSION_COOKIE);
      }

      return response;
    }
  };
}
