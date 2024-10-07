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
import { setThemeToUI } from "./setTheme";

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
          themeHooks.current[index].theme = theme;
          themeHooks.current[index].subs.forEach((x) => x(theme));
          setThemeToUI({
            theme,
            themeId,
          });
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
