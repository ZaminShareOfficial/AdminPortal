import { canFailIpo, canMintIpo, getIpoToggleTarget } from "@/features/ipo/utils";

describe("getIpoToggleTarget", () => {
  it("pauses open IPOs and resumes paused IPOs", () => {
    expect(getIpoToggleTarget("CREATED")).toBe("PAUSED");
    expect(getIpoToggleTarget("PAUSED")).toBe("CREATED");
  });

  it("returns null for non-toggleable statuses", () => {
    expect(getIpoToggleTarget("MINTED")).toBeNull();
    expect(getIpoToggleTarget("FAILED")).toBeNull();
  });
});

describe("canMintIpo", () => {
  it("allows mint for open or paused IPOs", () => {
    expect(canMintIpo("CREATED")).toBe(true);
    expect(canMintIpo("PAUSED")).toBe(true);
    expect(canMintIpo("MINTED")).toBe(false);
    expect(canMintIpo("FAILED")).toBe(false);
  });
});

describe("canFailIpo", () => {
  it("allows fail for open or paused IPOs", () => {
    expect(canFailIpo("CREATED")).toBe(true);
    expect(canFailIpo("PAUSED")).toBe(true);
    expect(canFailIpo("MINTED")).toBe(false);
    expect(canFailIpo("FAILED")).toBe(false);
  });
});
