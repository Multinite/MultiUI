import { ThemeT } from "../types/MultiUIConfig";
export type GlobalThisMultiUIType = {
    themes: {
        [key: string]: ThemeT;
    };
    defineThemeStylesInline: {
        [key: string]: boolean;
    };
    boxSelectionThemeSubscriptions: {
        themeId: string;
        cb: (theme: ThemeT) => void;
    }[];
};
declare function GlobalThemeSet({ theme, themeId, defineThemeStylesInline, enableBoxSelection, boxSelectionOptions, }: {
    theme: ThemeT;
    themeId?: string;
    enableBoxSelection: boolean;
    defineThemeStylesInline: boolean;
    boxSelectionOptions: {
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
}): import("react/jsx-runtime").JSX.Element | null;
export default GlobalThemeSet;
