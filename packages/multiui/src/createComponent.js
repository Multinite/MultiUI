"use client";
import { forwardRef, } from "react";
import { __cn_separator } from "../utils/cn.js";
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
export const createComponent = (
/**
 * The name of the component.
 */
componentName, 
/**
 * The function to create the component structure.
 * ### ───────────────────────────
 * # Component Structure
 * 1. The component structure is created by passing a function to the createComponent function.
 * 2. This function is called with the `props` and the `createSlot` function, and others.
 * 3. The `createSlot` function is used to create a slot for the component to later be styled with variants.
 * 4. The component structure is then returned by the function.
 * ### ───────────────────────────
 *
 */
create) => {
    let variants = [];
    /**
     * The main component created by createComponent.
     */
    let Component = forwardRef((props, ref) => {
        const Component_ = create({
            props: {
                ref,
                ...props,
            },
            createSlot: function ({ slot, styling_args }) {
                return slot;
            },
            classNameSeperator: __cn_separator,
        });
        Component = Object.assign(Component, {
            variants: variants,
        });
        return Component_;
    });
    Component.displayName = `MultiUI.${componentName}`;
    /**
     * Creates a new variant for a specific slot in the component.
     * @param {Object} params - The parameters for creating a variant.
     * @param {keyof Slots} params.slot - The slot to create the variant for.
     * @param {string} params.name - The name of the variant.
     * @param {Function} params.create - Function to create the variant's classes.
     * @returns {VariantChain<Slots>} A chain object for creating additional variants.
     */
    const createVariant = ({ slot, name, create, }) => {
        const variant = variants.find((x) => x.slot === slot);
        if (variant) {
            variant.create();
        }
        else {
            variants.push({ slot: slot, create: create });
        }
        const createChainedVariant = ({ name, create: create2 }) => createVariant({
            slot,
            name,
            create: (props, cn) => create2(props, create(props, cn), cn),
        });
        return {
            createChainedVariant: createChainedVariant,
        };
    };
    return Object.assign(Component, {
        createVariant,
    });
};
//# sourceMappingURL=createComponent.js.map