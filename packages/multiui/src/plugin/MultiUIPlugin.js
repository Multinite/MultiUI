import plugin from "tailwindcss/plugin";
export const MultiUIPlugin = function (multiUIConfig) {
    const prefix = (multiUIConfig.theme_prefix || "multiui");
    function cssVar(value) {
        return `hsl(var(--${prefix}-${value
            .map((x) => x.replaceAll("-", "_"))
            .filter((x) => x)
            .join("-")}))`;
    }
    return plugin(function ({ theme, addUtilities, addComponents, addBase, e, config, addVariant, matchVariant, }) {
        const allColorIndexs = [
            -1, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
        ];
        const allColorTypes = [
            "primary",
            "secondary",
            "foreground",
            "background",
        ];
        const allColorUtils = ["bg", "text"];
        const allColorUtilValues = {
            bg: (colorType, colorIndex) => ({
                backgroundColor: cssVar([
                    colorType,
                    colorIndex === "DEFAULT" ? "" : colorIndex.toString(),
                ]),
            }),
            text: (colorType, colorIndex) => ({
                color: cssVar([
                    colorType,
                    colorIndex === "DEFAULT" ? "" : colorIndex.toString(),
                ]),
            }),
        };
        const colorUtils = allColorUtils.reduce((zacc, z) => {
            return {
                ...zacc,
                ...allColorTypes.reduce((acc, x) => {
                    return allColorIndexs.reduce((acc2, x2) => {
                        return {
                            ...acc2,
                            [`.${z}-${x}${x2 === -1 ? "" : `-${x2}`}`]: allColorUtilValues[z](x, x2 === -1 ? "DEFAULT" : x2),
                        };
                    }, acc);
                }, {}),
            };
        }, {});
        const allSizeClasses = [
            {
                class: "text",
                values: {
                    small: {
                        fontSize: cssVar(["text", "small"]),
                    },
                    medium: {
                        fontSize: cssVar(["text", "medium"]),
                    },
                    large: {
                        fontSize: cssVar(["text", "large"]),
                    },
                },
            },
            {
                class: "rounded",
                values: {
                    small: {
                        borderRadius: cssVar(["rounded", "small"]),
                    },
                    medium: {
                        borderRadius: cssVar(["rounded", "medium"]),
                    },
                    large: {
                        borderRadius: cssVar(["rounded", "large"]),
                    },
                },
            },
        ];
        const sizeClasses = allSizeClasses.reduce((acc, x) => {
            const values = Object.entries(x.values)
                .map(([k, v]) => {
                return {
                    [`.${x.class}-${k}`]: v,
                };
            })
                .reduce((zacc, z) => {
                return {
                    ...zacc,
                    ...z,
                };
            }, {});
            return {
                ...acc,
                ...values,
            };
        }, {});
        const utils = {
            ...colorUtils,
            ...sizeClasses,
            ".outline-focus": {
                outlineColor: `hsl(var(--${prefix}-focus))`,
            },
            ".ring-focus": {
                "--tw-ring-opacity": (1).toString(),
                "--tw-ring-color": `hsl(var(--${prefix}-focus) / var(--tw-ring-opacity))`,
            },
        };
        addUtilities(utils);
        for (let index = 0; index < multiUIConfig.theme_names.length; index++) { }
        multiUIConfig.theme_names.forEach((themeName) => {
            themeName = themeName.replaceAll(" ", "-").replaceAll('"', "");
            addVariant(`theme-${themeName}`, `[data-theme="${themeName}"] &`);
        });
        matchVariant("theme", (themeName) => {
            themeName = themeName.replaceAll(" ", "-").replaceAll('"', "");
            return `[data-theme="${themeName}"] &`;
        });
    });
};
//# sourceMappingURL=MultiUIPlugin.js.map