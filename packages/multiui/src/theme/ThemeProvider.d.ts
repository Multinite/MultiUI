import { type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
export declare function useTheme(themeId: string): {
    setTheme(theme_or_callback: ThemeT | ((current_theme: ThemeT) => ThemeT)): void;
    subscribe: (cb: (theme: ThemeT) => void) => () => void;
    getTheme: () => ThemeT;
};
export declare function ThemeProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
