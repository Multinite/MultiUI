"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MultiUIConfig, Theme } from "../types/MultiUIConfig";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";

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

  /*
    --nextui-danger-50: 340 84.91% 10.39%;
    --nextui-danger-100: 339.3299999999999 86.54% 20.39%;
    --nextui-danger-200: 339.11 85.99% 30.78%;
    --nextui-danger-300: 339 86.54% 40.78%;
    --nextui-danger-400: 339.20000000000005 90.36% 51.18%;
    --nextui-danger-500: 339 90% 60.78%;
    --nextui-danger-600: 339.11 90.6% 70.78%;
    --nextui-danger-700: 339.3299999999999 90% 80.39%;
    --nextui-danger-800: 340 91.84% 90.39%;
    --nextui-danger-900: 339.13 92% 95.1%;
    --nextui-danger-foreground: 0 0% 100%;
    --nextui-danger: 339.20000000000005 90.36% 51.18%;

  */

  const default_theme: Theme = {
    name: "default",
    primary: {
      DEFAULT: "hsl(212.01999999999998 100% 46.67%)",
      50: "hsl(212.01999999999998 100% 46.67%)",
      100: "hsl(211.84000000000003 100% 19.22%)",
      200: "hsl(212.24 100% 28.82%)",
      300: "hsl(212.14 100% 38.43%)",
      400: "hsl(212.01999999999998 100% 46.67%)",
      500: "hsl(212.14 92.45% 58.43%)",
      600: "hsl(212.24 92.45% 68.82%)",
      700: "hsl(211.84000000000003 92.45% 79.22%)",
      800: "hsl(211.84000000000003 92.45% 89.61%)",
      900: "hsl(212.5 92.31% 94.9%)",
    },
    secondary: {
      DEFAULT: "hsl(270 59.26% 57.65%)",
      50: "hsl(270 59.26% 57.65%)",
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
    background: {
      50: "#5e5e5e",
      100: "#737373",
      200: "#5e5e5e",
      300: "#4a4a4a",
      400: "#363636",
      500: "#242424",
      600: "#1e1e1e",
      700: "#181818",
      800: "#121212",
      900: "#0c0c0c",
      DEFAULT: "#242424",
    },
    foreground: {
      DEFAULT: "hsl(210 5.56% 92.94%)",
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

    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
    },
    danger: {
      DEFAULT: "hsl(339.20000000000005 90.36% 51.18%)",
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
      DEFAULT: "hsl(37.02999999999997 91.27% 55.1%)",
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
      foreground: "hsl(0 0% 100%)",
    },
    scheme: "dark",
    success: {
      DEFAULT: "hsl(145.96000000000004 79.46% 43.92%)",
      50: "hsl(145.71000000000004 77.78% 8.82%)",
      100: "hsl(146.2 79.78% 17.45%)",
      200: "hsl(145.78999999999996 79.26% 26.47%)",
      300: "hsl(146.01 79.89% 35.1%)",
      400: "hsl(145.96000000000004 79.46% 43.92%)",
      500: "hsl(146.01 62.45% 55.1%)",
      600: "hsl(145.78999999999996 62.57% 66.47%)",
      700: "hsl(146.2 61.74% 77.45%)",
      800: "hsl(145.96000000000004 61.4% 88.82%)",
      900: "hsl(146.66999999999996 64.29% 94.51%)",
      foreground: "hsl(0 0% 100%)",
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
    function colorValues(color: string) {
      return {
        [`--${theme_prefix}-${color}`]: theme[color].DEFAULT,
        [`--${theme_prefix}-${color}-100`]: theme[color][100],
        [`--${theme_prefix}-${color}-200`]: theme[color][200],
        [`--${theme_prefix}-${color}-300`]: theme[color][300],
        [`--${theme_prefix}-${color}-400`]: theme[color][400],
        [`--${theme_prefix}-${color}-500`]: theme[color][500],
        [`--${theme_prefix}-${color}-600`]: theme[color][600],
        [`--${theme_prefix}-${color}-700`]: theme[color][700],
        [`--${theme_prefix}-${color}-800`]: theme[color][800],
        [`--${theme_prefix}-${color}-900`]: theme[color][900],
      };
    }

    const bg = colorValues("background");
    const fg = colorValues("foreground");
    const primary = colorValues("primary");
    const secondary = colorValues("secondary");
    const default_ = colorValues("default");

    const style = {
      [`/* MultiUI Theme`]: "*/",
      [`--${theme_prefix}-theme`]: `"${currentTheme}"`,
      [`--${theme_prefix}-scheme`]: `${theme.scheme}`,
      [`/* Background Values`]: "*/",
      ...bg,
      [`/* Foreground Values`]: "*/",
      ...fg,
      [`/* Primary Values`]: "*/",
      ...primary,
      [`/* Secondary Values`]: "*/",
      ...secondary,
      [`/* Default Values`]: "*/",
      ...default_,
    };
    return style;
  }, [currentTheme, theme, theme_prefix]);

  const isRan = useRef(false);
  useEffect(() => {
    if (!isRan.current) {
      isRan.current = true;
      document.documentElement.className = cn(
        "theme",
        document.documentElement.className
      );
      document.documentElement.style.colorScheme = `var(--${theme_prefix}-scheme)`;
      return;
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <MultiUIContext.Provider
      value={{
        setTheme: (theme_name) => {
          $currentTheme(theme_name);
        },
        theme: currentTheme,
      }}
    >
      {/* <div slot="multiui-provider" style={themeStyling}> */}
      {children}
      {/* </div> */}
      {createPortal(
        <style>
          {`.theme {\n` +
            Object.entries(themeStyling)
              .map(([key, value]) => {
                return `  ${key}: ${value};\n`;
              })
              .join("") +
            "}"}
        </style>,
        document.head
      )}
    </MultiUIContext.Provider>
  );
}

export default MultiUIProvider;

export const useTheme = () => useContext(MultiUIContext);
