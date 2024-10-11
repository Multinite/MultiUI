import Color from "color";
const allColorIndexs = [
    -1, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];
const allColorTypes = [
    "primary",
    "secondary",
    "foreground",
    "background",
    "default",
    "info",
    "success",
    "danger",
    "warning",
];
const allColorUtils = [
    "bg",
    "text",
    "border",
    "ring",
    "outline",
    "shadow",
    "from",
    "via",
    "to",
];
const allColorTransparencyValues = [
    -1, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    95, 100,
];
export function formatTheme(prefix = "multiui", e, exampleTheme) {
    let matches = [];
    const getCSSStylesFromColorData = {
        bg: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            if (colorTransparency) {
                matches.push({
                    name: `bg-${colorType}${colorIndex === undefined ? "" : `-${colorIndex}`}\\/`,
                    callback: (value) => {
                        return (color +
                            generateHexFromColor(exampleTheme, colorType, colorIndex, value));
                    },
                });
            }
            return {
                backgroundColor: color + colorExample,
            };
        },
        text: ({ colorIndex, colorType, colorTransparency }) => {
            const colorVar = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                color: colorVar + colorExample,
            };
        },
        border: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                borderColor: color + colorExample,
            };
        },
        ring: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                "--tw-ring-color": color + colorExample,
            };
        },
        outline: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                "--tw-ring-color": color + colorExample,
            };
        },
        shadow: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                "--tw-shadow-color": color + colorExample,
            };
        },
        from: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                "--tw-gradient-from": `${color} var(--tw-gradient-from-position)`,
                "--tw-gradient-to": `${color} var(--tw-gradient-to-position)`,
                "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)" + colorExample,
            };
        },
        via: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined);
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                "--tw-gradient-to": color + " var(--tw-gradient-to-position)",
                "--tw-gradient-stops": `var(--tw-gradient-from), ${color} var(--tw-gradient-via-position), var(--tw-gradient-to)` +
                    colorExample,
            };
        },
        to: ({ colorIndex, colorType, colorTransparency }) => {
            const color = cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined) + ` var(--tw-gradient-to-position);`;
            const colorExample = generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency);
            return {
                "--tw-gradient-to": color + colorExample,
            };
        },
    };
    // todo: add transparency values too
    const colorUtils = allColorUtils.reduce((zacc, colorUtil) => {
        return {
            ...zacc,
            ...allColorTypes.reduce((acc, colorType) => {
                return allColorIndexs.reduce((acc2, colorIndex) => {
                    return allColorTransparencyValues.reduce((acc3, colorTransparency) => {
                        return {
                            ...acc3,
                            [`.${colorUtil}-${colorType}${colorIndex === -1 ? "" : `-${colorIndex}`}${colorTransparency === -1 ? "" : `\\/${colorTransparency}`}`]: getCSSStylesFromColorData[colorUtil]({
                                colorType,
                                colorIndex: colorIndex === -1 ? undefined : colorIndex,
                                colorTransparency: colorTransparency === -1 ? undefined : colorTransparency,
                            }),
                        };
                    }, acc2);
                }, acc);
            }, {}),
        };
    }, {});
    console.log(colorUtils);
    console.log(Object.keys(colorUtils).length);
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
                    borderRadius: cssVar(["rounded", "small"], undefined),
                },
                medium: {
                    borderRadius: cssVar(["rounded", "medium"]),
                },
                large: {
                    borderRadius: cssVar(["rounded", "large"]),
                },
                //?--- large
                "t-large": {
                    borderTopLeftRadius: cssVar(["rounded", "large"]),
                    borderTopRightRadius: cssVar(["rounded", "large"]),
                },
                "b-large": {
                    borderBottomLeftRadius: cssVar(["rounded", "large"]),
                    borderBottomRightRadius: cssVar(["rounded", "large"]),
                },
                "l-large": {
                    borderBottomLeftRadius: cssVar(["rounded", "large"]),
                    borderTopLeftRadius: cssVar(["rounded", "large"]),
                },
                "r-large": {
                    borderBottomRightRadius: cssVar(["rounded", "large"]),
                    borderTopRightRadius: cssVar(["rounded", "large"]),
                },
                "tl-large": {
                    borderTopLeftRadius: cssVar(["rounded", "large"]),
                },
                "tr-large": {
                    borderTopRightRadius: cssVar(["rounded", "large"]),
                },
                "bl-large": {
                    borderBottomLeftRadius: cssVar(["rounded", "large"]),
                },
                "br-large": {
                    borderBottomRightRadius: cssVar(["rounded", "large"]),
                },
                "e-large": {
                    borderStartEndRadius: cssVar(["rounded", "large"]),
                    borderEndEndRadius: cssVar(["rounded", "large"]),
                },
                "s-large": {
                    borderStartStartRadius: cssVar(["rounded", "large"]),
                    borderEndStartRadius: cssVar(["rounded", "large"]),
                },
                "ss-large": {
                    borderStartStartRadius: cssVar(["rounded", "large"]),
                },
                "se-large": {
                    borderStartEndRadius: cssVar(["rounded", "large"]),
                },
                "ee-large": {
                    borderEndEndRadius: cssVar(["rounded", "large"]),
                },
                "es-large": {
                    borderEndStartRadius: cssVar(["rounded", "large"]),
                },
                //?---- medium
                "t-medium": {
                    borderTopLeftRadius: cssVar(["rounded", "medium"]),
                    borderTopRightRadius: cssVar(["rounded", "medium"]),
                },
                "b-medium": {
                    borderBottomLeftRadius: cssVar(["rounded", "medium"]),
                    borderBottomRightRadius: cssVar(["rounded", "medium"]),
                },
                "l-medium": {
                    borderBottomLeftRadius: cssVar(["rounded", "medium"]),
                    borderTopLeftRadius: cssVar(["rounded", "medium"]),
                },
                "r-medium": {
                    borderBottomRightRadius: cssVar(["rounded", "medium"]),
                    borderTopRightRadius: cssVar(["rounded", "medium"]),
                },
                "tl-medium": {
                    borderTopLeftRadius: cssVar(["rounded", "medium"]),
                },
                "tr-medium": {
                    borderTopRightRadius: cssVar(["rounded", "medium"]),
                },
                "bl-medium": {
                    borderBottomLeftRadius: cssVar(["rounded", "medium"]),
                },
                "br-medium": {
                    borderBottomRightRadius: cssVar(["rounded", "medium"]),
                },
                "e-medium": {
                    borderStartEndRadius: cssVar(["rounded", "medium"]),
                    borderEndEndRadius: cssVar(["rounded", "medium"]),
                },
                "s-medium": {
                    borderStartStartRadius: cssVar(["rounded", "medium"]),
                    borderEndStartRadius: cssVar(["rounded", "medium"]),
                },
                "ss-medium": {
                    borderStartStartRadius: cssVar(["rounded", "medium"]),
                },
                "se-medium": {
                    borderStartEndRadius: cssVar(["rounded", "medium"]),
                },
                "ee-medium": {
                    borderEndEndRadius: cssVar(["rounded", "medium"]),
                },
                "es-medium": {
                    borderEndStartRadius: cssVar(["rounded", "medium"]),
                },
                //?---- small
                "t-small": {
                    borderTopLeftRadius: cssVar(["rounded", "small"]),
                    borderTopRightRadius: cssVar(["rounded", "small"]),
                },
                "b-small": {
                    borderBottomLeftRadius: cssVar(["rounded", "small"]),
                    borderBottomRightRadius: cssVar(["rounded", "small"]),
                },
                "l-small": {
                    borderBottomLeftRadius: cssVar(["rounded", "small"]),
                    borderTopLeftRadius: cssVar(["rounded", "small"]),
                },
                "r-small": {
                    borderBottomRightRadius: cssVar(["rounded", "small"]),
                    borderTopRightRadius: cssVar(["rounded", "small"]),
                },
                "tl-small": {
                    borderTopLeftRadius: cssVar(["rounded", "small"]),
                },
                "tr-small": {
                    borderTopRightRadius: cssVar(["rounded", "small"]),
                },
                "bl-small": {
                    borderBottomLeftRadius: cssVar(["rounded", "small"]),
                },
                "br-small": {
                    borderBottomRightRadius: cssVar(["rounded", "small"]),
                },
                "e-small": {
                    borderStartEndRadius: cssVar(["rounded", "small"]),
                    borderEndEndRadius: cssVar(["rounded", "small"]),
                },
                "s-small": {
                    borderStartStartRadius: cssVar(["rounded", "small"]),
                    borderEndStartRadius: cssVar(["rounded", "small"]),
                },
                "ss-small": {
                    borderStartStartRadius: cssVar(["rounded", "small"]),
                },
                "se-small": {
                    borderStartEndRadius: cssVar(["rounded", "small"]),
                },
                "ee-small": {
                    borderEndEndRadius: cssVar(["rounded", "small"]),
                },
                "es-small": {
                    borderEndStartRadius: cssVar(["rounded", "small"]),
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
    return {
        utils,
        matches,
    };
    function cssVar(value, transp) {
        //@ts-expect-error - this works.
        return `hsl${transp ? "a" : ""}(var(--${prefix}-${value
            .map((x) => x.replaceAll("-", "_"))
            .filter((x) => x)
            .join("-")})${transp ? `, ${transp}` : ""})`;
    }
}
/**
 * Internal function used specifically for `getCSSStylesFromColorData`.
 */
function generateHexFromColor(exampleTheme, colorType, colorIndex, colorTransparency) {
    let color = exampleTheme
        ? exampleTheme[colorType][colorIndex ? colorIndex : "DEFAULT"]
        : undefined;
    return color
        ? ` /* ${Color(`hsla(${color}${colorTransparency ? `, ${colorTransparency / 100}` : ""})`).hexa()} */`
        : "";
}
//# sourceMappingURL=formatTheme.js.map