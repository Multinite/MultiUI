import { MultiUIConfig, Theme } from "../types/MultiUIConfig.js";
type MultiUIProvider = {
    setTheme: (theme_name: string) => void;
    currentTheme: string | undefined;
    currentThemeValue: Theme | undefined;
    themes: string[];
    addTheme: (theme: Theme | Theme[]) => void;
    onThemeChange: (callback: (themeName: MultiUIProvider["currentTheme"], themeValues: MultiUIProvider["currentThemeValue"]) => void) => () => void;
};
declare const default_theme: Theme;
/**
 *
 * @example
 *
 * ```tsx
 * <MultiUIProvider config={MultiUIProviderProps(multiui_config)}>
 *   <App />
 * </MultiUIProvider>
 * ```
 *
 * @param props Use the `MultiUIProviderProps` function to pass props to this component.
 * @returns
 */
export declare const MultiUIProvider: import("react").NamedExoticComponent<{
    config?: {
        theme_prefix?: MultiUIConfig["theme_prefix"];
    };
    /**
     * Apply a blur effect to the page when the theme changes.
     * @default false
     */
    blurOnThemeChange?: boolean;
    children: React.ReactNode;
}>;
export { default_theme as multiUI_defaultTheme };
export declare const useTheme: () => MultiUIProvider;
