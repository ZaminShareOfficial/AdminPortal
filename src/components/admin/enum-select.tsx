"use client";

import {
  Label,
  ListBox,
  ListBoxItem,
  Select
} from "@heroui/react";
import { useMemo } from "react";

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

const getOptionsSignature = (options: readonly EnumSelectOption[]) =>
  options.map((option) => `${option.id}:${option.label}`).join("|");

export const EnumSelect = ({
  label,
  value,
  options,
  onChange,
  testId
}: EnumSelectProps) => {
  const optionsSignature = getOptionsSignature(options);
  const items = useMemo(
    () => options.map((option) => ({ id: option.id, label: option.label })),
    [optionsSignature]
  );

  return (
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
        <ListBox items={items}>
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.label}>
              {item.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
