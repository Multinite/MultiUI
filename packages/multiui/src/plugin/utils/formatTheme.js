const allColorIndexs = [
    -1, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];
const allColorTypes = [
    "primary",
    "secondary",
    "foreground",
    "background",
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
export function formatTheme(prefix = "multiui", e) {
    const getCSSStylesFromColorData = {
        bg: ({ colorIndex, colorType, colorTransparency }) => ({
            backgroundColor: cssVar([
                colorType,
                colorIndex === undefined
                    ? ""
                    : colorIndex.toString(),
            ], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        text: ({ colorIndex, colorType, colorTransparency }) => ({
            color: cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        border: ({ colorIndex, colorType, colorTransparency }) => ({
            borderColor: cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        ring: ({ colorIndex, colorType, colorTransparency }) => ({
            "--tw-ring-color": cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        outline: ({ colorIndex, colorType, colorTransparency, }) => ({
            "--tw-ring-color": cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        shadow: ({ colorIndex, colorType, colorTransparency }) => ({
            "--tw-shadow-color": cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        from: ({ colorIndex, colorType, colorTransparency }) => ({
            "--tw-gradient-from": cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
        via: ({ colorIndex, colorType, colorTransparency }) => ({
            "--tw-gradient-via": cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined) + " / var(--tw-gradient-to-position)",
            "--tw-gradient-stops": `var(--tw-gradient-from), ${cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined)} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        }),
        to: ({ colorIndex, colorType, colorTransparency }) => ({
            "--tw-gradient-to": cssVar([colorType, colorIndex === undefined ? "" : colorIndex.toString()], colorTransparency ? colorTransparency / 100 : undefined),
        }),
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
    return {
        utils,
    };
    function cssVar(value, transp) {
        //@ts-expect-error - this works.
        return `hsl(var(--${prefix}-${value
            .map((x) => x.replaceAll("-", "_"))
            .filter((x) => x)
            .join("-")})${transp ? ` / ${transp}` : ""})`;
    }
}
//# sourceMappingURL=formatTheme.js.map