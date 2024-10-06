import { ThemeT } from "../types";
declare function BoxSelection({ themeId, boxSelectionOptions, enableBoxSelection, theme, }: {
    theme: ThemeT;
    themeId: string;
    enableBoxSelection: boolean;
    boxSelectionOptions: {
        lazyLoad?: boolean;
        disableOnMobile?: boolean;
        activateOnMetaKey?: boolean;
        activateOnKey?: string[];
        autoScroll?: boolean;
        autoScrollEdgeDistance?: number;
        autoScrollStep?: number;
        disableUnselection?: boolean;
        maxSelections?: number | false;
    };
}): import("react/jsx-runtime").JSX.Element | null;
export default BoxSelection;
