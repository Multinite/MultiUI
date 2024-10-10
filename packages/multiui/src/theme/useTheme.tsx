"use client";

import { useContext, useEffect, useState } from "react";
import type { ThemeT } from "../types";
import { ThemeContext } from "./ThemeProvider";
import { useInternalThemeContext } from "./ThemeContextProvider";

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

export function useTheme<RerenderOnThemeChange extends boolean = true>(
  options: {
    rerenderOnThemeChange: RerenderOnThemeChange;
    themeId?: string;
  } = {
    rerenderOnThemeChange: true as RerenderOnThemeChange,
  }
): RerenderOnThemeChange extends true
  ? UseThemeWithRerenderReturnType
  : UseThemeReturnType {
  let { themeId = useInternalThemeContext().getThemeId() } = options;

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
