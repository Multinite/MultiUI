"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState, } from "react";
import { setThemeToUI } from "./setTheme";
const ThemeContext = createContext(undefined);
export function useTheme(themeId, options = {
    rerenderOnThemeChange: true,
}) {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a <ThemeProvider>");
    }
    if (!Object.keys(globalThis).includes("multiUI") ||
        !globalThis.multiUI.themes[themeId]) {
        throw new Error(`Invalid themeId: ${themeId}.\nIf it is defined, but still isn't working, it's likey due to the hook being called before the <Theme> Component is rendered.\nYou can think of this <Theme> Component as a Provider which should be rendered before any children component can use a hook to consume it.`);
    }
    context.addThemeHook(themeId);
    if (!options.rerenderOnThemeChange)
        //@ts-expect-error - intentional
        return {
            setTheme(theme_or_callback) {
                context.setTheme(typeof theme_or_callback === "function"
                    ? theme_or_callback(context.getTheme(themeId))
                    : theme_or_callback, themeId);
            },
            subscribe: (cb) => {
                return context.subscribe(themeId, cb);
            },
            getTheme: () => {
                return context.getTheme(themeId);
            },
        };
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
            context.setTheme(typeof theme_or_callback === "function"
                ? theme_or_callback(context.getTheme(themeId))
                : theme_or_callback, themeId);
        },
        subscribe: (cb) => {
            return context.subscribe(themeId, cb);
        },
    };
}
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
            getTheme: (themeId) => themeHooks.current.find((x) => x.themeId === themeId).theme,
        }, children: children }));
}
//# sourceMappingURL=ThemeProvider.js.map