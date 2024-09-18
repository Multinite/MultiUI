import { type HTMLAttributes, type ReactNode } from "react";
import { __seperateClasses } from "../utils/cn";
type ComponentDefaultProps<Element> = React.RefAttributes<Element> & HTMLAttributes<Element>;
type ComponentProperties<CustomProperties extends Record<string, unknown>, Element> = ConvertToValidProps<CustomProperties> & ComponentDefaultProps<Element>;
type ConvertToValidProps<CustomProperties extends Record<string, unknown>> = {
    [K in keyof CustomProperties as K extends `$${string}` ? K : `$${K}`]: CustomProperties[K];
};
type ClassNameHook = {
    className: (cb: ({ defaultCn, passedCn, }: {
        passedCn: string;
        defaultCn: string;
    }) => string) => {
        className: string;
    };
};
type UppercaseFirstLetter<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
type CustomComponentFn<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Hooks extends Record<string, Function>> = (args: {
    props: Omit<ComponentProperties<CustomProperties, Element>, "children">;
    Component: React.ForwardRefExoticComponent<React.PropsWithoutRef<ConvertToValidProps<CustomProperties> & React.HTMLAttributes<Element>> & React.RefAttributes<Element>>;
}, hooks: Hooks & ClassNameHook) => ReactNode;
export declare function createComponent<CustomProperties extends Record<`$${string}`, unknown>, Element extends HTMLElement, Hooks extends Record<`use${string}`, Function> = {}>(args: {
    name: string;
    createFn: (args: {
        props: ComponentProperties<CustomProperties, Element>;
        classNameSeperator: typeof __seperateClasses;
        createSlot: typeof createSlot;
    }) => {
        Component: ReactNode;
        hooks: Hooks;
    };
}): (createFn: (args: {
    props: ComponentProperties<CustomProperties, Element>;
    Component: import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<ConvertToValidProps<CustomProperties> & HTMLAttributes<Element>> & import("react").RefAttributes<Element>>;
}, hooks: Hooks & ClassNameHook) => ReactNode) => import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<ConvertToValidProps<CustomProperties> & Omit<HTMLAttributes<Element>, "children"> & {
    children?: ReactNode | CustomComponentFn<CustomProperties, Element, Hooks>;
}> & import("react").RefAttributes<Element>>;
export declare function createSlot<SlotName extends string, SlotProps extends Record<string, any>>(slotName: SlotName): {
    [K in SlotName]: SlotName;
} & {
    [K in `get${UppercaseFirstLetter<SlotName>}Classes`]: (props: SlotProps) => string;
};
export {};
