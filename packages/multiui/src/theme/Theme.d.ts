import { type HTMLAttributes, type ReactNode } from "react";
import type { ThemeT } from "../types/MultiUIConfig";
export type Schemes = [dark: ThemeT, light: ThemeT];
export declare const Theme: import("react").ForwardRefExoticComponent<{
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
     *
     * If you want to cater the users color scheme preference, you must pass an array with two theme objects, first being dark, second being light.
     * Or you can pass a single theme which will be used for both dark and light.
     *
     * @example
     * <Theme $theme={[darkTheme, lightTheme]}>
     *   <App />
     * </Theme>
     */
    $theme: ThemeT | Schemes;
    children?: ReactNode;
    /**
     * Whether to define the theme styles inline.
     *
     * if `true`, the theme style will be define using the `style` attribute of the `<div>` element.
     * Otherwise, the theme style will be defined using a `<style>` element.
     * @default false
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
        /**
         * Any additional className to be added to the box-selection element.
         * @default undefined
         */
        className?: string;
    };
} & HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export default Theme;
export type ThemeRenderOutputType = "style-element" | "inline-style-string" | "inline-style-object";
/**
 * Internal function to get the theme object formatted to either a style element or inline style string.
 *
 */
export declare const getThemeFormatted: <
/**
 * style-element: <style>HERE</style> - string
 * inline-style-string: <div style="HERE"></div> - string
 * inline-style-object: <div style="HERE"></div> - Record<string, string>
 */
OutputType extends ThemeRenderOutputType>(props: {
    theme: ThemeT;
    theme_prefix?: string;
    outputType?: OutputType;
    custom_className?: string;
}) => OutputType extends "inline-style-string" ? string : OutputType extends "inline-style-object" ? Record<string, string> : string;
