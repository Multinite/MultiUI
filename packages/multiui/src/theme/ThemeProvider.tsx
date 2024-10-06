"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ThemeT } from "../types/MultiUIConfig";
import { getThemeFormatted } from "./Theme";
import { GlobalThisMultiUIType } from "./GlobalThemeSet";

type UseThemeReturnType = {
  /**
   * Get the current theme.
   *
   * @returns the current theme
   */
  getTheme: () => ThemeT;
  /**
   * Set the current theme.
   *
   * @param callback_or_theme - The new theme to set. If a function is passed, it will be called with the current theme as an argument and the result will be set as the new theme.
   *
   * @returns void
   */
  setTheme: (callback: ThemeT | ((current_theme: ThemeT) => ThemeT)) => void;
  /**
   * Subscribe to theme changes.
   *
   * @param callback - The callback to be called when the theme changes.
   *
   * @returns a function that unsubscribes the callback.
   */
  subscribe: (callback: (theme: ThemeT) => void) => () => void;
};
type UseThemeWithRerenderReturnType = {
  /**
   * The current theme.
   */
  theme: ThemeT;
  /**
   * Set the current theme.
   *
   * @param callback_or_theme - The new theme to set. If a function is passed, it will be called with the current theme as an argument and the result will be set as the new theme.
   *
   * @returns void
   */
  setTheme: (callback: ThemeT | ((current_theme: ThemeT) => ThemeT)) => void;
  /**
   * Subscribe to theme changes.
   *
   * @param callback - The callback to be called when the theme changes.
   *
   * @returns a function that unsubscribes the callback.
   */
  subscribe: (callback: (theme: ThemeT) => void) => () => void;
};
type ThemeContextType = {
  addThemeHook: (theme_id: string) => void;
  setTheme: (theme: ThemeT, themeId: string) => void;
  subscribe: (themeId: string, callback: (theme: ThemeT) => void) => () => void;
  getTheme: (themeId: string) => ThemeT;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme<RerenderOnThemeChange extends boolean = true>(
  themeId: string,
  options: { rerenderOnThemeChange: RerenderOnThemeChange } = {
    rerenderOnThemeChange: true as RerenderOnThemeChange,
  }
): RerenderOnThemeChange extends true
  ? UseThemeWithRerenderReturnType
  : UseThemeReturnType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }

  if (
    !Object.keys(globalThis).includes("multiUI") ||
    !globalThis.multiUI.themes[themeId]
  ) {
    throw new Error(
      `Invalid themeId: ${themeId}.\nIf it is defined, but still isn't working, it's likey due to the hook being called before the <Theme> Component is rendered.\nYou can think of this <Theme> Component as a Provider which should be rendered before any children component can use a hook to consume it.`
    );
  }
  context.addThemeHook(themeId);
  if (!options.rerenderOnThemeChange)
    //@ts-expect-error - intentional
    return {
      setTheme(theme_or_callback) {
        context.setTheme(
          typeof theme_or_callback === "function"
            ? theme_or_callback(context.getTheme(themeId))
            : theme_or_callback,
          themeId
        );
      },
      subscribe: (cb) => {
        return context.subscribe(themeId, cb);
      },

      getTheme: () => {
        return context.getTheme(themeId);
      },
    } satisfies UseThemeReturnType;

  const [theme, setTheme] = useState(context.getTheme(themeId));

  useEffect(() => {
    const sub = context.subscribe(themeId, (new_theme) => {
      setTheme(new_theme);
    });
    return sub;
  }, []);

  //@ts-expect-error - intentional
  return {
    theme: theme,
    setTheme(theme_or_callback) {
      context.setTheme(
        typeof theme_or_callback === "function"
          ? theme_or_callback(context.getTheme(themeId))
          : theme_or_callback,
        themeId
      );
    },
    subscribe: (cb) => {
      return context.subscribe(themeId, cb);
    },
  } satisfies UseThemeWithRerenderReturnType;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeHooks = useRef<
    { themeId: string; theme: ThemeT; subs: ((theme: ThemeT) => void)[] }[]
  >([]);

  return (
    <ThemeContext.Provider
      value={{
        addThemeHook: (id) => {
          if (themeHooks.current.find((x) => x.themeId === id)) return;
          themeHooks.current.push({
            themeId: id,
            theme: globalThis.multiUI.themes[id] as ThemeT,
            subs: [],
          });
        },
        setTheme: (theme, themeId) => {
          const index = themeHooks.current.findIndex(
            (x) => x.themeId === themeId
          );
          if (
            index === -1 ||
            typeof window === "undefined" ||
            !globalThis.multiUI
          )
            return;
          const globalMultiUIObj = globalThis.multiUI as GlobalThisMultiUIType;
          themeHooks.current[index].theme = theme;
          themeHooks.current[index].subs.forEach((x) => x(theme));
          globalMultiUIObj.boxSelectionThemeSubscriptions
            .filter((x) => x.themeId === themeId)
            .forEach(({ cb }) => cb(theme));
          const oldTheme = globalThis.multiUI.themes[themeId];
          globalThis.multiUI.themes[themeId] = theme;

          const defineThemeStylesInline =
            globalThis.multiUI.defineThemeStylesInline[themeId];
          if (defineThemeStylesInline) {
            const wrapperEl = document.querySelector<HTMLDivElement>(
              `[data-theme-id="${themeId}"]`
            );
            if (!wrapperEl)
              throw new Error(
                `Failed to setTheme, no <div> element found representing the "${themeId}" themeId.`
              );
            removeCSSVariables(wrapperEl);
            const styleObj = getThemeFormatted({
              theme,
              outputType: "inline-style-object",
            });
            wrapperEl.style.cssText = Object.entries(styleObj)
              .map(([key, value]) => {
                return `${key}: ${value};`;
              })
              .join("");
          } else {
            const styleEl = document.querySelector<HTMLStyleElement>(
              `[data-style-theme-id="${themeId}"]`
            );
            const wrapperEl = document.querySelector<HTMLDivElement>(
              `[data-theme-id="${themeId}"]`
            );
            if (!styleEl)
              throw new Error(
                `Failed to setTheme, no <style> element found representing the "${themeId}" themeId.`
              );
            if (!wrapperEl)
              throw new Error(
                `Failed to setTheme, no wrapper element found representing the "${themeId}" themeId.`
              );
            styleEl.innerHTML = getThemeFormatted({
              theme,
              outputType: "style-element",
            });
            wrapperEl.classList.remove(`${oldTheme.name}_theme`);
            wrapperEl.classList.add(`${theme.name}_theme`);
          }
        },
        subscribe: (themeId, callback) => {
          const index = themeHooks.current.findIndex(
            (x) => x.themeId === themeId
          );
          if (index === -1) return () => {};
          themeHooks.current[index].subs.push(callback);
          return () => {
            themeHooks.current[index].subs = themeHooks.current[
              index
            ].subs.filter((x) => x !== callback);
          };
        },
        getTheme: (themeId) =>
          themeHooks.current.find((x) => x.themeId === themeId)!.theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function removeCSSVariables(element: HTMLElement) {
  const style = element.style;
  for (let i = style.length - 1; i >= 0; i--) {
    const prop = style[i];
    if (prop.startsWith("--")) {
      style.removeProperty(prop);
    }
  }
}
