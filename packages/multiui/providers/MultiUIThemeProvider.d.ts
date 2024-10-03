import type { HTMLAttributes, ReactNode } from "react";
import type { Theme } from "../types/MultiUIConfig";
declare function MultiUITheme({ theme, style, defineThemeStylesInline, ...attr }: {
    theme: Theme;
    children: ReactNode;
    defineThemeStylesInline?: boolean;
} & HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export default MultiUITheme;
