"use client";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useColorScheme } from "./useColorScheme";
import { setThemeToUI } from "./setTheme";
let alreadyUpdatedDocumentColorScheme = false;
/**
 * # !!Internal component, don't use!!
 * Sets global values of MultiUI, including localstorage.
 */
function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, updateDocumentColorScheme, persistOnLocalstorage, }) {
    let theme_was_cb_fn = typeof theme === "function";
    theme =
        typeof theme === "function"
            ? theme({ prefers_color_scheme: useColorScheme() })
            : theme;
    const ranOnce = useRef(false);
    const ranUseEffectOnce = useRef(false);
    const [value, setValue, removeValue] = useLocalStorage(`multiui-theme-${themeId}`, theme);
    if (!persistOnLocalstorage) {
        removeValue();
    }
    useEffect(() => {
        if (!ranUseEffectOnce.current && typeof window !== "undefined") {
            ranUseEffectOnce.current = true;
            if (!localStorage.getItem(`multiui-theme-${themeId}`)) {
                setValue(theme);
            }
            if (theme_was_cb_fn) {
                console.log('setting theme based on color-scheme preference');
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
            root.style.colorScheme = theme.scheme;
        }
    }, []);
    return null;
}
function useClearServerGlobalThis() {
    const ranOnce = useRef(false);
    if (!ranOnce.current && typeof window === "undefined") {
        ranOnce.current = true;
        //? ran on server, clear MultiUI from globalThis.
        if (globalThis.multiUI) {
            delete globalThis.multiUI;
        }
    }
}
// function useSetInitialGlobalValues({
//   initialTheme,
//   initialThemeId,
//   defineThemeStylesInline,
//   persistOnLocalstorage,
//   setValue,
// }: {
//   initialTheme: ThemeT;
//   initialThemeId: string;
//   defineThemeStylesInline: boolean;
//   persistOnLocalstorage: boolean;
//   setValue: Dispatch<SetStateAction<ThemeT>>;
// }) {
//   setDefaultGlobalValues({
//     theme: initialTheme,
//     themeId: initialThemeId,
//     defineThemeStylesInline,
//     persistOnLocalstorage,
//     setValue,
//   });
// }
function setDefaultGlobalValues({ theme, themeId, defineThemeStylesInline, persistOnLocalstorage, setValue, }) {
    if (!globalThis["multiUI"]) {
        globalThis.multiUI = {
            themes: {},
            defineThemeStylesInline: {},
            boxSelectionThemeSubscriptions: [],
        };
    }
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
                            cb: (theme) => {
                                if (persistOnLocalstorage)
                                    setValue(theme);
                            },
                        },
                    },
                ]
                : []),
        ],
    };
}
//# sourceMappingURL=GlobalThemeSet.js.map