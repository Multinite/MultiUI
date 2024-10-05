"use client";
import useSelectify from "use-selectify";
import { ThemeT } from "../types/MultiUIConfig";
import { isMobile } from "react-device-detect";

function GlobalThemeSet({
  theme,
  themeId,
  defineThemeStylesInline,
  enableBoxSelection,
  boxSelectionOptions = {
    activateOnKey: undefined,
    activateOnMetaKey: false,
    disableOnMobile: true,
    lazyLoad: true,
    autoScroll: true,
    autoScrollEdgeDistance: 100,
    autoScrollStep: 30,
    disableUnselection: false,
    maxSelections: Number.POSITIVE_INFINITY,
  },
}: {
  theme: ThemeT;
  themeId?: string;
  enableBoxSelection: boolean;
  defineThemeStylesInline: boolean;
  boxSelectionOptions?: {
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
  const { SelectBoxOutlet } = useSelectify(
    {
      current:
        typeof document === "undefined"
          ? (null as never as HTMLElement)
          : document.querySelector<HTMLDivElement>(
              `[data-theme-id="${themeId}"]`
            ),
    },
    {
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
    }
  );

  return <SelectBoxOutlet />;
}

export default GlobalThemeSet;
