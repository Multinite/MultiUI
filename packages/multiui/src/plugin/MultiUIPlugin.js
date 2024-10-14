import plugin from "tailwindcss/plugin";
import { formatTheme } from "./utils/formatTheme.js";
export const MultiUIPlugin = function (multiUIConfig, 
/**
 * We use this theme to generate the colors for you to preview in Tailwind.
 *
 * ![Example Image showing how you can see the color next to the tailwind class](https://multiui.org/code/example-tw-with-color.png)
 */
exampleTheme) {
    const prefix = (multiUIConfig.theme_prefix || "multiui");
    return plugin(function ({ addUtilities, addComponents, addBase, e, config, addVariant, matchVariant, matchUtilities, }) {
        const { utils, matches } = formatTheme(prefix, e, exampleTheme);
        addUtilities(utils);
        matchUtilities(matches.reduce((prev, { callback, utility }) => {
            prev[utility] = callback;
            return prev;
        }, {}));
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
    addVariant("dark-theme", "[data-theme-scheme=dark] &");
    addVariant("light-theme", "[data-theme-scheme=light] &");
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