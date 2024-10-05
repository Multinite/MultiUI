import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, } from "react";
import { cn } from "../utils/cn";
import GlobalThemeSet from "./GlobalThemeSet";
const Theme = forwardRef(({ theme, themeId, style, defineThemeStylesInline = true, ...attr }, ref) => {
    // const theme_ref = useRef<ThemeT>(theme);
    // const subs = useRef<((theme: ThemeT) => void)[]>([]);
    // const wrapperEl = useRef<HTMLDivElement>(null);
    // const styleEl = useRef<HTMLStyleElement>(null);
    if (defineThemeStylesInline) {
        return (_jsxs(_Fragment, { children: [_jsx(GlobalThemeSet, { theme: theme, themeId: themeId, defineThemeStylesInline: defineThemeStylesInline }), _jsx("div", { ...attr, slot: "multiui-theme-wrapper", "data-theme": theme.name, ...(!themeId ? {} : { "data-theme-id": themeId }), style: {
                        ...style,
                        ...getThemeFormatted({
                            theme,
                            outputType: "inline-style-object",
                        }),
                    }, ref: ref })] }));
    }
    const { className, ...rest } = attr;
    return (_jsxs(_Fragment, { children: [_jsx(GlobalThemeSet, { theme: theme, themeId: themeId, defineThemeStylesInline: defineThemeStylesInline }), _jsx("style", { slot: "multiui-theme-style", "data-theme": theme.name, dangerouslySetInnerHTML: {
                    __html: getThemeFormatted({
                        theme,
                        outputType: "style-element",
                    }),
                }, ...(!themeId ? {} : { "data-style-theme-id": themeId }) }), _jsx("div", { ...rest, slot: "multiui-theme-wrapper", "data-theme": theme.name, className: cn(`${theme.name}_theme`, className), ...(!themeId ? {} : { "data-theme-id": themeId }), ref: ref })] }));
});
export default Theme;
//@ts-ignore
export const getThemeFormatted = function ({ theme, outputType = "inline-style", theme_prefix = "multiui", custom_className, }) {
    if (theme === undefined)
        return outputType == "inline-style-string" || outputType === "style-element"
            ? ""
            : {};
    function colorValues(color) {
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
    function getThemeValue(keys) {
        if (theme === undefined)
            return {};
        let val = theme;
        for (let i = 0; i < keys.length; i++) {
            //@ts-ignore
            val = val[keys[i]];
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
        [`--${theme_prefix}-theme`]: `"${theme.name}"`,
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
    if (outputType === "style-element") {
        return (`.${custom_className || `${theme.name}_theme`} {\n` +
            Object.entries(style)
                .map(([key, value]) => {
                return `  ${key}: ${value};\n`;
            })
                .join("") +
            "}");
    }
    else if (outputType === "inline-style-string") {
        return Object.entries(style)
            .map(([key, value]) => {
            return `  ${key}: ${value};\n`;
        })
            .join("");
    }
    else if (outputType === "inline-style-object") {
        return style;
    }
};
function reactCSSToString(styles) {
    return Object.entries(styles)
        .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        // Handle numbers by adding 'px' for numerical values except for unitless properties
        const cssValue = typeof value === "number" &&
            ![
                "zIndex",
                "opacity",
                "fontWeight",
                "lineHeight",
                "flexGrow",
                "flexShrink",
            ].includes(key)
            ? `${value}px`
            : value;
        return `${cssKey}: ${cssValue};`;
    })
        .join(" ");
}
//# sourceMappingURL=Theme.js.map