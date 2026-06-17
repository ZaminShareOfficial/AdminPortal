import type { IpoStatus } from "@/types/backend";

export const IPO_STATUS_OPTIONS: { value: IpoStatus; label: string }[] = [
  { value: "CREATED", label: "Open (Created)" },
  { value: "PAUSED", label: "Paused" },
  { value: "MINTED", label: "Minted" },
  { value: "FAILED", label: "Failed" }
];
