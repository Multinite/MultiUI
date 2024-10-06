import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
import { cn } from "../utils/cn";
import GlobalThemeSet from "./GlobalThemeSet";
import BoxSelection from "./BoxSelection";

const validThemeIdRegex = /^[a-zA-Z0-9-_]+$/;

export const Theme = forwardRef<
  HTMLDivElement,
  {
    /**
     * Whether to update the document color scheme automatically or not.
     *
     * @example
     * <html style="color-scheme: dark">
     *
     * @default true
     */
    $updateDocumentColorScheme?: boolean;
    /**
     * Whether to persist the theme on localStorage or not.
     * @default true
     */
    $persistOnLocalstorage?: boolean;
    /**
     * The theme to use.
     */
    $theme: ThemeT;
    children?: ReactNode;
    /**
     * Whether to define the theme styles inline.
     *
     * if `true`, the theme style will be define using the `style` attribute of the `<div>` element.
     * Otherwise, the theme style will be defined using a `<style>` element.
     * @default true
     */
    $defineThemeStylesInline?: boolean;
    /**
     * The id of the theme.
     * This is required if you want to use the `useTheme` hook.
     */
    $themeId: string;
    /**
     * Whether to enable the box selection feature.
     *
     * If `true`, the box selection feature will be enabled.
     * @default false
     */
    $enableBoxSelection?: boolean;
    /**
     * The options for the box selection feature.
     */
    $boxSelectionOptions?: {
      /**
       * Enable lazy loading of the box selection feature.
       *
       * @default true
       */
      lazyLoad?: boolean;
      /**
       * Disable box selection on mobile devices.
       *
       * @deafult true
       */
      disableOnMobile?: boolean;
      /**
       * Only enables the selection box if the user was pressing a meta key while initiating the drag. Included meta keys are: Shift, Ctrl, Cmd and Alt.
       * @default true
       */
      activateOnMetaKey?: boolean;
      /**
       * Only enables the selection box if the user was pressing a specified key while initiating the drag.
       *
       * @default undefined
       */
      activateOnKey?: string[];
      /**
       * Automatically try to scroll the window when the pointer approaches the viewport edge while dragging.
       *
       * @default true
       */
      autoScroll?: boolean;
      /**
       * Distance in px from the viewport's edges from which the box will try scrolling the window when the pointer approaches the viewport edge while dragging.
       * @default 100
       */
      autoScrollEdgeDistance?: number;
      /**
       * Auto scroll speed.
       * @default 30
       */
      autoScrollStep?: number;
      /**
       * Will keep every item selected after selection. Can be cleared with clearSelection()
       * @default false
       */
      disableUnselection?: boolean;
      /**
       * Maximum number of elements that can be selected. Will stop selecting after reaching that number and keep already selected elements. false = Infinite
       * @default Infinity
       */
      maxSelections?: number | false;
    };
  } & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      $theme,
      $themeId,
      style,
      $defineThemeStylesInline = true,
      $updateDocumentColorScheme = true,
      $persistOnLocalstorage = true,
      $boxSelectionOptions = {
        lazyLoad: true,
        activateOnMetaKey: true,
        activateOnKey: undefined,
        autoScroll: true,
        autoScrollEdgeDistance: 100,
        autoScrollStep: 30,
        disableUnselection: false,
      },
      $enableBoxSelection = false,
      children,
      ...attr
    },
    ref
  ) => {
    if (validThemeIdRegex.test($themeId) === false)
      throw new Error(
        `Invalid themeId: "${$themeId}"\nPlease use only letters, numbers, dashes, and underscores.`
      );

    if ($defineThemeStylesInline) {
      return (
        <>
          <GlobalThemeSet
            theme={$theme}
            themeId={$themeId}
            defineThemeStylesInline={$defineThemeStylesInline}
            updateDocumentColorScheme={$updateDocumentColorScheme}
            persistOnLocalstorage={$persistOnLocalstorage}
          />
          <div className="relative" slot="multiui-theme-wrapper">
            <div
              {...attr}
              slot="multiui-theme"
              data-theme={$theme.name}
              {...(!$themeId ? {} : { "data-theme-id": $themeId })}
              style={{
                ...style,
                position: $enableBoxSelection ? "relative" : "static",
                ...getThemeFormatted({
                  theme: $theme,
                  outputType: "inline-style-object",
                }),
              }}
              ref={ref}
            >
              <BoxSelection
                theme={$theme}
                themeId={$themeId}
                boxSelectionOptions={$boxSelectionOptions}
                enableBoxSelection={$enableBoxSelection}
              />
              {children}
            </div>
          </div>
        </>
      );
    }
    const { className, ...rest } = attr;
    return (
      <>
        <GlobalThemeSet
          theme={$theme}
          themeId={$themeId}
          defineThemeStylesInline={$defineThemeStylesInline}
          persistOnLocalstorage={$persistOnLocalstorage}
          updateDocumentColorScheme={$updateDocumentColorScheme}
        />
        <div className="relative" slot="multiui-theme-wrapper">
          <style
            slot="multiui-theme-style"
            data-theme={$theme.name}
            dangerouslySetInnerHTML={{
              __html: getThemeFormatted({
                theme: $theme,
                outputType: "style-element",
              }),
            }}
            {...(!$themeId ? {} : { "data-style-theme-id": $themeId })}
          />
          <div
            {...rest}
            slot="multiui-theme"
            data-theme={$theme.name}
            className={cn(`${$theme.name}_theme`, className)}
            {...(!$themeId ? {} : { "data-theme-id": $themeId })}
            ref={ref}
            style={{
              position: $enableBoxSelection ? "relative" : "static",
            }}
          >
            <BoxSelection
              theme={$theme}
              themeId={$themeId}
              boxSelectionOptions={$boxSelectionOptions}
              enableBoxSelection={$enableBoxSelection}
            />
            {children}
          </div>
        </div>
      </>
    );
  }
);

export default Theme;

export type ThemeRenderOutputType =
  | "style-element"
  | "inline-style-string"
  | "inline-style-object";

/**
 * Internal function to get the theme object formatted to either a style element or inline style string.
 *
 */
//@ts-ignore
export const getThemeFormatted: <
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
    return outputType == "inline-style-string" || outputType === "style-element"
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
  function getThemeValue(keys) {
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
  const content = {
    [`--${theme_prefix}-content1`]: theme.content1.DEFAULT,
    [`--${theme_prefix}-content2-foreground`]: theme.content2.foreground,
    [`--${theme_prefix}-content2`]: theme.content1.DEFAULT,
    [`--${theme_prefix}-content3-foreground`]: theme.content3.foreground,
    [`--${theme_prefix}-content3`]: theme.content3.DEFAULT,
    [`--${theme_prefix}-content4-foreground`]: theme.content4.foreground,
    [`--${theme_prefix}-content4`]: theme.content4.DEFAULT,
  };
  const other = {
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
