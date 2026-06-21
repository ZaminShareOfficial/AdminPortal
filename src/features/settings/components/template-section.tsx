"use client";

import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import type { TemplateFormValues } from "@/features/settings/types";

type TemplateSectionProps = {
  templateForm: TemplateFormValues;
  onTemplateFormChange: (next: TemplateFormValues) => void;
  isPending: boolean;
  onCreate: () => void;
  onUpdate: () => void;
};

export const TemplateSection = ({
  templateForm,
  onTemplateFormChange,
  isPending,
  onCreate,
  onUpdate
}: TemplateSectionProps) => (
  <div className="space-y-4 rounded-lg bg-surface-container p-6">
    <h2 className="font-headline text-lg font-bold">Notification template</h2>
    <p className="text-xs text-on-surface-variant">POST/PATCH /admin/template</p>
    <TextField
      name="templateName"
      value={templateForm.templateName}
      onChange={(value) =>
        onTemplateFormChange({ ...templateForm, templateName: value })
      }
    >
      <Label>Template name</Label>
      <Input data-testid="template-name-input" />
    </TextField>
    <div>
      <Label>Template body</Label>
      <TextArea
        value={templateForm.templateString}
        onChange={(event) =>
          onTemplateFormChange({
            ...templateForm,
            templateString: event.target.value
          })
        }
        data-testid="template-body-input"
        className="mt-2 w-full"
      />
    </div>
    <div className="flex gap-3">
      <Button
        variant="primary"
        isDisabled={isPending}
        onPress={onCreate}
        data-testid="create-template-button"
      >
        Create template
      </Button>
      <Button
        variant="secondary"
        isDisabled={isPending}
        onPress={onUpdate}
        data-testid="update-template-button"
      >
        Update template
      </Button>
    </div>
  </div>
);
