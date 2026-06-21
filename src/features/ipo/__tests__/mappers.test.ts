import { buildCreateIpoPayload } from "@/features/ipo/mappers";

describe("buildCreateIpoPayload", () => {
  it("sends propertyId, startTime, and endTime only", () => {
    const payload = buildCreateIpoPayload("prop-1", {
      startTime: "2026-06-20T10:00",
      endTime: "2026-06-20T18:00"
    });

    expect(payload.propertyId).toBe("prop-1");
    expect(payload.startTime).toMatch(/^2026-06-20T/);
    expect(payload.endTime).toMatch(/^2026-06-20T/);
    expect(payload).not.toHaveProperty("tokenPrice");
    expect(payload).not.toHaveProperty("totalTokens");
  });

  it("rejects when end time is before start time", () => {
    expect(() =>
      buildCreateIpoPayload("prop-1", {
        startTime: "2026-06-20T18:00",
        endTime: "2026-06-20T10:00"
      }),
    ).toThrow("End time must be after start time.");
  });
});
