import type { UPLOAD_CATEGORIES } from "@/constants/uploads";

export type UploadCategory = keyof typeof UPLOAD_CATEGORIES;

export type UploadedFile = {
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
};

export type UploadBatchResponse = {
  uploads: UploadedFile[];
};
