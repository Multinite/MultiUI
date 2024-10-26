import { ThemeT } from "../types";
import { Schemes, ThemeRenderOutputType } from "./Theme";

const setThemeScript = (args: {
  themeId: string;
  theme: ThemeT | Schemes;
  defineThemeStylesInline: boolean;
}) => {
  //@ts-ignore
  const getThemeFormatted: <
    /**
     * style-element: <style>HERE</style> - string
     * inline-style-string: <div style="HERE"></div> - string
     * inline-style-object: <div style="HERE"></div> - Record<string, string>
     */
    OutputType extends ThemeRenderOutputType,
  >(props: {
    theme: ThemeT;
    theme_prefix?: string;
    outputType?: OutputType;
    custom_className?: string;
  }) => OutputType extends "inline-style-string"
    ? string
    : OutputType extends "inline-style-object"
      ? Record<string, string>
      : string = function ({
    theme,
    outputType = "inline-style",
    theme_prefix = "multiui",
    custom_className,
  }) {
    if (theme === undefined)
      return outputType == "inline-style-string" ||
        outputType === "style-element"
        ? ""
        : {};

    function colorValues(color: string) {
      return {
        //@ts-ignore
        [`--${theme_prefix}-${color}`]: theme[color].DEFAULT,
        //@ts-ignore
        [`--${theme_prefix}-${color}-100`]: theme[color][100],
        //@ts-ignore
        [`--${theme_prefix}-${color}-200`]: theme[color][200],
        //@ts-ignore
        [`--${theme_prefix}-${color}-300`]: theme[color][300],
        //@ts-ignore
        [`--${theme_prefix}-${color}-400`]: theme[color][400],
        //@ts-ignore
        [`--${theme_prefix}-${color}-500`]: theme[color][500],
        //@ts-ignore
        [`--${theme_prefix}-${color}-600`]: theme[color][600],
        //@ts-ignore
        [`--${theme_prefix}-${color}-700`]: theme[color][700],
        //@ts-ignore
        [`--${theme_prefix}-${color}-800`]: theme[color][800],
        //@ts-ignore
        [`--${theme_prefix}-${color}-900`]: theme[color][900],
      };
    }
    function getThemeValue(keys: string[]) {
      if (theme === undefined) return {};
      let val = theme;
      for (let i = 0; i < keys.length; i++) {
        //@ts-ignore
        val = val[keys[i]];
      }
      return val;
    }
    const bg = colorValues("background");
    const fg = colorValues("foreground");
    const primary = colorValues("primary");
    const secondary = colorValues("secondary");
    const default_ = colorValues("default");
    const danger = colorValues("danger");
    const success = colorValues("success");
    const info = colorValues("info");
    const warning = colorValues("warning");

    const content = {
      [`--${theme_prefix}-content1`]: theme.content1.DEFAULT,
      [`--${theme_prefix}-content2-foreground`]: theme.content2.foreground,
      [`--${theme_prefix}-content2`]: theme.content1.DEFAULT,
      [`--${theme_prefix}-content3-foreground`]: theme.content3.foreground,
      [`--${theme_prefix}-content3`]: theme.content3.DEFAULT,
      [`--${theme_prefix}-content4-foreground`]: theme.content4.foreground,
      [`--${theme_prefix}-content4`]: theme.content4.DEFAULT,
    };

    const textSize = {
      [`--${theme_prefix}-text-size-extra-small`]: getThemeValue([
        "text-size",
        "extra-small",
      ]),
      [`--${theme_prefix}-text-size-small`]: getThemeValue([
        "text-size",
        "small",
      ]),
      [`--${theme_prefix}-text-size-medium`]: getThemeValue([
        "text-size",
        "medium",
      ]),
      [`--${theme_prefix}-text-size-large`]: getThemeValue([
        "text-size",
        "large",
      ]),
      [`--${theme_prefix}-text-size-extra-large`]: getThemeValue([
        "text-size",
        "extra-large",
      ]),
      [`--${theme_prefix}-text-size-extra-extra-large`]: getThemeValue([
        "text-size",
        "extra-extra-large",
      ]),
    };

    const borderRadius = {
      [`--${theme_prefix}-radius-small`]: getThemeValue(["borderRadius", "sm"]),
      [`--${theme_prefix}-radius-medium`]: getThemeValue([
        "borderRadius",
        "md",
      ]),
      [`--${theme_prefix}-radius-large`]: getThemeValue(["borderRadius", "lg"]),
    };

    const other = {
      [`--${theme_prefix}-focus`]: getThemeValue(["focus"]),
    };
    const style = {
      [`/* MultiUI Theme`]: "*/",
      [`--${theme_prefix}-theme`]: `"${theme.name}"`,
      [`--${theme_prefix}-scheme`]: `${theme.scheme}`,
      [`/* Background Values`]: "*/",
      ...bg,
      [`/* Foreground Values`]: "*/",
      ...fg,
      [`/* Primary Values`]: "*/",
      ...primary,
      [`/* Secondary Values`]: "*/",
      ...secondary,
      [`/* Default Values`]: "*/",
      ...default_,
      [`/* Content Values`]: "*/",
      ...content,
      [`/* Danger Values`]: "*/",
      ...danger,
      [`/* Success Values`]: "*/",
      ...success,
      [`/* Info Values`]: "*/",
      ...info,
      [`/* Warning Values`]: "*/",
      ...warning,
      [`/* Border Radius Values`]: "*/",
      ...borderRadius,
      [`/* Text Size Values`]: "*/",
      ...textSize,
      [`/* Other Values`]: "*/",
      ...other,
    };
    if (outputType === "style-element") {
      return (
        `.${custom_className || `${theme.name}_theme`} {\n` +
        Object.entries(style)
          .map(([key, value]) => {
            return `  ${key}: ${value};\n`;
          })
          .join("") +
        "}"
      );
    } else if (outputType === "inline-style-string") {
      return Object.entries(style)
        .filter((x) => x[1].trim() !== "*/")
        .map(([key, value]) => {
          return `  ${key}: ${value};\n`;
        })
        .join("");
    } else if (outputType === "inline-style-object") {
      return Object.fromEntries(
        Object.entries(style).filter((x) => x[1].trim() !== "*/")
      );
    }
  };

  let color_scheme = (() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      function handler(e: MediaQueryListEvent) {
        if (e.matches) {
          // dark mode
          color_scheme = "dark";
        } else {
          color_scheme = "light";
        }
        update();
      }
      if (mediaQuery.addListener) {
        mediaQuery.addListener(handler);
      } else {
        mediaQuery.addEventListener("change", handler);
      }
      return mediaQuery.matches ? "dark" : "light";
    } else {
      return undefined;
    }
  })();

  update();
  function update() {
    const theme_element = document.getElementById(
      `multiui-theme-${args.themeId}`
    );
    if (!theme_element)
      throw new Error(
        `MultiUI: Could not find the multiui theme element with id "multiui-theme-${args.themeId}"`
      );

    const theme = Array.isArray(args.theme)
      ? color_scheme === "light"
        ? args.theme[1]
        : args.theme[0]
      : args.theme;

    theme_element.setAttribute("data-theme", theme.name);
    theme_element.setAttribute("data-theme-scheme", theme.scheme);
    if (args.defineThemeStylesInline) {
      theme_element.style.cssText = getThemeFormatted({
        theme: theme,
        outputType: "inline-style-string",
      });
    } else {
      const findStyleEl = document.querySelector(
        `style[data-style-theme-id="${args.themeId}"]`
      );
      if (findStyleEl) {
        findStyleEl.innerHTML = getThemeFormatted({
          theme: theme,
          outputType: "style-element",
        });
      } else {
        throw new Error(
          `MultiUI: Failed to update the theme for theme-id ${args.themeId}: Couldn't find style element to update.`
        );
      }
    }
  }

  // clean up - delete this script.
  //   document.getElementById(`multiui-theme-script-${args.themeId}`)!.remove();
};

export default setThemeScript;
