import { MultiUIConfig, ThemeType } from "../types/MultiUIConfig.js";
declare const default_ThemeType: ThemeType;
/**
 *
 * @example
 *
 * ```tsx
 * <MultiUIProvider config={MultiUIProviderProps(multiui_config)}>
 *   <App />
 * </MultiUIProvider>
 * ```
 *
 * @param props Use the `MultiUIProviderProps` function to pass props to this component.
 * @returns
 */
export declare const MultiUIProvider: import("react").NamedExoticComponent<{
    ThemeTypes?: ThemeType[];
    config?: {
        ThemeType_prefix?: MultiUIConfig["theme_prefix"];
    };
    /**
     * Apply a blur effect to the page when the ThemeType changes.
     * @default false
     */
    blurOnThemeTypeChange?: boolean;
    /**
     * Enable box selection support.
     * We recommend supporting this feature, as it allows users to have another layer of control over interactions on components.
     *
     * @default false
     * @see {@link https://multiui.org/docs/box-selection}
     */
    enableBoxSelection?: boolean;
    /**
     * Options for box selection.
     * @see {@link https://multiui.org/docs/box-selection}
     */
    boxSelectionOptions?: {
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
    children: React.ReactNode;
}>;
export { default_ThemeType as multiUI_defaultThemeType };
export declare const useThemeType: () => unknown;
