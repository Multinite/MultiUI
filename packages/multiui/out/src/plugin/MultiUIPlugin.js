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
        name: "background",
        range: basic_range,
    },
    {
        name: "foreground",
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
const borderRadius = ["small", "medium", "large"];
export const MultiUIPlugin = function (multiUIConfig) {
    const prefix = (multiUIConfig.theme_prefix || "multiui");
    function getColors() {
        let colors = {
            background: () => "",
            content1: () => "",
            content2: () => "",
            content3: () => "",
            content4: () => "",
            danger: () => "",
            default: () => "",
            foreground: () => "",
            info: () => "",
            primary: () => "",
            secondary: () => "",
            success: () => "",
            warning: () => "",
        };
        themeLayout.forEach(({ name, range }) => {
            const multiUIColorVariable = `--${prefix}-${name}`;
            colors[name] = ({ opacityVariable, opacityValue }) => {
                if (!isNaN(+opacityValue)) {
                    return (`hsl(var(${multiUIColorVariable}), ${opacityValue})` +
                        getHexComment(name, undefined, parseFloat(opacityValue)));
                }
                if (opacityVariable) {
                    return (`hsl(var(${multiUIColorVariable}), var(${opacityVariable}))` +
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
                        return (`hsl(var(${multiUIColorVariable}), var(${opacityVariable}))` +
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
        let color = typeof multiUIConfig.exampleTheme != "undefined"
            ? //@ts-ignore - it works
                multiUIConfig.exampleTheme[colorType][colorIndex ? colorIndex : "DEFAULT"]
            : undefined;
        return color
            ? ` /* ${Color(`hsla(${color}${colorTransparency ? `, ${colorTransparency}` : ""})`).hexa()} */`
            : "";
    }
    function getBorderRadius() {
        const radiusObj = {};
        borderRadius.forEach((radius) => {
            radiusObj[radius] = `var(--${prefix}-radius-${radius})`;
        });
        return radiusObj;
    }
    return plugin(function ({ addUtilities, addComponents, addBase, e, config, addVariant, matchVariant, matchUtilities, }) {
        addThemeClasses({ addVariant, matchVariant, multiUIConfig });
        addBoxSelectClasses({ addVariant, matchVariant });
    }, {
        theme: {
            extend: {
                //@ts-expect-error - intentional
                colors: getColors(),
                borderRadius: getBorderRadius(),
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