import plugin from "tailwindcss/plugin";
const MultiUIPlugin = plugin(function ({ theme, addUtilities, addComponents, addBase, e, config, }) {
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
            backgroundColor: "red" || theme(`colors.${colorType}.${colorIndex}`),
        }),
        text: (colorType, colorIndex) => ({
            color: "red" || theme(`colors.${colorType}.${colorIndex}`),
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
    addUtilities({
        ...utils,
    });
}, {});
export default MultiUIPlugin;
//# sourceMappingURL=MultiUIPlugin.js.map