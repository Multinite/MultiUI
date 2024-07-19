import plugin from "tailwindcss/plugin";

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

  const allColorTypes = [
    "primary",
    "secondary",
    "foreground",
    "background",
  ] as const;

  const allColorUtils = ["bg", "text"] as const;

  const utils = allColorUtils.reduce((acc, z) => {
    return allColorTypes.reduce((acc, x) => {
      return allColorIndexs.reduce((acc2, x2) => {
        return {
          ...acc2,
          [`.${z}-${x}${x2 === -1 ? "" : `-${x2}`}`]: {
            backgroundColor: theme(`colors.${x}.${x2 === -1 ? "DEFAULT" : x2}`),
          },
        };
      }, acc);
    }, {});
  }, {});

  console.log(utils);

  addUtilities({
    ...utils,
  });
},
{});
