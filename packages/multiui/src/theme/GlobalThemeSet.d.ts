import type { ThemeT } from "../types/MultiUIConfig";
export type GlobalThisMultiUIType = {
    themes: {
        [key: string]: ThemeT;
    };
    defineThemeStylesInline: {
        [key: string]: boolean;
    };
    boxSelectionThemeSubscriptions: {
        themeId: string;
        cb: (theme: ThemeT) => void;
    }[];
};
/**
 * # !!Internal component, don't use!!
 * Sets global values of MultiUI, including localstorage.
 */
declare function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, updateDocumentColorScheme, persistOnLocalstorage, }: {
    theme: ThemeT | ((args: {
        prefers_color_scheme: "dark" | "light" | undefined;
    }) => ThemeT);
    themeId: string;
    defineThemeStylesInline: boolean;
    updateDocumentColorScheme: boolean;
    persistOnLocalstorage: boolean;
}): null;
export default GlobalThemeSet;
