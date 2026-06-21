import {
  mapSubscriptionToProgress,
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

describe("mapSubscriptionToProgress", () => {
  it("maps admin subscription summary to progress bar values", () => {
    const result = mapSubscriptionToProgress({
      ipoId: "ipo-1",
      totalTokens: 1000,
      subscribedTokens: 250,
      subscriptionPercent: 0.25
    });

    expect(result).toEqual({
      progress: 25,
      progressLabel: "250 / 1,000"
    });
  });

  it("shows loading label while subscription data is pending", () => {
    expect(mapSubscriptionToProgress(null, true)).toEqual({
      progress: 0,
      progressLabel: "Loading..."
    });
  });

  it("shows unavailable when fetch failed", () => {
    expect(mapSubscriptionToProgress(null, false)).toEqual({
      progress: 0,
      progressLabel: "Unavailable"
    });
  });
});
