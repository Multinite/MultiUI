import { Theme } from "../types/MultiUIConfig";
declare function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, }: {
    theme: Theme;
    themeId?: string;
    defineThemeStylesInline: boolean;
}): null;
export default GlobalThemeSet;
