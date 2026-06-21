import { describe, expect, it } from "vitest";
import {
  parseInrToPaise,
  paiseToInrInput
} from "@/lib/format";

describe("parseInrToPaise", () => {
  it("converts INR strings to paise", () => {
    expect(parseInrToPaise("12.5")).toBe(1250);
    expect(parseInrToPaise("1000")).toBe(100000);
  });

  it("returns null for invalid values", () => {
    expect(parseInrToPaise("")).toBeNull();
    expect(parseInrToPaise("abc")).toBeNull();
  });
});

describe("paiseToInrInput", () => {
  it("converts paise to editable INR strings", () => {
    expect(paiseToInrInput(1250)).toBe("12.5");
    expect(paiseToInrInput(null)).toBe("");
  });
});
