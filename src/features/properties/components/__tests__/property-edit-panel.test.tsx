import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PropertyEditPanel } from "@/features/properties/components/property-edit-panel";
import type { PropertyActions } from "@/features/properties/hooks";
import type { PropertyResponse } from "@/types/backend";

const mockProperty: PropertyResponse = {
  id: "property-1",
  title: "Skyline Tower",
  location: "Mumbai",
  valuation: 50000000,
  tokenSupply: 1000,
  tokenPrice: 50000,
  status: "DRAFT",
  listingBroker: "Acme Brokers",
  propertyType: "COMMERCIAL"
};

const mockPropertyActions: PropertyActions = {
  actionError: null,
  isPending: false,
  submitCreate: vi.fn(),
  submitUpdate: vi.fn(),
  clearActionError: vi.fn()
};

describe("PropertyEditPanel", () => {
  it("renders the edit form for a selected property", () => {
    render(
      <PropertyEditPanel
        property={mockProperty}
        propertyActions={mockPropertyActions}
      />
    );

    expect(screen.getByTestId("edit-property-title")).toBeInTheDocument();
    expect(screen.getByTestId("edit-property-type")).toBeInTheDocument();
    expect(screen.getByTestId("edit-property-status")).toBeInTheDocument();
  });

  it("survives repeated re-renders without an update loop", () => {
    const { rerender } = render(
      <PropertyEditPanel
        property={mockProperty}
        propertyActions={mockPropertyActions}
      />
    );

    for (let index = 0; index < 20; index += 1) {
      rerender(
        <PropertyEditPanel
          property={mockProperty}
          propertyActions={mockPropertyActions}
        />
      );
    }

    expect(screen.getByTestId("edit-property-title")).toBeInTheDocument();
  });

  it("shows placeholder copy when no property is selected", () => {
    render(
      <PropertyEditPanel
        property={null}
        propertyActions={mockPropertyActions}
      />
    );

    expect(
      screen.getByText(
        "Select a property from the list to view and edit live backend data."
      )
    ).toBeInTheDocument();
  });
});
