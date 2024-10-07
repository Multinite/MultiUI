"use client";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import useSelectify from "use-selectify";
import { ThemeT } from "../types";
import { Schemes } from "./Theme";

function BoxSelection({
  themeId,
  boxSelectionOptions,
  enableBoxSelection,
  theme,
}: {
  theme: ThemeT | Schemes;
  themeId: string;
  enableBoxSelection: boolean;
  boxSelectionOptions: {
    lazyLoad?: boolean;
    disableOnMobile?: boolean;
    activateOnMetaKey?: boolean;
    activateOnKey?: string[];
    autoScroll?: boolean;
    autoScrollEdgeDistance?: number;
    autoScrollStep?: number;
    disableUnselection?: boolean;
    maxSelections?: number | false;
    className?: string;
  };
}) {
  if (!enableBoxSelection) return null;
  const [themeState, setThemeState] = useState<ThemeT>(
    Array.isArray(theme) ? theme[0] : theme
  );

  const element = useRef(
    typeof document === "undefined"
      ? (null as never as HTMLElement)
      : document.querySelector<HTMLDivElement>(`[data-theme-id="${themeId}"]`)
  );

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

  return (
    <SelectBoxOutlet
      style={{
        backgroundColor: `hsl(${themeState.primary["DEFAULT"]}, 20%)`,
        border: `1px solid hsl(${themeState.primary["DEFAULT"]}, 100%)`,
      }}
      className={boxSelectionOptions.className}
    />
  );
}

export default BoxSelection;
