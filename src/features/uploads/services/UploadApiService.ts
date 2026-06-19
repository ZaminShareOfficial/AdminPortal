import axios from "axios";
import { attachUnauthorizedRedirect } from "@/lib/auth/unauthorized-client";
import { ApiError } from "@/lib/api/errors";
import type { UploadBatchResponse, UploadCategory } from "@/features/uploads/types";

const uploadClient = axios.create({
  baseURL: "/api/admin"
});

attachUnauthorizedRedirect(uploadClient);

export const uploadFiles = async (
  files: File[],
  category: UploadCategory,
): Promise<UploadBatchResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("category", category);

  try {
    const response = await uploadClient.post<UploadBatchResponse>(
      "/uploads",
      formData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data as { message?: string } | undefined;
      const message =
        payload?.message ?? error.response?.statusText ?? error.message;
      throw new ApiError(error.response?.status ?? 500, message);
    }

    throw error;
  }
};
