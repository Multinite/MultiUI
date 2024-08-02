"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { MultiUIConfig, Theme } from "../types/MultiUIConfig";

type MultiUIProvider = {
  setTheme: (theme_name: string) => void;
  theme: string;
};

//@ts-ignore
const MultiUIContext = createContext<MultiUIProvider>({
  setTheme(theme_name) {},
  theme: undefined,
} as MultiUIProvider);

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
function MultiUIProvider({
  config,
  children,
}: {
  config: {
    themes: MultiUIConfig["themes"];
    default_theme: MultiUIConfig["default_theme"];
    theme_prefix?: MultiUIConfig["theme_prefix"];
  };
  children: React.ReactNode;
}) {
  const [currentTheme, $currentTheme] = useState<string>(
    config.themes.find((x) => x.name === config.default_theme)
      ? config.default_theme
      : "default"
  );
  const theme_prefix = (config.theme_prefix || "multiui") as "multiui";

  const default_theme: Theme = {
    name: "default",
    background: {
      DEFAULT: "hsl(0 0% 45.1%)",
      50: "NOT IMPLEMENTED",
      100: "hsl(0 0% 36.86%)",
      200: "hsl(0 0% 29.02%)",
      300: "hsl(0 0% 21.18%)",
      400: "hsl(0 0% 14.12%)",
      500: "hsl(0 0% 11.76%)",
      600: "hsl(0 0% 9.41%)",
      700: "hsl(0 0% 7.06%)",
      800: "hsl(0 0% 4.71%)",
      900: "hsl(0 0% 4.71%)",
    },
    foreground: {
      DEFAULT: "hsl(0 0% 100%)",
      50: "hsl(0 0% 98.04%)",
      100: "hsl(0 0% 98.04%)",
      200: "hsl(0 0% 98.04%)",
      300: "hsl(0 0% 98.04%)",
      400: "hsl(0 0% 98.04%)",
      500: "hsl(0 0% 98.04%)",
      600: "hsl(0 0% 98.04%)",
      700: "hsl(0 0% 98.04%)",
      800: "hsl(0 0% 98.04%)",
      900: "hsl(0 0% 98.04%)",
    },
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
    },
    danger: {
      DEFAULT: "hsl(340 84.91% 10.39%)",
      50: "hsl(340 84.91% 10.39%)",
      100: "hsl(339.3299999999999 86.54% 20.39%)",
      200: "hsl(339.11 85.99% 30.78%)",
      300: "hsl(339 86.54% 40.78%)",
      400: "hsl(339.20000000000005 90.36% 51.18%)",
      500: "hsl(339 90% 60.78%)",
      600: "hsl(339.11 90.6% 70.78%)",
      700: "hsl(339.3299999999999 90% 80.39%)",
      800: "hsl(340 91.84% 90.39%)",
      900: "hsl(339.13 92% 95.1%)",
      foreground: "hsl(0 0% 100%)",
    },
    default: {
      DEFAULT: "hsl(240 5.26% 26.08%)",
      50: "hsl(240 5.88% 10%)",
      100: "hsl(240 3.7% 15.88%)",
      200: "hsl(240 5.26% 26.08%)",
      300: "hsl(240 5.2% 33.92%)",
      400: "hsl(240 3.83% 46.08%)",
      500: "hsl(240 5.03% 64.9%)",
      600: "hsl(240 4.88% 83.92%)",
      700: "hsl(240 5.88% 90%)",
      800: "hsl(240 4.76% 95.88%)",
      900: "hsl(0 0% 98.04%)",
    },
    info: {
      DEFAULT: "hsl(145 71.96% 92.94%)",
      50: "hsl(145 71.96% 92.94%)",
      100: "hsl(145 71.96% 92.94%)",
      200: "hsl(145 71.96% 92.94%)",
      300: "hsl(145 71.96% 92.94%)",
      400: "hsl(145 71.96% 92.94%)",
      500: "hsl(145 71.96% 92.94%)",
      600: "hsl(145 71.96% 92.94%)",
      700: "hsl(145 71.96% 92.94%)",
      800: "hsl(145 71.96% 92.94%)",
      900: "hsl(145 71.96% 92.94%)",
      foreground: "hsl(0 0% 100%)",
    },
    warning: {
      DEFAULT: "hsl(37.139999999999986 75% 10.98%)",
      50: "hsl(37.139999999999986 75% 10.98%)",
      100: "hsl(37.139999999999986 75% 21.96%)",
      200: "hsl(36.95999999999998 73.96% 33.14%)",
      300: "hsl(37.00999999999999 74.22% 44.12%)",
      400: "hsl(37.02999999999997 91.27% 55.1%)",
      500: "hsl(37.00999999999999 91.26% 64.12%)",
      600: "hsl(36.95999999999998 91.24% 73.14%)",
      700: "hsl(37.139999999999986 91.3% 81.96%)",
      800: "hsl(37.139999999999986 91.3% 90.98%)",
      900: "hsl(54.55000000000001 91.67% 95.29%)",
      foreground: "hsl(0 0% 0%)",
    },
    primary: {
      DEFAULT: "hsl(272.30999999999995 92.86% 94.51%)",
      50: "hsl(272.30999999999995 92.86% 94.51%)",
      100: "hsl(267.9100000000001 91.49% 90.78%)",
      200: "hsl(266.21000000000004 93.55% 81.76%)",
      300: "hsl(264.0899999999999 88.81% 71.96%)",
      400: "hsl(262.05999999999995 83.78% 63.73%)",
      500: "hsl(260.1 79.76% 51.57%)",
      600: "hsl(258.03 78.28% 43.33%)",
      700: "hsl(256.11 82.32% 35.49%)",
      800: "hsl(254.14999999999998 86.01% 28.04%)",
      900: "hsl(251.53999999999996 89.66% 22.75%)",
    },
    secondary: {
      DEFAULT: "hsl(270 66.67% 9.41%)",
      50: "hsl(270 66.67% 9.41%)",
      100: "hsl(270 66.67% 18.82%)",
      200: "hsl(270 66.67% 28.24%)",
      300: "hsl(270 66.67% 37.65%)",
      400: "hsl(270 66.67% 47.06%)",
      500: "hsl(270 59.26% 57.65%)",
      600: "hsl(270 59.26% 68.24%)",
      700: "hsl(270 59.26% 78.82%)",
      800: "hsl(270 59.26% 89.41%)",
      900: "hsl(270 61.54% 94.9%)",
    },
    scheme: "dark",
    success: {
      DEFAULT: "hsl(145.71000000000004 77.78% 8.82%)",
      50: "hsl(145.71000000000004 77.78% 8.82%)",
      100: "hsl(146.2 79.78% 17.45%)",
      200: "hsl(145.78999999999996 79.26% 26.47%)",
      300: "hsl(146.01 79.89% 35.1%)",
      400: "hsl(145.96000000000004 79.46% 43.92%)",
      500: "hsl(146.01 62.45% 55.1%)",
      600: "hsl(145.78999999999996 62.57% 66.47%)",
      700: "hsl(146.2 61.74% 77.45%)",
      800: "hsl(145.71000000000004 61.4% 88.82%)",
      900: "hsl(146.66999999999996 64.29% 94.51%)",
      foreground: "hsl(0 0% 0%)",
    },
    textSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
  };

  const theme = useMemo(() => {
    return config.themes.find((x) => x.name === currentTheme) || default_theme;
  }, [currentTheme, config.themes]);

  const themeStyling = useMemo(() => {
    const style: Record<`--${typeof theme_prefix}-${string}`, string> = {
      [`--${theme_prefix}-theme`]: currentTheme,
      [`--${theme_prefix}-background`]: theme.background.DEFAULT,
      [`--${theme_prefix}-background-100`]: theme.background[100],
      [`--${theme_prefix}-background-200`]: theme.background[200],
      [`--${theme_prefix}-background-300`]: theme.background[300],
      [`--${theme_prefix}-background-400`]: theme.background[400],
      [`--${theme_prefix}-background-500`]: theme.background[500],
      [`--${theme_prefix}-background-600`]: theme.background[600],
      [`--${theme_prefix}-background-700`]: theme.background[700],
      [`--${theme_prefix}-background-800`]: theme.background[800],
      [`--${theme_prefix}-background-900`]: theme.background[900],
    };
    return style;
  }, [currentTheme, theme, theme_prefix]);

  return (
    <MultiUIContext.Provider
      value={{
        setTheme: (theme_name) => {
          $currentTheme(theme_name);
        },
        theme: currentTheme,
      }}
    >
      <div slot="multiui-provider" style={themeStyling}>
        {children}
      </div>
    </MultiUIContext.Provider>
  );
}

export default MultiUIProvider;

export const useTheme = () => useContext(MultiUIContext);
