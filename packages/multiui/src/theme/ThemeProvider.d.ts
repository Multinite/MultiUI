import { type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
type ThemeContextType = {
    addThemeHook: (theme_id: string) => void;
    setTheme: (theme: ThemeT, themeId: string) => void;
    subscribe: (themeId: string, callback: (theme: ThemeT) => void) => () => void;
    getTheme: (themeId: string) => ThemeT;
};
export declare const ThemeContext: import("react").Context<ThemeContextType | undefined>;
export declare function ThemeProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
