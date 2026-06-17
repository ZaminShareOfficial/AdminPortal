import { describe, expect, it } from "vitest";
import {
  parseDollarsToPaise,
  paiseToDollarInput
} from "@/lib/format";

describe("parseDollarsToPaise", () => {
  it("converts dollar strings to paise", () => {
    expect(parseDollarsToPaise("12.5")).toBe(1250);
    expect(parseDollarsToPaise("$1,000")).toBe(100000);
  });

  it("returns null for invalid values", () => {
    expect(parseDollarsToPaise("")).toBeNull();
    expect(parseDollarsToPaise("abc")).toBeNull();
  });
});

describe("paiseToDollarInput", () => {
  it("converts paise to editable dollar strings", () => {
    expect(paiseToDollarInput(1250)).toBe("12.5");
    expect(paiseToDollarInput(null)).toBe("");
  });
});
