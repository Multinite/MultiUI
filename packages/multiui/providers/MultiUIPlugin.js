import plugin from "tailwindcss/plugin";
export const MultiUIPlugin = function (multiUIConfig) {
    const prefix = (multiUIConfig.theme_prefix || "multiui");
    function cssVar(value) {
        return `hsl(var(--${prefix}-${value
            .map((x) => x.replaceAll("-", "_"))
            .filter((x) => x)
            .join("-")}))`;
    }
    return plugin(function ({ theme, addUtilities, addComponents, addBase, e, config, }) {
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
        const utils = allColorUtils.reduce((zacc, z) => {
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
        console.log(utils);
        addUtilities({
            ...utils,
            ".outline-focus": {
                outlineColor: `hsl(var(--${prefix}-focus))`,
            },
            ".ring-focus": {
                "--tw-ring-opacity": (1).toString(),
                "--tw-ring-color": `hsl(var(--${prefix}-focus) / var(--tw-ring-opacity))`,
            },
        });
    }, {});
};
//# sourceMappingURL=MultiUIPlugin.js.map