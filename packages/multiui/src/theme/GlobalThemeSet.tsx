"use client";
import useSelectify from "use-selectify";
import { ThemeT } from "../types/MultiUIConfig";
import { isMobile } from "react-device-detect";
import { useEffect, useRef, useState } from "react";

export type GlobalThisMultiUIType = {
  themes: { [key: string]: ThemeT };
  defineThemeStylesInline: { [key: string]: boolean };
  boxSelectionThemeSubscriptions: {
    themeId: string;
    cb: (theme: ThemeT) => void;
  }[];
};

function GlobalThemeSet({
  theme,
  themeId,
  defineThemeStylesInline,
  enableBoxSelection,
  boxSelectionOptions,
}: {
  theme: ThemeT;
  themeId?: string;
  enableBoxSelection: boolean;
  defineThemeStylesInline: boolean;
  boxSelectionOptions: {
    /**
     * Enable lazy loading of the box selection feature.
     *
     * @default true
     */
    lazyLoad?: boolean;
    /**
     * Disable box selection on mobile devices.
     *
     * @deafult true
     */
    disableOnMobile?: boolean;
    /**
     * Only enables the selection box if the user was pressing a meta key while initiating the drag. Included meta keys are: Shift, Ctrl, Cmd and Alt.
     * @default true
     */
    activateOnMetaKey?: boolean;
    /**
     * Only enables the selection box if the user was pressing a specified key while initiating the drag.
     *
     * @default undefined
     */
    activateOnKey?: string[];
    /**
     * Automatically try to scroll the window when the pointer approaches the viewport edge while dragging.
     *
     * @default true
     */
    autoScroll?: boolean;
    /**
     * Distance in px from the viewport's edges from which the box will try scrolling the window when the pointer approaches the viewport edge while dragging.
     * @default 100
     */
    autoScrollEdgeDistance?: number;
    /**
     * Auto scroll speed.
     * @default 30
     */
    autoScrollStep?: number;
    /**
     * Will keep every item selected after selection. Can be cleared with clearSelection()
     * @default false
     */
    disableUnselection?: boolean;
    /**
     * Maximum number of elements that can be selected. Will stop selecting after reaching that number and keep already selected elements. false = Infinite
     * @default Infinity
     */
    maxSelections?: number | false;
  };
}) {
  const [themeState, setThemeState] = useState<ThemeT>(theme);
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
      } satisfies GlobalThisMultiUIType;
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
      } satisfies GlobalThisMultiUIType;
    }
  }
  if (!enableBoxSelection) return null;

  const element = useRef(
    typeof document === "undefined"
      ? (null as never as HTMLElement)
      : document.querySelector<HTMLDivElement>(`[data-theme-id="${themeId}"]`)
  );

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

  return (
    <SelectBoxOutlet
      style={{
        backgroundColor: `hsl(${themeState.primary["DEFAULT"]}, 20%)`,
        border: `1px solid hsl(${themeState.primary["DEFAULT"]}, 100%)`,
      }}
    />
  );
}

export default GlobalThemeSet;
