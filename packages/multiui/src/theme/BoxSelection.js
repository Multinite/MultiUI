"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import useSelectify from "use-selectify";
function BoxSelection({ themeId, boxSelectionOptions, enableBoxSelection, theme, }) {
    if (!enableBoxSelection)
        return null;
    const [themeState, setThemeState] = useState(Array.isArray(theme) ? theme[0] : theme);
    const element = useRef(typeof document === "undefined"
        ? null
        : document.querySelector(`[data-theme-id="${themeId}"]`));
    const { SelectBoxOutlet } = useSelectify(element, {
        selectCriteria: `[data-selectable=true], [data-selectable="${themeId}"]`,
        onSelect: (element) => {
            element.setAttribute("aria-selected", "true");
            element.setAttribute("data-selected-theme-id", themeId || "none");
            element.setAttribute("data-selected-theme", themeState.name);
        },
        onUnselect: (element) => {
            element.removeAttribute("aria-selected");
            element.removeAttribute("data-selected-theme");
            element.removeAttribute("data-selected-theme-id");
        },
        exclusionZone: `[data-theme]`,
        lazyLoad: enableBoxSelection ? boxSelectionOptions.lazyLoad : true,
        activateOnMetaKey: boxSelectionOptions.activateOnMetaKey,
        disabled: enableBoxSelection
            ? boxSelectionOptions.disableOnMobile && isMobile
            : true,
        activateOnKey: boxSelectionOptions.activateOnKey,
        autoScroll: boxSelectionOptions.autoScroll,
        autoScrollEdgeDistance: boxSelectionOptions.autoScrollEdgeDistance,
        autoScrollStep: boxSelectionOptions.autoScrollStep,
        disableUnselection: boxSelectionOptions.disableUnselection,
        maxSelections: boxSelectionOptions.maxSelections,
    });
    return (_jsx(SelectBoxOutlet, { style: {
            backgroundColor: `hsl(${themeState.primary["DEFAULT"]}, 20%)`,
            border: `1px solid hsl(${themeState.primary["DEFAULT"]}, 100%)`,
        }, className: boxSelectionOptions.className }));
}
export default BoxSelection;
//# sourceMappingURL=BoxSelection.js.map