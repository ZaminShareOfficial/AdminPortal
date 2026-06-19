import { describe, expect, it } from "vitest";
import {
  formatNumericInputDisplay,
  sanitizeNumericInput
} from "@/lib/numeric-input";

describe("numeric input helpers", () => {
  describe("sanitizeNumericInput", () => {
    it("removes non-numeric characters from integer input", () => {
      expect(sanitizeNumericInput("12asdsaddas")).toBe("12");
      expect(sanitizeNumericInput("1,28,00,000")).toBe("12800000");
    });

    it("allows decimals when configured", () => {
      expect(
        sanitizeNumericInput("25.60abc", { allowDecimal: true }),
      ).toBe("25.60");
    });

    it("allows a leading negative sign for coordinates", () => {
      expect(
        sanitizeNumericInput("-12.9716", {
          allowDecimal: true,
          allowNegative: true,
          maxDecimalPlaces: 6
        }),
      ).toBe("-12.9716");
    });
  });

  describe("formatNumericInputDisplay", () => {
    it("formats integers with Indian grouping", () => {
      expect(formatNumericInputDisplay("500000")).toBe("5,00,000");
      expect(formatNumericInputDisplay("12800000")).toBe("1,28,00,000");
    });

    it("formats decimal values while preserving fractional digits", () => {
      expect(
        formatNumericInputDisplay("25.60", { allowDecimal: true }),
      ).toBe("25.60");
    });
  });
});
