import { NextResponse } from "next/server";
import {
  UPLOAD_CATEGORIES,
  UPLOAD_MAX_FILES_PER_BATCH
} from "@/constants/uploads";
import type { UploadCategory } from "@/features/uploads/types";
import { getAccessToken } from "@/lib/auth/session";
import { ApiError, getErrorMessage } from "@/lib/api/errors";
import { resolvePublicUrl } from "@/lib/uploads/public-url";
import { saveUploadedFile } from "@/lib/uploads/storage";
import { validateUploadFile } from "@/lib/uploads/validate";

const isUploadCategory = (value: string): value is UploadCategory =>
  Object.values(UPLOAD_CATEGORIES).includes(value as UploadCategory);

export async function POST(request: Request) {
  try {
    const token = await getAccessToken();
    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const categoryValue = String(formData.get("category") ?? UPLOAD_CATEGORIES.media);

    if (!isUploadCategory(categoryValue)) {
      throw new ApiError(400, "Invalid upload category.");
    }

    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File);

    if (files.length === 0) {
      throw new ApiError(400, "No files provided.");
    }

    if (files.length > UPLOAD_MAX_FILES_PER_BATCH) {
      throw new ApiError(
        400,
        `Upload at most ${UPLOAD_MAX_FILES_PER_BATCH} files at a time.`,
      );
    }

    const uploads = [];

    for (const file of files) {
      validateUploadFile(file, categoryValue);
      const saved = await saveUploadedFile(file, categoryValue);
      uploads.push({
        url: resolvePublicUrl(request, saved.publicPath),
        fileName: saved.fileName,
        mimeType: saved.mimeType,
        size: saved.size
      });
    }

    return NextResponse.json({ uploads });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status },
    );
  }
}
