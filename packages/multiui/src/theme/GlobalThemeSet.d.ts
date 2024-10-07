import type { ThemeT } from "../types/MultiUIConfig";
import { Schemes } from "./Theme";
export type GlobalThisMultiUIType = {
    themes: {
        [key: string]: [dark: ThemeT, light: ThemeT];
    };
    defineThemeStylesInline: {
        [key: string]: boolean;
    };
    boxSelectionThemeSubscriptions: {
        themeId: string;
        cb: (theme: ThemeT | Schemes) => void;
    }[];
};
/**
 * # !!Internal component, don't use!!
 * Sets global values of MultiUI, including localstorage.
 */
declare function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, updateDocumentColorScheme, persistOnLocalstorage, }: {
    theme: ThemeT | Schemes;
    themeId: string;
    defineThemeStylesInline: boolean;
    updateDocumentColorScheme: boolean;
    persistOnLocalstorage: boolean;
}): null;
export default GlobalThemeSet;
