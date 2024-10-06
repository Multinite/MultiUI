import { type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
type UseThemeReturnType = {
    getTheme: () => ThemeT;
    setTheme: (callback: ThemeT | ((current_theme: ThemeT) => ThemeT)) => void;
    subscribe: (callback: (theme: ThemeT) => void) => () => void;
};
type UseThemeWithRerenderReturnType = {
    theme: ThemeT;
    setTheme: (callback: ThemeT | ((current_theme: ThemeT) => ThemeT)) => void;
    subscribe: (callback: (theme: ThemeT) => void) => () => void;
};
export declare function useTheme<RerenderOnThemeChange extends boolean = true>(themeId: string, options?: {
    rerenderOnThemeChange: RerenderOnThemeChange;
}): RerenderOnThemeChange extends true ? UseThemeWithRerenderReturnType : UseThemeReturnType;
export declare function ThemeProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
