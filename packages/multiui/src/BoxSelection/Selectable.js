"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cloneElement, forwardRef, } from "react";
export const Selectable = forwardRef(({ children, onSelect, onUnselect, specificThemeId }, ref) => {
    const childWithRef = cloneElement(children, {
        ref: ref,
        "data-selectable": specificThemeId || true,
    });
    return childWithRef;
});
export function SelectableGroup({ children, onSelect, onUnselect, specificThemeId, ...attr }) {
    return (_jsx("div", { role: "listbox", "aria-multiselectable": "true", ...attr, children: children.map((el, i) => {
            const child = cloneElement(el, {
                "data-selectable": specificThemeId || true,
                role: "option",
                key: `multiui-selectable-item-${i}`,
            });
            return child;
        }) }));
}
//# sourceMappingURL=Selectable.js.map