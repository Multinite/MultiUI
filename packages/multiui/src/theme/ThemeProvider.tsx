"use client";
import { createContext, type ReactNode, useRef } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
import { setThemeToUI } from "./setTheme";
import type { Schemes } from "./Theme";
import { getColorSchemeSync } from "./useColorScheme";

type ThemeContextType = {
  addThemeHook: (theme_id: string) => void;
  setTheme: (theme: ThemeT, themeId: string) => void;
  subscribe: (themeId: string, callback: (theme: ThemeT) => void) => () => void;
  getTheme: (themeId: string) => ThemeT;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeHooks = useRef<
    {
      themeId: string;
      theme: ThemeT | Schemes;
      subs: ((theme: ThemeT) => void)[];
    }[]
  >([]);

  return (
    <ThemeContext.Provider
      value={{
        addThemeHook: (id) => {
          if (themeHooks.current.find((x) => x.themeId === id)) return;
          themeHooks.current.push({
            themeId: id,
            theme: globalThis.multiUI.themes[id],
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
        getTheme: (themeId) => {
          const currentScheme = getColorSchemeSync();
          const f = themeHooks.current.find(
            (x) => x.themeId === themeId
          )!.theme;
          return Array.isArray(f)
            ? currentScheme === "light"
              ? f[1]
              : f[0]
            : f;
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
