export const UPLOAD_CATEGORIES = {
  photos: "photos",
  documents: "documents",
  media: "media"
} as const;

export const UPLOAD_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const UPLOAD_MAX_FILES_PER_BATCH = 10;

export const UPLOAD_ACCEPT = {
  photos: "image/jpeg,image/png,image/webp,image/gif",
  documents:
    "application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx",
  media:
    "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,application/pdf"
} as const;

export const UPLOAD_PUBLIC_DIR = "uploads";
