"use client";

import { Button, Label, TextArea, TextField } from "@heroui/react";
import { useRef } from "react";
import { Icon } from "@/components/admin/icon";
import { UPLOAD_ACCEPT } from "@/constants/uploads";
import { useFileUpload } from "@/features/uploads/hooks";
import type { UploadCategory } from "@/features/uploads/types";
import { appendToUrlList } from "@/lib/url-list";

type UrlListUploadFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  category: UploadCategory;
  testId: string;
  placeholder?: string;
  hint?: string;
};

export const UrlListUploadField = ({
  label,
  value,
  onChange,
  category,
  testId,
  placeholder,
  hint = "One URL per line. Uploaded files are appended automatically."
}: UrlListUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading, error } = useFileUpload(category);

  const handleUploadPress = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles?.length) {
      return;
    }

    const uploadedUrls = await upload(Array.from(selectedFiles));
    if (uploadedUrls.length > 0) {
      onChange(appendToUrlList(value, uploadedUrls));
    }

    event.target.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          isDisabled={isUploading}
          onPress={handleUploadPress}
          data-testid={`${testId}-upload-button`}
        >
          <Icon name="upload" className="text-sm" />
          {isUploading ? "Uploading..." : "Upload files"}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={UPLOAD_ACCEPT[category]}
        className="hidden"
        onChange={handleFileChange}
        data-testid={`${testId}-file-input`}
      />

      <TextField name={testId} value={value} onChange={onChange}>
        <TextArea
          placeholder={placeholder}
          rows={3}
          data-testid={testId}
        />
      </TextField>

      <p className="text-xs text-on-surface-variant">{hint}</p>

      {error ? (
        <p className="text-xs text-error" role="alert" data-testid={`${testId}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
};
