"use client";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { useInternalThemeContext } from "./ThemeContextProvider";
export function useTheme(options = {
    rerenderOnThemeChange: true,
}) {
    let { themeId = useInternalThemeContext().getThemeId() } = options;
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
//# sourceMappingURL=useTheme.js.map