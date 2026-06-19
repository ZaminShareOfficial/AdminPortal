import { describe, expect, it } from "vitest";
import { mapOpenOrderToRow, mapOrderToFeedItem } from "@/features/orders/mappers";
import type { OpenOrder } from "@/features/orders/types";

const createOpenOrder = (overrides?: Partial<OpenOrder>): OpenOrder => ({
  orderId: "abc12345-6789-0000-0000-000000000001",
  propertyId: "property-1",
  propertyTitle: "Downtown Tower",
  side: "BUY",
  price: 12550,
  quantity: 10,
  filledQuantity: 2,
  remainingQuantity: 8,
  status: "OPEN",
  createdAt: "2026-06-17T10:00:00.000Z",
  ...overrides,
});

describe("order mappers", () => {
  describe("mapOpenOrderToRow", () => {
    it("maps buy orders with buy styling", () => {
      const actual = mapOpenOrderToRow(createOpenOrder({ side: "BUY" }));

      expect(actual.side).toBe("Buy");
      expect(actual.sideClass).toContain("primary");
      expect(actual.initials).toBe("BY");
      expect(actual.id).toBe("#ABC12345");
      expect(actual.price).toBe("₹125.50");
      expect(actual.qty).toBe("8.00");
    });

    it("maps sell orders with sell styling", () => {
      const actual = mapOpenOrderToRow(createOpenOrder({ side: "SELL" }));

      expect(actual.side).toBe("Sell");
      expect(actual.sideClass).toContain("error");
      expect(actual.initials).toBe("SL");
    });
  });

  describe("mapOrderToFeedItem", () => {
    it("creates a buy feed summary", () => {
      const actual = mapOrderToFeedItem(createOpenOrder({ side: "BUY" }));

      expect(actual.type).toBe("Limit Buy");
      expect(actual.dotClass).toBe("bg-primary");
      expect(actual.summary).toContain("buy");
      expect(actual.summary).toContain("Downtown Tower");
    });

    it("creates a sell feed summary", () => {
      const actual = mapOrderToFeedItem(createOpenOrder({ side: "SELL" }));

      expect(actual.type).toBe("Limit Sell");
      expect(actual.dotClass).toBe("bg-error");
      expect(actual.summary).toContain("sell");
    });
  });
});
