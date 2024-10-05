import { ThemeT } from "../types/MultiUIConfig";
declare function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, }: {
    theme: ThemeT;
    themeId?: string;
    defineThemeStylesInline: boolean;
}): null;
export default GlobalThemeSet;
