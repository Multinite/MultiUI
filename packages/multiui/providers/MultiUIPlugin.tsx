import plugin from "tailwindcss/plugin";
import type { RecursiveKeyValuePair } from "tailwindcss/types/config";
import type { MultiUIConfig } from "./../types/MultiUIConfig.js";

export const MultiUIPlugin = function (
  multiUIConfig: MultiUIConfig & { $schema?: string }
) {
  const prefix = (multiUIConfig.theme_prefix || "multiui") as "multiui";

  function cssVar(value: string[]) {
    return `hsl(var(--${prefix}-${value
      .map((x) => x.replaceAll("-", "_"))
      .filter((x) => x)
      .join("-")}))` as const;
  }
  return plugin(function ({
    theme,
    addUtilities,
    addComponents,
    addBase,
    e,
    config,
  }) {
    const allColorIndexs = [
      -1, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
    ] as const;
    type ColorIndexs =
      | 50
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900
      | "DEFAULT";
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
    const allColorTypes = [
      "primary",
      "secondary",
      "foreground",
      "background",
    ] as const;
    type StyleObj = RecursiveKeyValuePair;
    const allColorUtils = ["bg", "text"] as const;
    const allColorUtilValues = {
      bg: (
        colorType: (typeof allColorTypes)[number],
        colorIndex: ColorIndexs
      ) => ({
        backgroundColor: cssVar([
          colorType,
          colorIndex === "DEFAULT" ? "" : colorIndex.toString(),
        ]),
      }),
      text: (
        colorType: (typeof allColorTypes)[number],
        colorIndex: ColorIndexs
      ) => ({
        color: cssVar([
          colorType,
          colorIndex === "DEFAULT" ? "" : colorIndex.toString(),
        ]),
      }),
    };
    type Utils = Record<
      `.${(typeof allColorUtils)[number]}-${(typeof allColorTypes)[number]}${
        | ""
        | `-${ColorIndexValues}`}`,
      StyleObj
    >;
    const utils: Utils = allColorUtils.reduce((zacc, z) => {
      return {
        ...zacc,
        ...allColorTypes.reduce((acc, x) => {
          return allColorIndexs.reduce((acc2, x2) => {
            return {
              ...acc2,
              [`.${z}-${x}${x2 === -1 ? "" : `-${x2}`}`]: allColorUtilValues[z](
                x,
                x2 === -1 ? "DEFAULT" : x2
              ),
            };
          }, acc);
        }, {}),
      };
    }, {}) as Utils;

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

