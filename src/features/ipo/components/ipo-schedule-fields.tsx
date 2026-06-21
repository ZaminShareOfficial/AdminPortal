"use client";

import { Input, Label, TextField } from "@heroui/react";
import type { CreateIpoFormValues } from "@/features/ipo/mappers";

type IpoScheduleFieldsProps = {
  form: CreateIpoFormValues;
  onChange: (form: CreateIpoFormValues) => void;
};

export const IpoScheduleFields = ({ form, onChange }: IpoScheduleFieldsProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <TextField
      name="startTime"
      value={form.startTime}
      onChange={(startTime) => onChange({ ...form, startTime })}
    >
      <Label>Start time</Label>
      <Input
        type="datetime-local"
        data-testid="ipo-start-time"
      />
    </TextField>
    <TextField
      name="endTime"
      value={form.endTime}
      onChange={(endTime) => onChange({ ...form, endTime })}
    >
      <Label>End time</Label>
      <Input
        type="datetime-local"
        data-testid="ipo-end-time"
      />
    </TextField>
  </div>
);
