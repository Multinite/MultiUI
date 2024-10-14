import plugin from "tailwindcss/plugin";
import Color from "color";
const basic_range = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
];
const themeLayout = [
    {
        name: "default",
        range: basic_range,
    },
    {
        name: "primary",
        range: basic_range,
    },
    {
        name: "secondary",
        range: basic_range,
    },
    {
        name: "info",
        range: basic_range,
    },
    {
        name: "success",
        range: basic_range,
    },
    {
        name: "warning",
        range: basic_range,
    },
    {
        name: "danger",
        range: basic_range,
    },
    {
        name: "content1",
        range: ["foreground"],
    },
    {
        name: "content2",
        range: ["foreground"],
    },
    {
        name: "content3",
        range: ["foreground"],
    },
    {
        name: "content4",
        range: ["foreground"],
    },
];
export const MultiUIPlugin = function (multiUIConfig, 
/**
 * We use this theme to generate the colors for you to preview in Tailwind.
 *
 * ![Example Image showing how you can see the color next to the tailwind class](https://multiui.org/code/example-tw-with-color.png)
 */
exampleTheme) {
    const prefix = (multiUIConfig.theme_prefix || "multiui");
    function getColors() {
        let colors = {};
        themeLayout.forEach(({ name, range }) => {
            const multiUIColorVariable = `--${prefix}-${name}`;
            colors[name] = ({ opacityVariable, opacityValue }) => {
                if (!isNaN(+opacityValue)) {
                    return (`hsl(var(${multiUIColorVariable}) / ${opacityValue})` +
                        getHexComment(name, undefined, parseFloat(opacityValue)));
                }
                if (opacityVariable) {
                    return (`hsl(var(${multiUIColorVariable}), var(${opacityVariable})))` +
                        getHexComment(name, undefined, parseFloat(opacityValue)));
                }
                return (`hsl(var(${multiUIColorVariable}), 1))` +
                    getHexComment(name, undefined, parseFloat(opacityValue)));
            };
            range.forEach((value) => {
                colors[`${name}-${value}`] = ({ opacityVariable, opacityValue }) => {
                    const multiUIColorVariable = `--${prefix}-${name}-${value}`;
                    if (!isNaN(+opacityValue)) {
                        return (`hsl(var(${multiUIColorVariable}) / ${opacityValue})` +
                            getHexComment(name, value, parseFloat(opacityValue)));
                    }
                    if (opacityVariable) {
                        return (`hsl(var(${multiUIColorVariable}), var(${opacityVariable})))` +
                            getHexComment(name, value, parseFloat(opacityValue)));
                    }
                    return (`hsl(var(${multiUIColorVariable}), 1))` +
                        getHexComment(name, value, parseFloat(opacityValue)));
                };
            });
        });
        return colors;
    }
    function getHexComment(colorType, colorIndex, colorTransparency) {
        let color = exampleTheme
            ? exampleTheme[colorType][colorIndex ? colorIndex : "DEFAULT"]
            : undefined;
        return color
            ? ` /* ${Color(`hsla(${color}${colorTransparency ? `, ${colorTransparency}` : ""})`).hexa()} */`
            : "";
    }
    return plugin(function ({ addUtilities, addComponents, addBase, e, config, addVariant, matchVariant, matchUtilities, }) {
        // const { utils, matches } = formatTheme(prefix, e, exampleTheme);
        // addUtilities(utils);
        // matchUtilities(
        //   matches.reduce((prev, { callback, utility }) => {
        //     prev[utility] = callback;
        //     return prev;
        //   }, {})
        // );
        console.log(getColors());
        addThemeClasses({ addVariant, matchVariant, multiUIConfig });
        addBoxSelectClasses({ addVariant, matchVariant });
    }, {
        theme: {
            extend: {
                colors: {
                    //@ts-ignore
                    "sup-10": (d) => {
                        console.log(d);
                        return `hey; /* #fff */`;
                    },
                    ...getColors(),
                },
            },
        },
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