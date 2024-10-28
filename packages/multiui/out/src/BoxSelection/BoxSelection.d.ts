import { type HTMLAttributes, type ReactNode } from "react";
/**
 * Enable box-selection for this component.
 *
 * @see {@link https://multiui.org/docs/box-selection}
 */
export declare function BoxSelection({ $boxSelectionId, $boxSelectionOptions, children, className, ...attr }: {
    $boxSelectionId: string;
    $boxSelectionOptions?: {
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
    children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">): ReactNode;
