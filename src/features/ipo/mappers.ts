import type { CreateIpoRequest } from "@/types/backend";

export type CreateIpoFormValues = {
  startTime: string;
  endTime: string;
};

export const emptyCreateIpoForm = (): CreateIpoFormValues => ({
  startTime: "",
  endTime: ""
});

export const buildCreateIpoPayload = (
  propertyId: string,
  form: CreateIpoFormValues,
): CreateIpoRequest => {
  if (!form.startTime.trim() || !form.endTime.trim()) {
    throw new Error("Start time and end time are required.");
  }

  const startTime = new Date(form.startTime).toISOString();
  const endTime = new Date(form.endTime).toISOString();

  if (Number.isNaN(Date.parse(startTime)) || Number.isNaN(Date.parse(endTime))) {
    throw new Error("Enter valid start and end times.");
  }

  if (new Date(endTime) <= new Date(startTime)) {
    throw new Error("End time must be after start time.");
  }

  return {
    propertyId,
    startTime,
    endTime
  };
};
