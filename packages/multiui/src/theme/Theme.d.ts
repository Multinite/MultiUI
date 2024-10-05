import { type HTMLAttributes, type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
declare const Theme: import("react").ForwardRefExoticComponent<{
    theme: ThemeT;
    children?: ReactNode;
    defineThemeStylesInline?: boolean;
    themeId?: string;
} & HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export default Theme;
export type ThemeRenderOutputType = "style-element" | "inline-style-string" | "inline-style-object";
export declare const getThemeFormatted: <
/**
 * style-element: <style>HERE</style> - string
 * inline-style-string: <div style="HERE"></div> - string
 * inline-style-object: <div style="HERE"></div> - Record<string, string>
 */
OutputType extends ThemeRenderOutputType>(props: {
    theme: ThemeT;
    theme_prefix?: string;
    outputType?: OutputType;
    custom_className?: string;
}) => OutputType extends "inline-style-string" ? string : OutputType extends "inline-style-object" ? Record<string, string> : string;
