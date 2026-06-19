"use client";

import { useCallback, useState } from "react";
import { uploadFiles } from "@/features/uploads/services/UploadApiService";
import type { UploadCategory } from "@/features/uploads/types";
import { getErrorMessage } from "@/lib/api/errors";

export const useFileUpload = (category: UploadCategory) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (files: File[]) => {
    if (files.length === 0) {
      return [];
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadFiles(files, category);
      return response.uploads.map((upload) => upload.url);
    } catch (uploadError) {
      setError(getErrorMessage(uploadError));
      return [];
    } finally {
      setIsUploading(false);
    }
  }, [category]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    upload,
    isUploading,
    error,
    clearError
  };
};
