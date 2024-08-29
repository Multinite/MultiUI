"use client";
import { motion } from "framer-motion";
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MultiUIConfig, Theme } from "../types/MultiUIConfig.js";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn.js";

type MultiUIProvider = {
  setTheme: (theme_name: string) => void;
  currentTheme: string | undefined;
  currentThemeValue: Theme | undefined;
  themes: string[];
  addTheme: (theme: Theme | Theme[]) => void;
  onThemeChange: (
    callback: (
      themeName: MultiUIProvider["currentTheme"],
      themeValues: MultiUIProvider["currentThemeValue"]
    ) => void
  ) => () => void;
};

//@ts-ignore
const MultiUIContext = createContext<MultiUIProvider>({
  setTheme(theme_name) {},
  themes: [],
  currentTheme: undefined,
  currentThemeValue: undefined,
  addTheme(theme) {},
  onThemeChange(callback) {},
} as MultiUIProvider);

const default_theme: Theme = {
  name: "multiui_default",
  primary: {
    50: "272, 93%, 95%",
    100: "268, 91%, 91%",
    200: "266, 94%, 82%",
    300: "264, 89%, 72%",
    400: "262, 84%, 64%",
    500: "260, 80%, 52%",
    600: "258, 78%, 43%",
    700: "256, 82%, 35%",
    800: "254, 86%, 28%",
    900: "252, 90%, 23%",
    DEFAULT: "266, 100%, 59%",
  },
  secondary: {
    DEFAULT: "212.01999999999998 100% 46.67%",
    50: "212.01999999999998 100% 46.67%",
    100: "211.84000000000003 100% 19.22%",
    200: "212.24 100% 28.82%",
    300: "212.14 100% 38.43%",
    400: "212.01999999999998 100% 46.67%",
    500: "212.14 92.45% 58.43%",
    600: "212.24 92.45% 68.82%",
    700: "211.84000000000003 92.45% 79.22%",
    800: "211.84000000000003 92.45% 89.61%",
    900: "212.5 92.31% 94.9%",
  },
  background: {
    50: "0, 0%, 37%",
    100: "0, 0%, 45%",
    200: "0, 0%, 37%",
    300: "0, 0%, 29%",
    400: "0, 0%, 21%",
    500: "0, 0%, 14%",
    600: "0, 0%, 12%",
    700: "0, 0%, 9%",
    800: "0, 0%, 7%",
    900: "0, 0%, 5%",
    DEFAULT: "0, 0%, 14%",
  },
  foreground: {
    DEFAULT: "210 5.56% 92.94%",
    50: "240 5.88% 10%",
    100: "240 3.7% 15.88%",
    200: "240 5.26% 26.08%",
    300: "240 5.2% 33.92%",
    400: "240 3.83% 46.08%",
    500: "240 5.03% 64.9%",
    600: "240 4.88% 83.92%",
    700: "240 5.88% 90%",
    800: "240 4.76% 95.88%",
    900: "0 0% 98.04%",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  danger: {
    DEFAULT: "339.20000000000005 90.36% 51.18%",
    50: "340 84.91% 10.39%",
    100: "339.3299999999999 86.54% 20.39%",
    200: "339.11 85.99% 30.78%",
    300: "339 86.54% 40.78%",
    400: "339.20000000000005 90.36% 51.18%",
    500: "339 90% 60.78%",
    600: "339.11 90.6% 70.78%",
    700: "339.3299999999999 90% 80.39%",
    800: "340 91.84% 90.39%",
    900: "339.13 92% 95.1%",
    foreground: "0 0% 100%",
  },
  default: {
    DEFAULT: "240 5.26% 26.08%",
    50: "240 5.88% 10%",
    100: "240 3.7% 15.88%",
    200: "240 5.26% 26.08%",
    300: "240 5.2% 33.92%",
    400: "240 3.83% 46.08%",
    500: "240 5.03% 64.9%",
    600: "240 4.88% 83.92%",
    700: "240 5.88% 90%",
    800: "240 4.76% 95.88%",
    900: "0 0% 98.04%",
  },
  info: {
    DEFAULT: "145 71.96% 92.94%",
    50: "145 71.96% 92.94%",
    100: "145 71.96% 92.94%",
    200: "145 71.96% 92.94%",
    300: "145 71.96% 92.94%",
    400: "145 71.96% 92.94%",
    500: "145 71.96% 92.94%",
    600: "145 71.96% 92.94%",
    700: "145 71.96% 92.94%",
    800: "145 71.96% 92.94%",
    900: "145 71.96% 92.94%",
    foreground: "0 0% 100%",
  },
  warning: {
    DEFAULT: "37.02999999999997 91.27% 55.1%",
    50: "37.139999999999986 75% 10.98%",
    100: "37.139999999999986 75% 21.96%",
    200: "36.95999999999998 73.96% 33.14%",
    300: "37.00999999999999 74.22% 44.12%",
    400: "37.02999999999997 91.27% 55.1%",
    500: "37.00999999999999 91.26% 64.12%",
    600: "36.95999999999998 91.24% 73.14%",
    700: "37.139999999999986 91.3% 81.96%",
    800: "37.139999999999986 91.3% 90.98%",
    900: "54.55000000000001 91.67% 95.29%",
    foreground: "0 0% 100%",
  },
  scheme: "dark",
  success: {
    DEFAULT: "145.96000000000004 79.46% 43.92%",
    50: "145.71000000000004 77.78% 8.82%",
    100: "146.2 79.78% 17.45%",
    200: "145.78999999999996 79.26% 26.47%",
    300: "146.01 79.89% 35.1%",
    400: "145.96000000000004 79.46% 43.92%",
    500: "146.01 62.45% 55.1%",
    600: "145.78999999999996 62.57% 66.47%",
    700: "146.2 61.74% 77.45%",
    800: "145.96000000000004 61.4% 88.82%",
    900: "146.66999999999996 64.29% 94.51%",
    foreground: "0 0% 100%",
  },
  content1: {
    DEFAULT: "240 5.88% 10%",
    foreground: "0 0% 98.04%",
  },
  content2: {
    DEFAULT: "240 3.7% 15.88%",
    foreground: "240 4.76% 95.88%",
  },
  content3: {
    DEFAULT: "240 5.26% 26.08%",
    foreground: "240 5.88% 90%",
  },
  content4: {
    DEFAULT: "240 5.2% 33.92%",
    foreground: "240 4.88% 83.92%",
  },
  [`text-size`]: {
    [`extra-small`]: "0.75rem",
    [`small`]: "0.875rem",
    [`medium`]: "1rem",
    [`large`]: "1.125rem",
    [`extra-large`]: "1.25rem",
    [`extra-extra-large`]: "1.5rem",
  },
  focus: `212.01999999999998 100% 46.67%`,
};

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
export const MultiUIProvider = memo(function ({
  config = {},
  children,
  blurOnThemeChange = false,
}: {
  config?: {
    theme_prefix?: MultiUIConfig["theme_prefix"];
  };
  /**
   * Apply a blur effect to the page when the theme changes.
   * @default false
   */
  blurOnThemeChange?: boolean;
  children: React.ReactNode;
}) {
  const [themes, $Themes] = useState<Theme[]>([]);
  const [currentTheme, $currentTheme] = useState<string | undefined>(undefined);
  const theme_prefix = (config.theme_prefix || "multiui") as "multiui";
  const subscribers = useRef<Parameters<MultiUIProvider["onThemeChange"]>[0][]>(
    []
  );
  const [isDuringThemeChange, $isDuringThemeChange] = useState(false);
  const isDuringThemeChangeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [blurOnThemeChange_, setBlurOnThemeChange] = useState<boolean>(
    blurOnThemeChange ?? false
  );

  const themeStyles = useMemo(() => {
    return themes.find((x) => x.name === currentTheme);
  }, [currentTheme, themes]);

  const themeInCSS = useMemo(() => {
    const theme = themeStyles;
    if (theme === undefined) return {};
    function colorValues(color: string) {
      if (theme === undefined) return {};
      return {
        //@ts-ignore
        [`--${theme_prefix}-${color}`]: theme[color].DEFAULT,
        //@ts-ignore
        [`--${theme_prefix}-${color}-100`]: theme[color][100],
        //@ts-ignore
        [`--${theme_prefix}-${color}-200`]: theme[color][200],
        //@ts-ignore
        [`--${theme_prefix}-${color}-300`]: theme[color][300],
        //@ts-ignore
        [`--${theme_prefix}-${color}-400`]: theme[color][400],
        //@ts-ignore
        [`--${theme_prefix}-${color}-500`]: theme[color][500],
        //@ts-ignore
        [`--${theme_prefix}-${color}-600`]: theme[color][600],
        //@ts-ignore
        [`--${theme_prefix}-${color}-700`]: theme[color][700],
        //@ts-ignore
        [`--${theme_prefix}-${color}-800`]: theme[color][800],
        //@ts-ignore
        [`--${theme_prefix}-${color}-900`]: theme[color][900],
      };
    }

    function getThemeValue(keys: string[]) {
      if (theme === undefined) return {};
      let val = theme;
      for (let i = 0; i < keys.length; i++) {
        //@ts-ignore
        val = val[keys[i]!];
      }
      return val;
    }

    const bg = colorValues("background");
    const fg = colorValues("foreground");
    const primary = colorValues("primary");
    const secondary = colorValues("secondary");
    const default_ = colorValues("default");
    const content = {
      [`--${theme_prefix}-content1`]: theme.content1.DEFAULT,
      [`--${theme_prefix}-content2-foreground`]: theme.content2.foreground,
      [`--${theme_prefix}-content2`]: theme.content1.DEFAULT,
      [`--${theme_prefix}-content3-foreground`]: theme.content3.foreground,
      [`--${theme_prefix}-content3`]: theme.content3.DEFAULT,
      [`--${theme_prefix}-content4-foreground`]: theme.content4.foreground,
      [`--${theme_prefix}-content4`]: theme.content4.DEFAULT,
    };

    const other = {
      [`--${theme_prefix}-text-size-extra-small`]: getThemeValue([
        "text-size",
        "extra-small",
      ]),
      [`--${theme_prefix}-text-size-small`]: getThemeValue([
        "text-size",
        "small",
      ]),
      [`--${theme_prefix}-text-size-medium`]: getThemeValue([
        "text-size",
        "medium",
      ]),
      [`--${theme_prefix}-text-size-large`]: getThemeValue([
        "text-size",
        "large",
      ]),
      [`--${theme_prefix}-text-size-extra-large`]: getThemeValue([
        "text-size",
        "extra-large",
      ]),
      [`--${theme_prefix}-text-size-extra-extra-large`]: getThemeValue([
        "text-size",
        "extra-extra-large",
      ]),
      [`--${theme_prefix}-focus`]: getThemeValue(["focus"]),
    };

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
      [`/* Content Values`]: "*/",
      ...content,
      [`/* Other Values`]: "*/",
      ...other,
    };
    return style;
  }, [theme_prefix, themeStyles]);

  const isRan = useRef(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isRan.current) {
      isRan.current = true;
      document.documentElement.classList.add("theme");
      document.documentElement.style.colorScheme = `var(--${theme_prefix}-scheme)`;
      return;
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", currentTheme!);
    subscribers.current.forEach((x) => x(currentTheme, themeStyles));
    $isDuringThemeChange(true);
    clearTimeout(isDuringThemeChangeTimeout.current);
    isDuringThemeChangeTimeout.current = setTimeout(() => {
      $isDuringThemeChange(false);
    }, 300);
  }, [currentTheme]);

  return (
    <MultiUIContext.Provider
      value={{
        setTheme: (theme_name) => {
          $currentTheme(theme_name);
        },
        currentTheme: currentTheme,
        currentThemeValue: themeStyles,
        themes: themes.map((x) => x.name),

        addTheme(theme) {
          $Themes((prev) => [
            ...prev,
            ...(Array.isArray(theme) ? theme : [theme]),
          ]);
        },
        onThemeChange(callback) {
          subscribers.current.push(callback);
          return () => {
            subscribers.current = subscribers.current.filter(
              (x) => x !== callback
            );
          };
        },
      }}
    >
      {children}
      {Object.keys(themeInCSS).length > 0
        ? createPortal(
            <style>
              {`.theme {\n` +
                Object.entries(themeInCSS)
                  .map(([key, value]) => {
                    return `  ${key}: ${value};\n`;
                  })
                  .join("") +
                "}"}
            </style>,
            document.head
          )
        : null}
      {blurOnThemeChange_
        ? //TODO: Add darking effect
          createPortal(
            <motion.div
              initial={{
                backdropFilter: "blur(0px)",
                backgroundColor: `transparent`,
              }}
              animate={
                isDuringThemeChange
                  ? {
                      backdropFilter: "blur(2px)",
                      backgroundColor: `RGBA(0,0,0,0.2)`,
                    }
                  : {
                      backdropFilter: "blur(0px)",
                      backgroundColor: `transparent`,
                    }
              }
              // transition={{ duration: 0.2 }}
              className="absolute w-screen h-screen inset-0 z-50 pointer-events-none select-none"
              slot="blur"
            />,
            document.body
          )
        : null}
    </MultiUIContext.Provider>
  );
});
export { default_theme as multiUI_defaultTheme };

export const useTheme = () => useContext(MultiUIContext);
