import { FC, type HTMLAttributes, type ReactNode } from "react";
import { __seperateClasses, cn } from "../utils/cn";
type GetElementAttributes<Element> = React.RefAttributes<Element> & HTMLAttributes<Element>;
type ComponentProperties<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Hooks extends Record<string, Function>> = ConvertToValidProps<CustomProperties> & OmitUnwantedElementAttributes<GetElementAttributes<Element>> & AppendDefaultProperties<CustomProperties, Element, Hooks>;
type OmitUnwantedElementAttributes<Attributes extends {}> = Omit<Attributes, UnwantedAttributes>;
type UnwantedAttributes = "children" | "className" | "slot";
type ConvertToValidProps<CustomProperties extends Record<string, unknown>> = Omit<{
    [K in keyof CustomProperties as K extends `$${string}` ? K : `$${K}`]: CustomProperties[K];
}, Prefix$onTuples<UnwantedAttributes>>;
type Prefix$onTuples<T extends string> = T extends `${infer U}` ? `${`$${U}`}` : T;
type DefaultHooks = {
    className: typeof getClassname;
};
type AppendDefaultProperties<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Hooks extends Record<string, Function>> = CustomProperties & {
    /**
     * ### ───────────────────────────
     * ![Image of demo-code](https://multiui.org/assets/code/classname.png|width=569.6|height=68)
     * ### ───────────────────────────
     * ## Pick your poison: Assigning classes with better control.
     * ### ㅤㅤ
     * ### Function: More control over the button's classes.
     * ```tsx
     * <Button $className={({ classes, cn }) => cn(classes, "your TW classes")}>
     * ㅤHello, World!
     * </Button>
     * ```
     * ### ㅤㅤ
     * # OR
     * ### ㅤㅤ
     *
     * ### String: Default classes are prepended, followed by your classes.
     * ```tsx
     * <Button $className="your TW classes">
     * ㅤHello, World!
     * </Button>
     * ```
     * ### ───────────────────────────
     * Note: If you use the default `className` prop, it will be overridden by this `$className` prop.
     * @see {@link https://multiui.org/docs/custom-classes}
     */
    $className?: ClassNameFn;
    /**
     * # Do not use!
     * You're completely fine to use the `className` prop, however, we recommend you use the MultiUI custom `$className` prop to have further granularity over the classes.
     *
     * Note: If you use both, the `$className` prop will take priority and override the `className` prop.
     *
     * @deprecated
     */
    className?: string;
    /**
     * # Do not use!
     * MultiUI will automatically add a slot.
     *
     * @deprecated
     */
    slot?: string;
    /**
     * # Children
     * Children works like normal, however if you pass a function, it will be treated as a custom component builder.
     *
     * Custom Component Builder:
     * ```tsx
     * <Button>
     *   {({ Component, props, classNameSeperator }) => (
     *     <Component {...props} className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} />
     *   )}
     * </Button>
     * ```
     *
     * @see {@link https://multiui.org/docs/custom-components}
     *
     */
    children?: ReactNode | CustomComponentFn<AppendDefaultProperties<CustomProperties, Element, Hooks>, Element, Hooks>;
    /**
     * # Don't use.
     * This is a prop made for the sake of DX, it makes it easier to see the seperation between custom properties that are defined with `$` and the normal properties.
     * ### ───────────────────────────
     * ![Image of demo](https://multiui.org/assets/code/underscore_property_seperator)
     * ### ───────────────────────────
     *
     */
    _______________________?: never;
};
type UppercaseFirstLetter<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
type CustomComponentFn<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Hooks extends Record<string, Function>> = (args: {
    props: Omit<ComponentProperties<CustomProperties, Element, Hooks>, "children">;
    Component: FC<ComponentProperties<CustomProperties, Element, Hooks> & {
        children?: ReactNode;
    }>;
}, hooks: Hooks & DefaultHooks) => ReactNode;
export declare function createComponent<CustomProperties extends Record<`$${string}`, unknown>, Element extends HTMLElement, Hooks extends Record<`use${string}`, Function> = {}>(args: {
    name: string;
    createFn: (args: {
        props: ComponentProperties<CustomProperties, Element, Hooks>;
        classNameSeperator: typeof __seperateClasses;
        createSlot: typeof createSlot;
        createHooks: (hooks: Hooks) => Hooks & DefaultHooks;
    }) => {
        Component: ReactNode;
        hooks: Hooks;
    };
}): (createFn: (args: {
    props: ComponentProperties<CustomProperties, Element, Hooks>;
    Component: import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<ComponentProperties<CustomProperties, Element, Hooks>> & import("react").RefAttributes<Element>>;
}, hooks: Hooks & DefaultHooks) => ReactNode) => import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<ComponentProperties<CustomProperties, Element, Hooks>> & import("react").RefAttributes<Element>>;
export declare function createSlot<SlotName extends string, SlotProps extends Record<string, any>>(slotName: SlotName): {
    [K in SlotName]: SlotName;
} & {
    [K in `get${UppercaseFirstLetter<SlotName>}Classes`]: (props: SlotProps) => string;
};
export declare function getClassname({ $className, default_className, }: {
    $className: ClassNameFn;
    default_className: string;
}): {
    className: string;
};
type ClassNameFn = ((props: {
    /**
     * The default classes that intend to be passed to the button.
     */
    classes: string;
    cn: typeof cn;
}) => string) | string;
export {};
