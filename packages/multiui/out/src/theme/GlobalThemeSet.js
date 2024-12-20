"use client";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { getColorSchemeSync } from "./useColorScheme";
import { setThemeToUI } from "./setTheme";
let alreadyUpdatedDocumentColorScheme = false;
/**
 * # !!Internal component, don't use!!
 * Sets global values of MultiUI, including localstorage.
 */
function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, updateDocumentColorScheme, persistOnLocalstorage, }) {
    let theme_was_cb_fn = typeof theme === "function";
    const ranOnce = useRef(false);
    const ranUseEffectOnce = useRef(false);
    const [value, setValue, removeValue] = useLocalStorage(`multiui-theme-${themeId}`, Array.isArray(theme) ? theme : [theme, theme]);
    useEffect(() => {
        if (!ranUseEffectOnce.current && typeof window !== "undefined") {
            ranUseEffectOnce.current = true;
            if (!persistOnLocalstorage) {
                removeValue();
            }
            else if (!localStorage.getItem(`multiui-theme-${themeId}`)) {
                setValue(Array.isArray(theme) ? theme : [theme, theme]);
            }
            if (theme_was_cb_fn) {
                console.log("setting theme based on color-scheme preference");
                setThemeToUI({ theme, themeId });
            }
        }
    }, []);
    useClearServerGlobalThis();
    if (typeof globalThis !== "undefined" && !ranOnce.current) {
        ranOnce.current = true;
        setDefaultGlobalValues({
            theme,
            themeId,
            defineThemeStylesInline,
            persistOnLocalstorage,
            setValue,
        });
    }
    useUpdateDocColorScheme(updateDocumentColorScheme, theme);
    return null;
}
export default GlobalThemeSet;
function useUpdateDocColorScheme(updateDocumentColorScheme, theme) {
    useEffect(() => {
        if (typeof document !== "undefined" &&
            updateDocumentColorScheme &&
            !alreadyUpdatedDocumentColorScheme) {
            alreadyUpdatedDocumentColorScheme = true;
            const root = document.querySelector("html");
            if (!root)
                throw new Error("Could not find html element to apply the colorScheme.");
            root.style.colorScheme = Array.isArray(theme)
                ? getColorSchemeSync() === "light"
                    ? theme[1].scheme
                    : theme[0].scheme
                : theme.scheme;
        }
    }, []);
    return null;
}
function useClearServerGlobalThis() {
    const ranOnce = useRef(false);
    if (!ranOnce.current && typeof window === "undefined") {
        ranOnce.current = true;
        //? ran on server, clear MultiUI from globalThis.
        //@ts-ignore - nextjs won't compile without this...
        if (typeof globalThis != "undefined" && globalThis.multiUI) {
            //@ts-ignore - nextjs won't compile without this...
            delete globalThis.multiUI;
        }
    }
}
function setDefaultGlobalValues({ theme, themeId, defineThemeStylesInline, persistOnLocalstorage, setValue, }) {
    if (typeof globalThis.multiUI === 'undefined') {
        globalThis.multiUI = {
            themes: {},
            defineThemeStylesInline: {},
        };
    }
    globalThis.multiUI = {
        ...globalThis.multiUI,
        themes: {
            ...globalThis.multiUI.themes,
            [themeId]: Array.isArray(theme) ? theme : [theme, theme],
        },
        defineThemeStylesInline: {
            ...globalThis.multiUI.defineThemeStylesInline,
            [themeId]: defineThemeStylesInline,
        },
    };
}
//# sourceMappingURL=GlobalThemeSet.js.map