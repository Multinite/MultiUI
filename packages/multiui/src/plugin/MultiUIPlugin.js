import plugin from "tailwindcss/plugin";
import { formatTheme } from "./utils/formatTheme.js";
export const MultiUIPlugin = function (multiUIConfig) {
    const prefix = (multiUIConfig.theme_prefix || "multiui");
    return plugin(function ({ addUtilities, addComponents, addBase, e, config, addVariant, matchVariant, }) {
        const { utils } = formatTheme(prefix, e);
        addUtilities(utils);
        addThemeClasses({ addVariant, matchVariant, multiUIConfig });
        addBoxSelectClasses({ addVariant, matchVariant });
    });
};
function addThemeClasses({ addVariant, matchVariant, multiUIConfig, }) {
    multiUIConfig.theme_names.forEach((themeName) => {
        themeName = themeName
            .replaceAll(" ", "-")
            .replaceAll('"', "")
            .replaceAll("'", "");
        addVariant(`theme-${themeName}`, `[data-theme="${themeName}"] &`);
        addVariant(`box-select-via-${themeName}`, `&[data-selected-theme="${themeName}"]`);
    });
    matchVariant("theme", (themeName) => {
        themeName = themeName
            .replaceAll(" ", "-")
            .replaceAll('"', "")
            .replaceAll("'", "");
        return `[data-theme="${themeName}"] &`;
    });
    addVariant("themed", "[data-theme] &");
}
function addBoxSelectClasses({ addVariant, matchVariant, }) {
    addVariant("box-select", "&[aria-selected]");
    matchVariant("box-select-by-name", (themeName) => {
        themeName = themeName.replaceAll('"', "").replaceAll("'", "");
        return `&[data-selected-theme="${themeName}"]`;
    });
    matchVariant("box-select-by-id", (themeName) => {
        themeName = themeName.replaceAll('"', "").replaceAll("'", "");
        return `&[data-selected-theme-id="${themeName}"]`;
    });
}
//# sourceMappingURL=MultiUIPlugin.js.map