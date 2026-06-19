import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { UPLOAD_PUBLIC_DIR } from "@/constants/uploads";
import type { UploadCategory } from "@/features/uploads/types";

export type SavedUpload = {
  fileName: string;
  mimeType: string;
  size: number;
  publicPath: string;
};

export const sanitizeFileName = (fileName: string) =>
  fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);

export const saveUploadedFile = async (
  file: File,
  category: UploadCategory,
): Promise<SavedUpload> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = sanitizeFileName(file.name);
  const uniqueName = `${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`;
  const relativeDir = path.posix.join(UPLOAD_PUBLIC_DIR, category);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);

  await mkdir(absoluteDir, { recursive: true });
  await writeFile(path.join(absoluteDir, uniqueName), buffer);

  return {
    fileName: uniqueName,
    mimeType: file.type || "application/octet-stream",
    size: buffer.length,
    publicPath: `/${relativeDir}/${uniqueName}`
  };
};
