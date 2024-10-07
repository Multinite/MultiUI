import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef } from "react";
import GlobalThemeSet from "./GlobalThemeSet";
import BoxSelection from "./BoxSelection";
import { ScriptComponnet } from "./ScriptComponnet";
const validThemeIdRegex = /^[a-zA-Z0-9-_]+$/;
export const Theme = forwardRef(({ $theme, $themeId, style, $defineThemeStylesInline = true, $updateDocumentColorScheme = true, $persistOnLocalstorage = true, $boxSelectionOptions = {
    lazyLoad: true,
    activateOnMetaKey: true,
    activateOnKey: undefined,
    autoScroll: true,
    autoScrollEdgeDistance: 100,
    autoScrollStep: 30,
    disableUnselection: false,
    className: undefined,
}, $enableBoxSelection = false, children, ...attr }, ref) => {
    if (validThemeIdRegex.test($themeId) === false)
        throw new Error(`Invalid themeId: "${$themeId}"\nPlease use only letters, numbers, dashes, and underscores.`);
    if ($themeId === "true" || $themeId === "false") {
        throw new Error(`Invalid themeId: "${$themeId}"\nPlease do not use "true" or "false" as a themeId.`);
    }
    if (Array.isArray($theme)) {
        const [dark, light] = $theme;
        if (dark.name === "true" || dark.name === "false" || dark.name === "id")
            throw new Error(`Invalid theme name for dark-mode: "${dark.name}"\nPlease do not use "true" or "false" or "id" as a theme name.`);
        if (light.name === "true" ||
            light.name === "false" ||
            light.name === "id")
            throw new Error(`Invalid theme name for light-mode: "${light.name}"\nPlease do not use "true" or "false" or "id" as a theme name.`);
    }
    else {
        if ($theme.name === "true" ||
            $theme.name === "false" ||
            $theme.name === "id")
            throw new Error(`Invalid theme name: "${$theme.name}"\nPlease do not use "true" or "false" or "id" as a theme name.`);
    }
    const $serverSelectedTheme = Array.isArray($theme) ? $theme[0] : $theme;
    if ($defineThemeStylesInline) {
        return (_jsxs(_Fragment, { children: [_jsx(GlobalThemeSet, { theme: $theme, themeId: $themeId, defineThemeStylesInline: $defineThemeStylesInline, updateDocumentColorScheme: $updateDocumentColorScheme, persistOnLocalstorage: $persistOnLocalstorage }), _jsx("div", { className: "relative", slot: "multiui-theme-wrapper", children: _jsxs("div", { suppressHydrationWarning: true, ...attr, slot: "multiui-theme", id: `multiui-theme-${$themeId}`, "data-theme": $serverSelectedTheme.name, ...(!$themeId ? {} : { "data-theme-id": $themeId }), style: {
                            ...style,
                            position: $enableBoxSelection ? "relative" : "static",
                            ...getThemeFormatted({
                                theme: $serverSelectedTheme,
                                outputType: "inline-style-object",
                            }),
                        }, ref: ref, children: [_jsx(BoxSelection, { theme: $theme, themeId: $themeId, boxSelectionOptions: $boxSelectionOptions, enableBoxSelection: $enableBoxSelection }), children] }) }), _jsx(ScriptComponnet, { theme: $theme, themeId: $themeId, defineThemeStylesInline: $defineThemeStylesInline })] }));
    }
    const { className, ...rest } = attr;
    return (_jsx(_Fragment, { children: _jsx(GlobalThemeSet, { theme: $theme, themeId: $themeId, defineThemeStylesInline: $defineThemeStylesInline, persistOnLocalstorage: $persistOnLocalstorage, updateDocumentColorScheme: $updateDocumentColorScheme }) }));
});
export default Theme;
/**
 * Internal function to get the theme object formatted to either a style element or inline style string.
 *
 */
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
            .filter((x) => x[1].trim() !== "*/")
            .map(([key, value]) => {
            return `  ${key}: ${value};\n`;
        })
            .join("");
    }
    else if (outputType === "inline-style-object") {
        return Object.fromEntries(Object.entries(style).filter((x) => x[1].trim() !== "*/"));
    }
};
//# sourceMappingURL=Theme.js.map