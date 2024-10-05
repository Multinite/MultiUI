export type MultiUIConfig = {
    /**
     * The output directory for components.
     *
     * @default "/src/components/multiui"
     **/
    components_output_dir: string;
    /**
     * The framework you are using.
     **/
    framework: string;
    /**
     * The package manager to use for components.
     **/
    package_manager: string;
    /**
     * The name of every theme you want to use.
     */
    theme_names: string[];
    /**
     * The prefix to use for theme class names.
     *
     * @default "multiui"
     */
    theme_prefix?: string;
};
export type ThemeT = {
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
    content1: {
        DEFAULT: string;
        foreground: string;
    };
    content2: {
        DEFAULT: string;
        foreground: string;
    };
    content3: {
        DEFAULT: string;
        foreground: string;
    };
    content4: {
        DEFAULT: string;
        foreground: string;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
    };
    [`text-size`]: {
        [`extra-small`]: string;
        [`small`]: string;
        [`medium`]: string;
        [`large`]: string;
        [`extra-large`]: string;
        [`extra-extra-large`]: string;
    };
    focus: string;
};
export type ColorValues<includeForeground = false> = includeForeground extends false ? {
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
} : {
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
export declare function multiUIConfigCreator({ components_output_dir, framework, package_manager, theme_names, theme_prefix, ...rest }: MultiUIConfig): MultiUIConfig;
