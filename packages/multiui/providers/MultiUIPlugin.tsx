import plugin from "tailwindcss/plugin";
import type { RecursiveKeyValuePair } from "tailwindcss/types/config";
import type { MultiUIConfig } from "./../types/MultiUIConfig";

const MultiUIPlugin = function (
  multiUIConfig: MultiUIConfig & { $schema?: string }
) {
  const prefix = (multiUIConfig.theme_prefix || "multiui") as "multiui";

  function cssVar(value: string[]) {
    return `var(--${prefix}-${value.join("-")})` as const;
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
        backgroundColor: cssVar([colorType, colorIndex.toString()]),
      }),
      text: (
        colorType: (typeof allColorTypes)[number],
        colorIndex: ColorIndexs
      ) => ({
        color: cssVar([colorType, colorIndex.toString()]),
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
    addUtilities({
      ...utils,
    });
    addUtilities({
      ".sup": {
        "content-visibility": "auto",
      },
      ".bro": {
        "content-visibility": "hidden",
      },
    });
  }, {});
};

export default MultiUIPlugin;

type toString<T extends number | string | bigint | boolean> = `${T}`;
