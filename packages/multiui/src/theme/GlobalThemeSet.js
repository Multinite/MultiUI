"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import useSelectify from "use-selectify";
import { isMobile } from "react-device-detect";
import { useRef, useState } from "react";
function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, enableBoxSelection, boxSelectionOptions, }) {
    const [themeState, setThemeState] = useState(theme);
    const ranOnce = useRef(false);
    if (!ranOnce.current && typeof window === "undefined") {
        // ran on server, clear MultiUI from globalThis.
        if (globalThis.multiUI) {
            delete globalThis.multiUI;
        }
    }
    if (typeof globalThis !== "undefined") {
        if (!globalThis["multiUI"]) {
            globalThis.multiUI = {
                themes: {},
                defineThemeStylesInline: {},
                boxSelectionThemeSubscriptions: [],
            };
        }
        if (themeId && !ranOnce.current) {
            ranOnce.current = true;
            console.log(globalThis.multiUI, themeId, theme);
            globalThis.multiUI = {
                ...globalThis.multiUI,
                themes: {
                    ...globalThis.multiUI.themes,
                    [themeId]: theme,
                },
                defineThemeStylesInline: {
                    ...globalThis.multiUI.defineThemeStylesInline,
                    [themeId]: defineThemeStylesInline,
                },
                boxSelectionThemeSubscriptions: [
                    ...globalThis.multiUI.boxSelectionThemeSubscriptions,
                    {
                        themeId,
                        cb: (theme) => {
                            setThemeState(theme);
                        },
                    },
                ],
            };
        }
    }
    if (!enableBoxSelection)
        return null;
    const element = useRef(typeof document === "undefined"
        ? null
        : document.querySelector(`[data-theme-id="${themeId}"]`));
    const { SelectBoxOutlet } = useSelectify(element, {
        selectCriteria: `[data-selectable=true], [data-selectable="${themeId}"]`,
        onSelect: (element) => {
            element.setAttribute("aria-selected", "true");
        },
        onUnselect: (element) => {
            element.removeAttribute("aria-selected");
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
        } }));
}
export default GlobalThemeSet;
//# sourceMappingURL=GlobalThemeSet.js.map