import { mapIpoDetailMetadata } from "@/lib/mappers/ipo";
import type { IpoDetailResponse } from "@/types/backend";

const buildDetail = (
  overrides: Partial<IpoDetailResponse> = {},
): IpoDetailResponse => ({
  id: "ipo-1",
  propertyId: "prop-1",
  status: "CREATED",
  tokenPrice: 10000,
  totalTokens: 1000,
  subscribedTokens: 250,
  startTime: "2026-06-20T10:00:00Z",
  endTime: "2026-06-20T18:00:00Z",
  ...overrides
});

describe("mapIpoDetailMetadata", () => {
  it("maps detail fields for the inspector", () => {
    const metadata = mapIpoDetailMetadata(buildDetail());

    expect(metadata).toEqual([
      { label: "IPO ID", value: "ipo-1", testId: "ipo-detail-id" },
      { label: "Property ID", value: "prop-1", testId: "ipo-detail-property-id" },
      { label: "Status", value: "CREATED", testId: "ipo-detail-status" },
      {
        label: "Subscribed Tokens",
        value: "250",
        testId: "ipo-detail-subscribed-tokens"
      }
    ]);
  });

  it("shows unavailable when subscribed tokens are missing", () => {
    const metadata = mapIpoDetailMetadata(
      buildDetail({ subscribedTokens: null }),
    );

    expect(metadata[3]).toEqual({
      label: "Subscribed Tokens",
      value: "Unavailable",
      testId: "ipo-detail-subscribed-tokens"
    });
  });
});
