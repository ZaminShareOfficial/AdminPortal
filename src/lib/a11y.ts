import type { KeyboardEvent } from "react";

export const getRowActivationProps = (onActivate: () => void) => ({
  role: "button" as const,
  tabIndex: 0,
  onClick: onActivate,
  onKeyDown: (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  }
});
