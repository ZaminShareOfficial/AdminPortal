import { describe, expect, it } from "vitest";
import { isAdminRole } from "@/lib/auth/admin-access";

describe("isAdminRole", () => {
  it("returns true only for ADMIN role", () => {
    expect(isAdminRole("ADMIN")).toBe(true);
    expect(isAdminRole("USER")).toBe(false);
    expect(isAdminRole("BROKER")).toBe(false);
    expect(isAdminRole(undefined)).toBe(false);
  });
});
