import Color from "color";
import type { RecursiveKeyValuePair } from "tailwindcss/types/config";
type ColorIndexs = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorIndexValues =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
type ColorTransparencyValues =
  | 0
  | 5
  | 10
  | 15
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
  | 50
  | 55
  | 60
  | 65
  | 70
  | 75
  | 80
  | 85
  | 90
  | 95
  | 100;
type StyleObj = RecursiveKeyValuePair;

const allColorIndexs = [
  -1, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

const allColorTypes = [
  "primary",
  "secondary",
  "foreground",
  "background",
] as const;

type ColorTypes = (typeof allColorTypes)[number];

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
] as const;

const allColorTransparencyValues = [
  -1, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
  95, 100,
] as const;

type getCssVariable = {
  colorType: ColorTypes;
  colorIndex?: ColorIndexs;
  colorTransparency?: ColorTransparencyValues;
};

export function formatTheme(
  prefix: string = "multiui",
  e: (className: string) => string
) {
  const getCSSStylesFromColorData = {
    bg: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      backgroundColor: cssVar(
        [
          colorType,
          colorIndex === undefined
            ? ""
            : (colorIndex.toString() as NumberToString<ColorIndexs>),
        ],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    text: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      color: cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    border: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      borderColor: cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    ring: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      "--tw-ring-color": cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    outline: ({
      colorIndex,
      colorType,
      colorTransparency,
    }: getCssVariable) => ({
      "--tw-ring-color": cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    shadow: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      "--tw-shadow-color": cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    from: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      "--tw-gradient-from": cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
    via: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      "--tw-gradient-via":
        cssVar(
          [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
          colorTransparency ? colorTransparency / 100 : undefined
        ) + " / var(--tw-gradient-to-position)",
      "--tw-gradient-stops": `var(--tw-gradient-from), ${cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      )} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
    }),
    to: ({ colorIndex, colorType, colorTransparency }: getCssVariable) => ({
      "--tw-gradient-to": cssVar(
        [colorType, colorIndex === undefined ? "" : colorIndex.toString()],
        colorTransparency ? colorTransparency / 100 : undefined
      ),
    }),
  };

  type Utils = Record<
    `.${(typeof allColorUtils)[number]}-${(typeof allColorTypes)[number]}${
      | ""
      | `-${ColorIndexValues}`}${"" | `/${ColorTransparencyValues}`}`,
    StyleObj
  >;
  // todo: add transparency values too
  const colorUtils: Utils = allColorUtils.reduce((zacc, colorUtil) => {
    return {
      ...zacc,
      ...allColorTypes.reduce((acc, colorType) => {
        return allColorIndexs.reduce((acc2, colorIndex) => {
          return allColorTransparencyValues.reduce(
            (acc3, colorTransparency) => {
              return {
                ...acc3,
                [`.${colorUtil}-${colorType}${colorIndex === -1 ? "" : `-${colorIndex}`}${colorTransparency === -1 ? "" : `\\/${colorTransparency}`}`]:
                  getCSSStylesFromColorData[colorUtil]({
                    colorType,
                    colorIndex: colorIndex === -1 ? undefined : colorIndex,
                    colorTransparency:
                      colorTransparency === -1 ? undefined : colorTransparency,
                  }),
              };
            },
            acc2
          );
        }, acc);
      }, {}),
    };
  }, {}) as Utils;
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
  ] as const;

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

  function cssVar<
    const Val extends string[],
    Transp extends number | undefined,
  >(
    value: Val,
    transp?: Transp
  ): `hsl(var(--${typeof prefix}-${RemoveTrailingHyphen<JoinWithHyphen<Val>>})${Transp extends undefined ? "" : ` \/ ${Transp}`})` {
    //@ts-expect-error - this works.
    return `hsl(var(--${prefix}-${value
      .map((x) => x.replaceAll("-", "_"))
      .filter((x) => x)
      .join("-")})${transp ? ` / ${transp}` : ""})` as const;
  }
}
type JoinWithHyphen<T extends string[]> = T extends []
  ? ""
  : T extends [string]
    ? `${T[0]}`
    : T extends [string, ...infer Rest]
      ? `${T[0]}${Rest extends [] ? "" : "-"}${JoinWithHyphen<Rest extends string[] ? Rest : never>}`
      : string;
type NumberToString<T extends number> = `${T}`;

type RemoveTrailingHyphen<T extends string> = T extends `${infer X}-` ? X : T;
