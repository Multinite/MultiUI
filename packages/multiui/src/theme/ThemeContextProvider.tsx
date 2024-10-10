"use client";
import { createContext, useContext, type ReactNode } from "react";

type ThemeContextType = {
  getThemeId: () => string;
};

//@ts-expect-error - intentional.
export const ThemeContext = createContext<ThemeContextType>(null);

/**
 * This component is used internally only.
 *
 */
function ThemeContextProvider({
  children,
  themeId,
}: {
  children?: ReactNode;
  themeId: string;
}) {
  return (
    <ThemeContext.Provider
      value={{
        getThemeId: () => themeId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

export function useInternalThemeContext() {
  return useContext(ThemeContext);
}
