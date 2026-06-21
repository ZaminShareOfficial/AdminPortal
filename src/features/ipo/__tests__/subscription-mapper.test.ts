import {
  computeSubscriptionPercent,
  mapIpoDetailToProgress,
  normalizeSubscriptionPercent
} from "@/lib/mappers/ipo";

describe("normalizeSubscriptionPercent", () => {
  it("converts decimal fractions to whole percent", () => {
    expect(normalizeSubscriptionPercent(0.1)).toBe(10);
    expect(normalizeSubscriptionPercent(1)).toBe(100);
  });

  it("accepts values already expressed as percent", () => {
    expect(normalizeSubscriptionPercent(42)).toBe(42);
    expect(normalizeSubscriptionPercent(150)).toBe(100);
  });
});

describe("computeSubscriptionPercent", () => {
  it("derives percent from subscribed and total tokens", () => {
    expect(computeSubscriptionPercent(250, 1000)).toBe(25);
  });

  it("returns zero when total tokens are missing or zero", () => {
    expect(computeSubscriptionPercent(250, 0)).toBe(0);
    expect(computeSubscriptionPercent(null, 1000)).toBe(0);
  });
});

describe("mapIpoDetailToProgress", () => {
  it("maps IPO detail to progress bar values", () => {
    const result = mapIpoDetailToProgress({
      id: "ipo-1",
      propertyId: "prop-1",
      status: "CREATED",
      tokenPrice: 10000,
      totalTokens: 1000,
      subscribedTokens: 250
    });

    expect(result).toEqual({
      progress: 25,
      progressLabel: "250 / 1,000"
    });
  });

  it("shows loading label while detail is pending", () => {
    expect(mapIpoDetailToProgress(null, true)).toEqual({
      progress: 0,
      progressLabel: "Loading..."
    });
  });

  it("shows unavailable when fetch failed", () => {
    expect(mapIpoDetailToProgress(null, false)).toEqual({
      progress: 0,
      progressLabel: "Unavailable"
    });
  });
});
