import { type ReactNode, type HTMLAttributes, type ForwardedRef } from "react";
import { __seperateClasses, cn as cn_ } from "../utils/cn.js";
/**
 * Represents a chain of variants for component slots.
 */
type VariantChain<Slots extends Record<string, Record<string, any>>> = {
    createChainedVariant: CreateVariantFromChainedVariant<Slots, keyof Slots>;
};
/**
 * Type for creating a chained variant from an existing variant.
 */
type CreateVariantFromChainedVariant<Slots extends Record<string, Record<string, any>>, Slot extends keyof Slots> = (args: {
    name: string;
    create: (props: Slots[Slot], chainedVariantClasses: string, cn: typeof cn_) => string;
}) => VariantChain<Slots>;
/**
 * Type for creating a new variant function.
 */
type CreateVariantFn<Slots extends Record<string, Record<string, any>>, Slot extends keyof Slots> = (args: {
    slot: Slot;
    name: string;
    create: (props: Slots[Slot], cn: typeof cn_) => string;
}) => VariantChain<Slots>;
/**
 * # Creates a new MultiUI component
 * Allows you to create a MultiUI component with customizable slots, variants and other features.
 *
 * ```tsx
 * // Make sure to add some JSDoc to your component.
 * const Component = createComponent("component_name", ({ props, createSlot, classNameSeperator }) => {
 *   return (
 *     <div className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} {...props}>
 *       {props.children}
 *     </div>
 *   );
 * });
 *
 * export default Component;
 * ```
 *
 * @template ComponentProps - The props for the component.
 * @template Slots
 * ### ───────────────────────────
 * # Slots
 * Define the component's slots using an object structure. Each key represents a slot name,
 * and its corresponding value is an object containing all the properties that can be
 * passed to the variants when creating a variant for that slot.
 *
 * ```tsx
 * type MyComponentSlots = {
 * ㅤㅤbase: { // Defining the slot named `base`
 * ㅤㅤㅤㅤisDisabled: boolean; // The props that can be passed for the creation of the variant.
 * ㅤㅤㅤㅤisOpen: boolean;
 * ㅤㅤㅤㅤisHovering: boolean;
 * ㅤㅤ},
 * ㅤㅤ// ... rest of the slots
 * }
 *
 * const createMyComponent = createComponent<MyComponentProps, MyComponentSlots, HTMLButtonElement>(my_component_name, ({ props }) => {
 * ㅤㅤ// ... rest of the component
 * })
 * ```
 * ### ───────────────────────────
 * @template Element - The HTML element type for the component.
 * @param {string} componentName - The name of the component.
 * @param {Function} create - Function to create the component structure.
 * @returns The created Component.
 */
export declare const createComponent: <ComponentProps, Slots extends Record<string, Record<string, any>>, Element extends HTMLElement = HTMLElement>(componentName: string, create: (props: {
    /**
     * The props passed to the component.
     */
    props: ComponentProps & {
        ref: ForwardedRef<Element>;
    } & HTMLAttributes<Element>;
    /**
     * Slots define the structural components of a UI element.
     * ### ㅤㅤ
     * For example, a popout component might have the following slots:
     * - `base`: The wrapper for the entire popout (always present)
     * - `content`: The main content area of the popout
     * - `trigger`: The element that activates the popout
     *
     * Each slot can be styled and configured independently, allowing for
     * flexible and modular component design.
     * ### ㅤㅤ
     * @example
     * ```tsx
     * createSlot({
     *   // The slot is the name of the slot to be created.
     *   slot: "the_name_of_the_slot",
     *   // The styling_args are the arguments that are passed to the createVariant function,
     *   // this allows for the creation of the variant to be dynamic.
     *   styling_args: {
     *     some_variable,
     *     some_other_variable,
     *     even_a_function,
     *     ...
     *   },
     * });
     * ```
     * ### ㅤㅤ
     * ### Use this function to create a slot for an element.
     * ![Simple example usage of createSlot](https://multiui.org/assets/code/slot_simple.png|width=500)
     * ### ㅤㅤ
     * ### ㅤㅤ
     * ### Advance example:
     * ![Example usage of createSlot](https://multiui.org/assets/code/slot.png|width=500)
     * ### ㅤㅤ
     * For more information on slots, see the [slots documentation](https://multiui.org/docs/slots).
     */
    createSlot: <Slot extends keyof Slots>(props: {
        /**
         * Specifies the name of the slot to be created.
         * This identifier is used to reference and configure the slot within the component structure.
         */
        slot: Slot;
        /**
         * Arguments to passed when a variant is created.
         */
        styling_args: Slots[Slot];
    }) => Slot;
    /**
     * ## Use this function before passing classes to any element.
     * **In short:** It seperates internal classes from user passed classes with a symbol which is pre-defined by MultiUI.
     * ### ───────────────────────────
     * ### Example of what it returns:
     * ```ts
     * const myClasses = "internal hi";
     * const passedClasses = "external";
     * classNameSeperator((cn) => [cn(myClasses), cn(passedClasses)]) // -> "internal hi • external"
     * ```
     * ### ───────────────────────────
     * ### Example usage:
     * ```tsx
     * // The `class` on this div will be: "select-none • bg-blue-500".
     * <div className={classNameSeperator((cn) => [cn("bg-red-500 select-none"), cn("bg-blue-500")])}>
     *  Hello, World!
     * </div>
     * // Note: The `bg-blue-500` passed by the user will override the `bg-red-500` that was set internally.
     * ```
     * ### ───────────────────────────
     *
     * @returns The classes to be passed to the element.
     */
    classNameSeperator: typeof __seperateClasses;
}) => ReactNode) => import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<ComponentProps & HTMLAttributes<Element>> & import("react").RefAttributes<Element>> & {
    createVariant: CreateVariantFn<Slots, keyof Slots>;
};
export {};
