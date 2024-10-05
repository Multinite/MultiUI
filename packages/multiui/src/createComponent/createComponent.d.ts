import { FC, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
type GetElementAttributes<Element> = React.RefAttributes<Element> & HTMLAttributes<Element>;
type ComponentProperties<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Slots extends {
    [K in string]: HTMLElement;
}> = ConvertToValidProps<CustomProperties> & OmitUnwantedElementAttributes<GetElementAttributes<Element>> & AppendDefaultProperties<CustomProperties, Element, Slots>;
type OmitUnwantedElementAttributes<Attributes extends {}> = Omit<Attributes, UnwantedAttributes>;
type UnwantedAttributes = "children" | "className" | "slot";
type ConvertToValidProps<CustomProperties extends Record<string, unknown>> = Omit<{
    [K in keyof CustomProperties as K extends `$${string}` ? K : `$${K}`]: CustomProperties[K];
}, Prefix$onTuples<UnwantedAttributes>>;
type Prefix$onTuples<T extends string> = T extends `${infer U}` ? `${`$${U}`}` : T;
type DefaultHooks = {
    className: typeof getClassname;
};
type AppendDefaultProperties<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Slots extends {
    [K in string]: HTMLElement;
}> = CustomProperties & {
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
    children?: ReactNode | CustomComponentFn<AppendDefaultProperties<CustomProperties, Element, Slots>, Element, Slots>;
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
type CustomComponentFn<CustomProperties extends Record<string, unknown>, Element extends HTMLElement, Slots extends {
    [K: string]: HTMLElement;
}> = (args: {
    props: Omit<ComponentProperties<CustomProperties, Element, Slots>, "children">;
} & {
    [K in keyof Slots as K extends string ? UppercaseFirstLetter<K> : never]: FC<ComponentProperties<CustomProperties, Slots[K], Slots> & {
        children?: ReactNode;
    }>;
}) => ReactNode;
export declare function createComponent<CustomProperties extends Record<`$${string}`, unknown>, Element extends HTMLElement, Slots extends {
    [K: string]: HTMLElement;
}>(args: {
    name: string;
    createComponnetFn: (componentProps: Omit<ComponentProperties<CustomProperties, Element, Slots>, "children"> & {
        children?: ReactNode;
    }, args: {
        createSlot: <ComponentName extends keyof Slots, Component extends (props: HTMLAttributes<Slots[ComponentName]> & {
            children?: ReactNode;
        }, variantsPropertiesType: any) => ReactNode>(name: ComponentName, component: Component) => {
            [K in UppercaseFirstLetter<ComponentName>]: ((props: Parameters<Component>[0]) => ReturnType<Component>) & {
                name: ComponentName;
            };
        } & {
            [K in `get${UppercaseFirstLetter<ComponentName>}VariantClasses`]: (props: Parameters<Component>[1]) => string;
        };
        assembleClassname: (default_classes: string) => string;
    }) => ReactNode;
}): (createFn: (args: {
    props: Omit<ComponentProperties<CustomProperties, Element, Slots>, "children"> & {
        children: ReactNode;
    };
} & { [K in keyof Slots as K extends string ? UppercaseFirstLetter<K> : never]: FC<ComponentProperties<CustomProperties, Slots[K], Slots> & {
    children?: ReactNode;
}>; }, hooks: DefaultHooks) => ReactNode) => import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<ComponentProperties<CustomProperties, Element, Slots>> & import("react").RefAttributes<Element>>;
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
type CapitalizeKeys<T> = {
    [K in keyof T as Capitalize<string & K>]: T[K];
};
export type { CapitalizeKeys as CreateSlotsType };
