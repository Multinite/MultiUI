import type { ThemeT } from "../types/MultiUIConfig";
import { Schemes } from "./Theme";
export type GlobalThisMultiUIType = {
    themes: {
        [key: string]: [dark: ThemeT, light: ThemeT];
    };
    defineThemeStylesInline: {
        [key: string]: boolean;
    };
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
declare global {
    interface MultiUI extends GlobalThisMultiUIType {
    }
    var multiUI: MultiUI;
}
