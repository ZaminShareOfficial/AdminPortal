import { describe, expect, it } from "vitest";
import { parseIdentityType } from "@/lib/validators/notification";
import {
  parsePropertyStatus,
  parsePropertyType
} from "@/lib/validators/property";

describe("property validators", () => {
  it("accepts known property types", () => {
    expect(parsePropertyType("RESIDENTIAL")).toBe("RESIDENTIAL");
  });

  it("rejects unknown property types", () => {
    expect(() => parsePropertyType("INVALID")).toThrow("Invalid property type.");
  });

  it("accepts known property statuses", () => {
    expect(parsePropertyStatus("APPROVED")).toBe("APPROVED");
  });

  it("rejects unknown property statuses", () => {
    expect(() => parsePropertyStatus("INVALID")).toThrow("Invalid property status.");
  });
});

describe("notification validators", () => {
  it("accepts known identity types", () => {
    expect(parseIdentityType("EMAIL")).toBe("EMAIL");
  });

  it("rejects unknown identity types", () => {
    expect(() => parseIdentityType("SMS")).toThrow("Invalid identity type.");
  });
});
