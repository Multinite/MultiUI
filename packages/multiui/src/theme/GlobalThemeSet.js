"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import useSelectify from "use-selectify";
import { isMobile } from "react-device-detect";
function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, enableBoxSelection, boxSelectionOptions = {
    activateOnKey: undefined,
    activateOnMetaKey: false,
    disableOnMobile: true,
    lazyLoad: true,
    autoScroll: true,
    autoScrollEdgeDistance: 100,
    autoScrollStep: 30,
    disableUnselection: false,
    maxSelections: Number.POSITIVE_INFINITY,
}, }) {
    if (typeof globalThis !== "undefined") {
        if (!globalThis["multiUI"]) {
            globalThis.multiUI = {
                themes: {},
                defineThemeStylesInline: {},
            };
        }
        if (globalThis.multiUI) {
            if (themeId) {
                globalThis.multiUI = {
                    themes: {
                        ...globalThis.multiUI.themes,
                        [themeId]: theme,
                    },
                    defineThemeStylesInline: {
                        ...globalThis.multiUI.defineThemeStylesInline,
                        [themeId]: defineThemeStylesInline,
                    },
                };
            }
        }
    }
    const { SelectBoxOutlet } = useSelectify({
        current: typeof document === "undefined"
            ? null
            : document.querySelector(`[data-theme-id="${themeId}"]`),
    }, {
        selectCriteria: ".selectable",
        onSelect: (element) => {
            element.setAttribute("aria-selected", "true");
        },
        onUnselect: (element) => {
            element.removeAttribute("aria-selected");
        },
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
    return _jsx(SelectBoxOutlet, {});
}
export default GlobalThemeSet;
//# sourceMappingURL=GlobalThemeSet.js.map