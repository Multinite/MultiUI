"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
//@ts-expect-error - intentional.
export const ThemeContext = createContext(null);
/**
 * This component is used internally only.
 *
 */
export function ThemeContextProvider({ children, themeId, }) {
    return (_jsx(ThemeContext.Provider, { value: {
            getThemeId: () => themeId,
        }, children: children }));
}
export function useInternalThemeContext() {
    return useContext(ThemeContext);
}
//# sourceMappingURL=ThemeContextProvider.js.map