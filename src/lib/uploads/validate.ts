import {
  UPLOAD_ACCEPT,
  UPLOAD_CATEGORIES,
  UPLOAD_MAX_FILE_SIZE_BYTES
} from "@/constants/uploads";
import type { UploadCategory } from "@/features/uploads/types";
import { ApiError } from "@/lib/api/errors";

const PHOTO_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
]);

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

const DOCUMENT_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);

const MEDIA_MIME_TYPES = new Set([
  ...PHOTO_MIME_TYPES,
  "video/mp4",
  "video/webm",
  "application/pdf"
]);

const getFileExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex < 0) {
    return "";
  }

  return fileName.slice(dotIndex).toLowerCase();
};

const isAllowedForCategory = (file: File, category: UploadCategory) => {
  const mimeType = file.type.toLowerCase();
  const extension = getFileExtension(file.name);

  if (category === UPLOAD_CATEGORIES.photos) {
    return PHOTO_MIME_TYPES.has(mimeType);
  }

  if (category === UPLOAD_CATEGORIES.documents) {
    return (
      DOCUMENT_MIME_TYPES.has(mimeType) ||
      DOCUMENT_EXTENSIONS.has(extension)
    );
  }

  return (
    MEDIA_MIME_TYPES.has(mimeType) ||
    DOCUMENT_EXTENSIONS.has(extension)
  );
};

export const validateUploadFile = (file: File, category: UploadCategory) => {
  if (!file.name.trim()) {
    throw new ApiError(400, "File name is required.");
  }

  if (file.size <= 0) {
    throw new ApiError(400, `"${file.name}" is empty.`);
  }

  if (file.size > UPLOAD_MAX_FILE_SIZE_BYTES) {
    throw new ApiError(
      400,
      `"${file.name}" exceeds the ${UPLOAD_MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB limit.`,
    );
  }

  if (!isAllowedForCategory(file, category)) {
    throw new ApiError(
      400,
      `"${file.name}" is not an allowed ${category} file type. Accepted: ${UPLOAD_ACCEPT[category]}.`,
    );
  }
};
