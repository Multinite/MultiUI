"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import useSelectify from "use-selectify";
import { cn } from "../utils";
export function BoxSelection({ $boxSelectionId, $boxSelectionOptions = {
    lazyLoad: true,
    activateOnMetaKey: true,
    activateOnKey: undefined,
    autoScroll: true,
    autoScrollEdgeDistance: 100,
    autoScrollStep: 30,
    disableUnselection: false,
    className: undefined,
}, children, className, ...attr }) {
    const boxSelectWrapperEl = useRef(null);
    $boxSelectionOptions = {
        lazyLoad: $boxSelectionOptions.lazyLoad ?? true,
        activateOnMetaKey: $boxSelectionOptions.activateOnMetaKey ?? true,
        activateOnKey: $boxSelectionOptions.activateOnKey ?? undefined,
        autoScroll: $boxSelectionOptions.autoScroll ?? true,
        autoScrollEdgeDistance: $boxSelectionOptions.autoScrollEdgeDistance ?? 100,
        autoScrollStep: $boxSelectionOptions.autoScrollStep ?? 30,
        disableUnselection: $boxSelectionOptions.disableUnselection ?? false,
        className: $boxSelectionOptions.className ?? undefined,
    };
    // console.log(
    //   "If I am: ",
    //   themeId,
    //   ` than, these are excluded: `,
    //   typeof document === "undefined"
    //     ? []
    //     : [
    //         ...Array.from(document.querySelectorAll(`[data-theme]`))
    //           .filter((x) => x.getAttribute("data-theme-id") !== themeId)
    //           .filter((x) => !element.current!.closest(`#${x.id}`)),
    //       ]
    // );
    // const [isDragging, setIsDragging] = useState(false);
    // useEffect(() => {
    //   if (element.current!.id.includes("sup1")) {
    //     setIsDragging(true);
    //   }
    // }, []);
    // console.log(
    //   "If I am: ",
    //   themeId,
    //   ` than, these are excluded: `,
    //   typeof document === "undefined"
    //     ? []
    //     : Array.from(document.querySelectorAll(`[data-theme]`))
    //         .filter((x) => x.getAttribute("data-theme-id") !== themeId)
    //         .filter((x) => !x.querySelector(`[data-theme-id="${themeId}"]`))
    //         .map((x) => x.parentElement)
    // );
    const { SelectBoxOutlet } = useSelectify(boxSelectWrapperEl, {
        selectCriteria: `[data-box-select-id="${$boxSelectionId}"][data-selectable=true], [data-box-select-id="${$boxSelectionId}"][data-selectable="${$boxSelectionId}"]`,
        onSelect: (element) => {
            element.setAttribute("aria-selected", "true");
            element.setAttribute("data-selected-by-id", $boxSelectionId ?? "none");
            console.log(`selected el:`, element);
        },
        onUnselect: (element) => {
            element.removeAttribute("aria-selected");
            element.removeAttribute("data-selected-theme");
            element.removeAttribute("data-selected-theme-id");
        },
        // exclusionZone:
        //   typeof document === "undefined"
        //     ? []
        //     : [
        //         ...Array.from(document.querySelectorAll(`[data-theme]`))
        //           .filter((x) => x.getAttribute("data-theme-id") !== themeId)
        //           .filter((x) => !element.current!.closest(`#${x.id}`)),
        //       ],
        // .filter((x) => !x.querySelector(`[data-theme-id="${themeId}"]`))
        // .map((x) => x.parentElement!), ...Array.from(document.querySelectorAll(`[data-exclsion-zone]`))],
        lazyLoad: $boxSelectionOptions.lazyLoad,
        activateOnMetaKey: $boxSelectionOptions.activateOnMetaKey,
        disabled: $boxSelectionOptions.disableOnMobile && isMobile,
        activateOnKey: $boxSelectionOptions.activateOnKey,
        autoScroll: $boxSelectionOptions.autoScroll,
        autoScrollEdgeDistance: $boxSelectionOptions.autoScrollEdgeDistance,
        autoScrollStep: $boxSelectionOptions.autoScrollStep,
        disableUnselection: $boxSelectionOptions.disableUnselection,
        maxSelections: $boxSelectionOptions.maxSelections,
    });
    return (_jsxs("div", { "data-box-selection": true, "data-box-selection-id": $boxSelectionId, ref: boxSelectWrapperEl, ...attr, className: cn(`relative`, className), children: [_jsx(SelectBoxOutlet, { className: cn("bg-primary/20 border border-primary", $boxSelectionOptions.className) }), children] }));
}
//# sourceMappingURL=BoxSelection.js.map