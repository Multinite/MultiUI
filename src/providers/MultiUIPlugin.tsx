import plugin from "tailwindcss/plugin";
import type { RecursiveKeyValuePair } from "tailwindcss/types/config";

export default plugin(function ({
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
      backgroundColor: theme(`colors.${colorType}.${colorIndex}`),
    }),
    text: (
      colorType: (typeof allColorTypes)[number],
      colorIndex: ColorIndexs
    ) => ({
      color: theme(`colors.${colorType}.${colorIndex}`),
    }),
  };

  type Utils = Record<
    `.${(typeof allColorUtils)[number]}-${(typeof allColorTypes)[number]}${
      | ""
      | `-${ColorIndexValues}`}`,
    StyleObj
  >;

  const utils: Utils = allColorUtils.reduce((acc, z) => {
    return allColorTypes.reduce((acc, x) => {
      return allColorIndexs.reduce((acc2, x2) => {
        return {
          ...acc2,
          [`.${z}-${x}${x2 === -1 ? "" : `-${x2}`}`]: allColorUtilValues[z](
            x,
            x2 === -1 ? "DEFAULT" : x2
          ),
        };
      }, acc);
    }, {});
  }, {}) as Utils;

  addUtilities({
    ...utils,
  });
},
{});
