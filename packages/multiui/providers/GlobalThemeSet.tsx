"use client";
import { Theme } from "../types/MultiUIConfig";
import { ThemeRenderOutputType } from "./Theme";

function GlobalThemeSet({
  theme,
  themeId,
  defineThemeStylesInline,
}: {
  theme: Theme;
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
  return null;
}

export default GlobalThemeSet;
