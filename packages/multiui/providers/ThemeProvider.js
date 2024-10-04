"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useRef, } from "react";
import { getThemeFormatted } from "./Theme";
const ThemeContext = createContext(undefined);
export function useTheme(themeId) {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    if (!Object.keys(globalThis).includes("multiUI") ||
        !globalThis.multiUI.themes[themeId]) {
        throw new Error(`Invalid themeId: ${themeId}.\nIf it is defined, but still isn't working, it's likey due to the hook being called before the <Theme> Component is rendered.`);
    }
    context.addThemeHook(themeId);
    return {
        setTheme(callback) {
            context.setTheme(callback(context.getTheme(themeId)), themeId);
        },
        subscribe: (cb) => {
            return context.subscribe(themeId, cb);
        },
        getTheme: () => {
            return context.getTheme(themeId);
        },
    };
}
export default function ThemeProvider({ children }) {
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
                if (index === -1 || typeof window === "undefined")
                    return;
                themeHooks.current[index].theme = theme;
                themeHooks.current[index].subs.forEach((x) => x(theme));
                globalThis.multiUI.themes[themeId] = theme;
                const defineThemeStylesInline = globalThis.multiUI.defineThemeStylesInline[themeId];
                if (defineThemeStylesInline) {
                    const wrapperEl = document.querySelector(`[data-theme-id="${themeId}"]`);
                    if (!wrapperEl)
                        return;
                    removeCSSVariables(wrapperEl);
                    console.log(`el`, wrapperEl);
                    const styleObj = getThemeFormatted({
                        theme,
                        outputType: "inline-style-object",
                    });
                    wrapperEl.style.cssText = Object.entries(styleObj).map(([key, value]) => {
                        return `${key}: ${value};`;
                    }).join("");
                }
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
// {/* <MultiUIThemeContext.Provider */}
// // value={{
// //   theme: theme_ref.current,
// //   setTheme: (cb) => {
// //     const newTheme = cb(theme_ref.current);
// //     theme_ref.current = newTheme;
// //     subs.current.forEach((x) => x(newTheme));
// //     // update theme
// //     if (!wrapperEl.current) return;
// //     wrapperEl.current.removeAttribute("style");
// //     wrapperEl.current.setAttribute(
// //       "style",
// //       reactCSSToString(style) +
// //         getThemeFormatted({
// //           theme: newTheme,
// //           outputType: "inline-style-string",
// //         })
// //     );
// //   },
// //   subscribe: (cb) => {
// //     subs.current.push(cb);
// //     return () => {
// //       subs.current = subs.current.filter((x) => x !== cb);
// //     };
// //   },
// // }}
// {/* > */}
function removeCSSVariables(element) {
    const style = element.style;
    for (let i = style.length - 1; i >= 0; i--) {
        const prop = style[i];
        if (prop.startsWith("--")) {
            style.removeProperty(prop);
            console.log(`removing: `, prop);
        }
    }
}
//# sourceMappingURL=ThemeProvider.js.map