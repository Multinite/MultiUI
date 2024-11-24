import { type HTMLAttributes, type ReactElement } from "react";
export declare const Selectable: import("react").ForwardRefExoticComponent<{
    children: ReactElement;
    onSelect?: ((element: HTMLElement) => void) | undefined;
    onUnselect?: ((element: HTMLElement) => void) | undefined;
    specificThemeId?: string | undefined;
} & import("react").RefAttributes<HTMLElement>>;
export declare function SelectableGroup({ children, onSelect, onUnselect, specificThemeId, ...attr }: {
    children: ReactElement[];
    onSelect?: (element: HTMLElement) => void;
    onUnselect?: (element: HTMLElement) => void;
    specificThemeId?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSelect">): import("react/jsx-runtime").JSX.Element;
