"use client";
import type { ThemeT } from "../types/MultiUIConfig";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";

export type GlobalThisMultiUIType = {
  themes: { [key: string]: ThemeT };
  defineThemeStylesInline: { [key: string]: boolean };
  boxSelectionThemeSubscriptions: {
    themeId: string;
    cb: (theme: ThemeT) => void;
  }[];
};

let alreadyUpdatedDocumentColorScheme = false;

/**
 * # !!Internal component, don't use!!
 * Sets global values of MultiUI, including localstorage.
 */
function GlobalThemeSet({
  theme,
  themeId,
  defineThemeStylesInline,
  updateDocumentColorScheme,
  persistOnLocalstorage,
}: {
  theme: ThemeT;
  themeId: string;
  defineThemeStylesInline: boolean;
  updateDocumentColorScheme: boolean;
  persistOnLocalstorage: boolean;
}) {
  const ranOnce = useRef(false);
  const ranUseEffectOnce = useRef(false);
  const [value, setValue, removeValue] = useLocalStorage<ThemeT>(
    `multiui-theme-${themeId}`,
    theme
  );
  if (!persistOnLocalstorage) {
    removeValue();
  }

  useEffect(() => {
    if (!ranUseEffectOnce.current && typeof window !== "undefined") {
      ranUseEffectOnce.current = true;
      if (!localStorage.getItem(`multiui-theme-${themeId}`)) {
        setValue(theme);
      }
    }
  }, []);

  if (!ranOnce.current && typeof window === "undefined") {
    //? ran on server, clear MultiUI from globalThis.
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

    //TODO: probably make this support react's dynamic-ness... if a value changes on the prop, it won't reflect if programmed like this:
    //? possible solution is to keep this, but add a useEffect for each prop that changes
    if (!ranOnce.current) {
      ranOnce.current = true;

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
          ...(persistOnLocalstorage
            ? [
                {
                  [themeId]: {
                    themeId,
                    cb: (theme: ThemeT) => {
                      if (persistOnLocalstorage) setValue(theme);
                    },
                  },
                },
              ]
            : []),
        ],
      } satisfies GlobalThisMultiUIType;
    }
  }
  useUpdateDocColorScheme(updateDocumentColorScheme, theme);
  return null;
}

export default GlobalThemeSet;

function useUpdateDocColorScheme(
  updateDocumentColorScheme: boolean,
  theme: ThemeT
) {
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      updateDocumentColorScheme &&
      !alreadyUpdatedDocumentColorScheme
    ) {
      alreadyUpdatedDocumentColorScheme = true;
      const root = document.querySelector<HTMLHtmlElement>("html");
      if (!root)
        throw new Error(
          "Could not find html element to apply the colorScheme."
        );
      root.style.colorScheme = theme.scheme;
    }
  }, []);
  return null;
}
