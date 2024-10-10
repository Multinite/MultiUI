"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useRef } from "react";
import { setThemeToUI } from "./setTheme";
import { getColorSchemeSync } from "./useColorScheme";
export const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const themeHooks = useRef([]);
    return (_jsx(ThemeContext.Provider, { value: {
            addThemeHook: (id) => {
                if (themeHooks.current.find((x) => x.themeId === id))
                    return;
                themeHooks.current.push({
                    themeId: id,
                    theme: globalThis.multiUI.themes[id],
                    subs: [],
                });
            },
            setTheme: (theme, themeId) => {
                const index = themeHooks.current.findIndex((x) => x.themeId === themeId);
                if (index === -1 ||
                    typeof window === "undefined" ||
                    !globalThis.multiUI)
                    return;
                themeHooks.current[index].theme = theme;
                themeHooks.current[index].subs.forEach((x) => x(theme));
                setThemeToUI({
                    theme,
                    themeId,
                });
            },
            subscribe: (themeId, callback) => {
                const index = themeHooks.current.findIndex((x) => x.themeId === themeId);
                if (index === -1)
                    return () => { };
                themeHooks.current[index].subs.push(callback);
                return () => {
                    themeHooks.current[index].subs = themeHooks.current[index].subs.filter((x) => x !== callback);
                };
            },
            getTheme: (themeId) => {
                const currentScheme = getColorSchemeSync();
                const f = themeHooks.current.find((x) => x.themeId === themeId).theme;
                return Array.isArray(f)
                    ? currentScheme === "light"
                        ? f[1]
                        : f[0]
                    : f;
            },
        }, children: children }));
}
//# sourceMappingURL=ThemeProvider.js.map