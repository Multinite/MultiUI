export type MultiUIConfig = {
  components_output_dir: string;
  framework: string;
  package_manager: string;
  themes: Theme[];
  default_theme: string;
  theme_prefix?: string;
};

export type Theme = {
  /**
   * Theme name
   */
  name: string;
  scheme: "light" | "dark";
  primary: ColorValues;
  secondary: ColorValues;
  background: ColorValues;
  foreground: ColorValues;
  success: ColorValues<true>;
  info: ColorValues<true>;
  warning: ColorValues<true>;
  danger: ColorValues<true>;
  default: ColorValues;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  textSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
};

export type ColorValues<includeForeground = false> =
  includeForeground extends false
    ? {
        DEFAULT: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      }
    : {
        DEFAULT: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        foreground: string;
      };
