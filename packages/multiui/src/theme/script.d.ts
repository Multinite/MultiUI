import { ThemeT } from "../types";
import { Schemes } from "./Theme";
export default function setThemeScript(args: {
    themeId: string;
    theme: ThemeT | Schemes;
    defineThemeStylesInline: boolean;
}): void;
