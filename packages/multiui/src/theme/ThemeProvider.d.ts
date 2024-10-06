import { type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
type UseThemeReturnType = {
    /**
     * Get the current theme.
     *
     * @returns the current theme
     */
    getTheme: () => ThemeT;
    /**
     * Set the current theme.
     *
     * @param callback_or_theme - The new theme to set. If a function is passed, it will be called with the current theme as an argument and the result will be set as the new theme.
     *
     * @returns void
     */
    setTheme: (callback: ThemeT | ((current_theme: ThemeT) => ThemeT)) => void;
    /**
     * Subscribe to theme changes.
     *
     * @param callback - The callback to be called when the theme changes.
     *
     * @returns a function that unsubscribes the callback.
     */
    subscribe: (callback: (theme: ThemeT) => void) => () => void;
};
type UseThemeWithRerenderReturnType = {
    /**
     * The current theme.
     */
    theme: ThemeT;
    /**
     * Set the current theme.
     *
     * @param callback_or_theme - The new theme to set. If a function is passed, it will be called with the current theme as an argument and the result will be set as the new theme.
     *
     * @returns void
     */
    setTheme: (callback: ThemeT | ((current_theme: ThemeT) => ThemeT)) => void;
    /**
     * Subscribe to theme changes.
     *
     * @param callback - The callback to be called when the theme changes.
     *
     * @returns a function that unsubscribes the callback.
     */
    subscribe: (callback: (theme: ThemeT) => void) => () => void;
};
export declare function useTheme<RerenderOnThemeChange extends boolean = true>(themeId: string, options?: {
    rerenderOnThemeChange: RerenderOnThemeChange;
}): RerenderOnThemeChange extends true ? UseThemeWithRerenderReturnType : UseThemeReturnType;
export declare function ThemeProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
