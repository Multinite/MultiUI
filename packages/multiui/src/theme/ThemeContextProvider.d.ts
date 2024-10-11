import { type ReactNode } from "react";
type ThemeContextType = {
    getThemeId: () => string;
};
export declare const ThemeContext: import("react").Context<ThemeContextType>;
/**
 * This component is used internally only.
 *
 */
declare function ThemeContextProvider({ children, themeId, }: {
    children?: ReactNode;
    themeId: string;
}): import("react/jsx-runtime").JSX.Element;
export default ThemeContextProvider;
export declare function useInternalThemeContext(): ThemeContextType;