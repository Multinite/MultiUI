"use client";
import useSelectify from "use-selectify";
import { ThemeT } from "../types/MultiUIConfig";
import { ThemeRenderOutputType } from "./Theme";

function GlobalThemeSet({
  theme,
  themeId,
  defineThemeStylesInline,
}: {
  theme: ThemeT;
  themeId?: string;
  defineThemeStylesInline: boolean;
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
      lazyLoad: boxSelectionOptions.lazyLoad,
      activateOnMetaKey: boxSelectionOptions.activateOnMetaKey,
      disabled: boxSelectionOptions.disableOnMobile && isMobile,
      activateOnKey: boxSelectionOptions.activateOnKey,
      autoScroll: boxSelectionOptions.autoScroll,
      autoScrollEdgeDistance: boxSelectionOptions.autoScrollEdgeDistance,
      autoScrollStep: boxSelectionOptions.autoScrollStep,
      disableUnselection: boxSelectionOptions.disableUnselection,
      maxSelections: boxSelectionOptions.maxSelections,
    }
  );

  return null;
}

export default GlobalThemeSet;
