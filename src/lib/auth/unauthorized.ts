import { redirect } from "next/navigation";
import axios from "axios";
import { UNAUTHORIZED_STATUS } from "@/constants/auth";
import { SESSION_EXPIRED_PATH } from "@/constants/routes";
import { ApiError } from "@/lib/api/errors";

export { UNAUTHORIZED_STATUS } from "@/constants/auth";

export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return error.status === UNAUTHORIZED_STATUS;
  }

  if (axios.isAxiosError(error)) {
    return error.response?.status === UNAUTHORIZED_STATUS;
  }

  return false;
};

export const handleServerUnauthorized = (): never => {
  redirect(SESSION_EXPIRED_PATH);
};

export const guardUnauthorized = async (error: unknown): Promise<void> => {
  if (isUnauthorizedError(error)) {
    handleServerUnauthorized();
  }
};
