"use client";

import {
  Label,
  ListBox,
  ListBoxItem,
  Select
} from "@heroui/react";

export type EnumSelectOption = {
  id: string;
  label: string;
};

type EnumSelectProps = {
  label: string;
  value: string;
  options: readonly EnumSelectOption[];
  onChange: (value: string) => void;
  testId?: string;
};

export const EnumSelect = ({
  label,
  value,
  options,
  onChange,
  testId
}: EnumSelectProps) => (
  <Select
    selectedKey={value}
    onSelectionChange={(key) => {
      if (key == null) {
        return;
      }

      const next = String(key);
      if (next !== value) {
        onChange(next);
      }
    }}
  >
    <Label>{label}</Label>
    <Select.Trigger data-testid={testId}>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <ListBox items={options}>
        {(item) => (
          <ListBoxItem id={item.id} textValue={item.label}>
            {item.label}
          </ListBoxItem>
        )}
      </ListBox>
    </Select.Popover>
  </Select>
);
