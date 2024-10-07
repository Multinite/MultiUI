import { type HTMLAttributes, type ReactNode } from "react";
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
} & Omit<HTMLAttributes<HTMLDivElement>, "children">): import("react/jsx-runtime").JSX.Element;
