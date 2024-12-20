import type { ThemeT } from "@multinite_official/multiui/out";
const default_theme = {
  name: "multiui_default" as const,
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
    DEFAULT: "212.01999999999998, 100%, 46.67%",
    50: "212.01999999999998, 100%, 46.67%",
    100: "211.84000000000003, 100%, 19.22%",
    200: "212.24, 100%, 28.82%",
    300: "212.14, 100%, 38.43%",
    400: "212.01999999999998, 100%, 46.67%",
    500: "212.14, 92.45%, 58.43%",
    600: "212.24, 92.45%, 68.82%",
    700: "211.84000000000003, 92.45%, 79.22%",
    800: "211.84000000000003, 92.45%, 89.61%",
    900: "212.5, 92.31%, 94.9%",
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
    DEFAULT: "210, 5.56%, 92.94%",
    50: "240, 5.88%, 10%",
    100: "240, 3.7%, 15.88%",
    200: "240, 5.26%, 26.08%",
    300: "240, 5.2%, 33.92%",
    400: "240, 3.83%, 46.08%",
    500: "240, 5.03%, 64.9%",
    600: "240, 4.88%, 83.92%",
    700: "240, 5.88%, 90%",
    800: "240, 4.76%, 95.88%",
    900: "0, 0%, 98.04%",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  danger: {
    DEFAULT: "339.20000000000005, 90.36%, 51.18%",
    50: "340, 84.91%, 10.39%",
    100: "339.3299999999999, 86.54%, 20.39%",
    200: "339.11, 85.99%, 30.78%",
    300: "339, 86.54%, 40.78%",
    400: "339.20000000000005, 90.36%, 51.18%",
    500: "339, 90%, 60.78%",
    600: "339.11, 90.6%, 70.78%",
    700: "339.3299999999999, 90%, 80.39%",
    800: "340, 91.84%, 90.39%",
    900: "339.13, 92%, 95.1%",
    foreground: "0, 0%, 100%",
  },
  default: {
    DEFAULT: "240, 5.26%, 26.08%",
    50: "240, 5.88%, 10%",
    100: "240, 3.7%, 15.88%",
    200: "240, 5.26%, 26.08%",
    300: "240, 5.2%, 33.92%",
    400: "240, 3.83%, 46.08%",
    500: "240, 5.03%, 64.9%",
    600: "240, 4.88%, 83.92%",
    700: "240, 5.88%, 90%",
    800: "240, 4.76%, 95.88%",
    900: "0, 0%, 98.04%",
  },
  info: {
    DEFAULT: "145, 71.96%, 92.94%",
    50: "145, 71.96%, 92.94%",
    100: "145, 71.96%, 92.94%",
    200: "145, 71.96%, 92.94%",
    300: "145, 71.96%, 92.94%",
    400: "145, 71.96%, 92.94%",
    500: "145, 71.96%, 92.94%",
    600: "145, 71.96%, 92.94%",
    700: "145, 71.96%, 92.94%",
    800: "145, 71.96%, 92.94%",
    900: "145, 71.96%, 92.94%",
    foreground: "0, 0%, 100%",
  },
  warning: {
    DEFAULT: "37.02999999999997, 91.27%, 55.1%",
    50: "37.139999999999986, 75%, 10.98%",
    100: "37.139999999999986, 75%, 21.96%",
    200: "36.95999999999998, 73.96%, 33.14%",
    300: "37.00999999999999, 74.22%, 44.12%",
    400: "37.02999999999997, 91.27%, 55.1%",
    500: "37.00999999999999, 91.26%, 64.12%",
    600: "36.95999999999998, 91.24%, 73.14%",
    700: "37.139999999999986, 91.3%, 81.96%",
    800: "37.139999999999986, 91.3%, 90.98%",
    900: "54.55000000000001, 91.67%, 95.29%",
    foreground: "0, 0%, 100%",
  },
  scheme: "dark" as const,
  success: {
    DEFAULT: "145.96000000000004, 79.46%, 43.92%",
    50: "145.71000000000004, 77.78%, 8.82%",
    100: "146.2 79.78%, 17.45%",
    200: "145.78999999999996, 79.26%, 26.47%",
    300: "146.01, 79.89%, 35.1%",
    400: "145.96000000000004, 79.46%, 43.92%",
    500: "146.01, 62.45%, 55.1%",
    600: "145.78999999999996, 62.57%, 66.47%",
    700: "146.2, 61.74%, 77.45%",
    800: "145.96000000000004, 61.4%, 88.82%",
    900: "146.66999999999996, 64.29%, 94.51%",
    foreground: "0, 0%, 100%",
  },
  content1: {
    DEFAULT: "240, 5.88%, 10%",
    foreground: "0, 0%, 98.04%",
  },
  content2: {
    DEFAULT: "240, 3.7%, 15.88%",
    foreground: "240, 4.76%, 95.88%",
  },
  content3: {
    DEFAULT: "240, 5.26%, 26.08%",
    foreground: "240, 5.88%, 90%",
  },
  content4: {
    DEFAULT: "240, 5.2%, 33.92%",
    foreground: "240, 4.88%, 83.92%",
  },
  [`text-size`]: {
    [`extra-small`]: "0.75rem",
    [`small`]: "0.875rem",
    [`medium`]: "1rem",
    [`large`]: "1.125rem",
    [`extra-large`]: "1.25rem",
    [`extra-extra-large`]: "1.5rem",
  },
  focus: `212.01999999999998, 100%, 46.67%`,
} satisfies ThemeT;

const test_theme = {
  ...default_theme,
  name: "test_theme" as const,
  primary: {
    ...default_theme.primary,
    DEFAULT: "306, 100%, 59%",
  },
} satisfies ThemeT;

const test_theme2 = {
  ...default_theme,
  name: "test_theme2" as const,
  scheme: "light",
  primary: {
    ...default_theme.primary,
    DEFAULT: "118, 95%, 53%",
  },
} satisfies ThemeT;

export { test_theme, default_theme, test_theme2 };
