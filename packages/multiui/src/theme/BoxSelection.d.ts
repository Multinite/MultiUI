import { ThemeT } from "../types";
import { Schemes } from "./Theme";
declare function BoxSelection({ themeId, boxSelectionOptions, enableBoxSelection, theme, }: {
    theme: ThemeT | Schemes;
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
        className?: string;
    };
}): import("react/jsx-runtime").JSX.Element | null;
export default BoxSelection;
