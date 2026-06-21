import type { PropertyResponse } from "@/types/backend";
import { PROPERTY_STATUS } from "@/constants/property";
import { getLaunchEligibleProperties } from "@/features/ipo/utils";

const buildProperty = (
  overrides: Partial<PropertyResponse> & Pick<PropertyResponse, "id" | "title" | "location" | "status">,
): PropertyResponse => ({
  valuation: null,
  tokenSupply: null,
  tokenPrice: null,
  ...overrides
});

describe("getLaunchEligibleProperties", () => {
  it("returns only properties in APPROVED status", () => {
    const properties = [
      buildProperty({
        id: "p1",
        title: "Draft Tower",
        location: "Mumbai",
        status: PROPERTY_STATUS.DRAFT
      }),
      buildProperty({
        id: "p2",
        title: "Ready Tower",
        location: "Pune",
        status: PROPERTY_STATUS.APPROVED
      }),
      buildProperty({
        id: "p3",
        title: "Live Tower",
        location: "Delhi",
        status: PROPERTY_STATUS.IPO_OPEN
      })
    ];

    expect(getLaunchEligibleProperties(properties)).toEqual([properties[1]]);
  });
});
