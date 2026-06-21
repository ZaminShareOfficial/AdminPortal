import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EnumSelect } from "@/components/admin/enum-select";

describe("EnumSelect", () => {
  it("keeps a stable collection when parents pass new option arrays", () => {
    const onChange = vi.fn();

    const { rerender } = render(
      <EnumSelect
        label="Status"
        value="DRAFT"
        options={[{ id: "DRAFT", label: "Draft" }]}
        onChange={onChange}
        testId="status-select"
      />
    );

    for (let index = 0; index < 20; index += 1) {
      rerender(
        <EnumSelect
          label="Status"
          value="DRAFT"
          options={[{ id: "DRAFT", label: "Draft" }]}
          onChange={onChange}
          testId="status-select"
        />
      );
    }

    expect(onChange).not.toHaveBeenCalled();
  });
});
