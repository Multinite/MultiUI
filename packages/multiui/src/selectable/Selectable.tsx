"use client";
import {
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactElement,
} from "react";

export const Selectable = forwardRef<
  HTMLElement,
  {
    children: ReactElement;
    onSelect?: (element: HTMLElement) => void;
    onUnselect?: (element: HTMLElement) => void;
    specificThemeId?: string;
  }
>(({ children, onSelect, onUnselect, specificThemeId }, ref) => {
  const childWithRef = cloneElement(children, {
    ref: ref,
    "data-selectable": specificThemeId || true,
  });

  return childWithRef;
});

export function SelectableGroup({
  children,
  onSelect,
  onUnselect,
  specificThemeId,
  ...attr
}: {
  children: ReactElement[];
  onSelect?: (element: HTMLElement) => void;
  onUnselect?: (element: HTMLElement) => void;
  specificThemeId?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSelect">) {
  return (
    <div role="listbox" aria-multiselectable="true" {...attr}>
      {children.map((el, i) => {
        const child = cloneElement(el, {
          "data-selectable": specificThemeId || true,
          role: "option",
          key: `multiui-selectable-item-${i}`,
        });

        return child;
      })}
    </div>
  );
}
