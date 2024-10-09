import { ThemeT } from "../types";
import { Schemes } from "./Theme";
declare const setThemeScript: (args: {
    themeId: string;
    theme: ThemeT | Schemes;
    defineThemeStylesInline: boolean;
}) => void;
export default setThemeScript;
