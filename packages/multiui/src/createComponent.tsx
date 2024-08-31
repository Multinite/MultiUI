"use client";
import {
  useMemo,
  forwardRef,
  type FC,
  type ReactNode,
  type HTMLAttributes,
  type ForwardedRef,
} from "react";
import { __cn_separator, cn as cn_, cn_separator } from "../utils/cn.js";

/**
 * Represents a chain of variants for component slots.
 */
type VariantChain<Slots extends Record<string, Record<string, any>>> = {
  createChainedVariant: CreateVariantFromChainedVariant<Slots, keyof Slots>;
};

/**
 * Type for creating a chained variant from an existing variant.
 */
type CreateVariantFromChainedVariant<
  Slots extends Record<string, Record<string, any>>,
  Slot extends keyof Slots,
> = (args: {
  name: string;
  create: (
    props: Slots[Slot],
    chainedVariantClasses: string,
    cn: typeof cn_
  ) => string;
}) => VariantChain<Slots>;

/**
 * Type for creating a new variant function.
 */
type CreateVariantFn<
  Slots extends Record<string, Record<string, any>>,
  Slot extends keyof Slots,
> = (args: {
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
 * @template Slots - The slots available for the component.
 * @template Element - The HTML element type for the component.
 * @param {string} componentName - The name of the component.
 * @param {Function} create - Function to create the component structure.
 * @returns The created Component.
 */
export const createComponent = <
  ComponentProps,
  Slots extends Record<string, Record<string, any>>,
  Element extends HTMLElement = HTMLElement,
>(
  /**
   * The name of the component.
   */
  componentName: string,
  /**
   * The function to create the component structure.
   */
  create: (props: {
    props: ComponentProps & {
      ref: ForwardedRef<Element>;
    };
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
    classNameSeperator: typeof __cn_separator;
  }) => ReactNode
) => {
  let variants: { slot: keyof Slots; create: (...props: any) => string }[] = [];

  /**
   * The main component created by createComponent.
   */
  let Component = forwardRef<Element, ComponentProps & HTMLAttributes<Element>>(
    (props, ref) => {
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
    }
  );
  Component.displayName = `MultiUI.${componentName}`;

  /**
   * Creates a new variant for a specific slot in the component.
   * @param {Object} params - The parameters for creating a variant.
   * @param {keyof Slots} params.slot - The slot to create the variant for.
   * @param {string} params.name - The name of the variant.
   * @param {Function} params.create - Function to create the variant's classes.
   * @returns {VariantChain<Slots>} A chain object for creating additional variants.
   */
  const createVariant: CreateVariantFn<Slots, keyof Slots> = ({
    slot,
    name,
    create,
  }) => {
    const variant = variants.find((x) => x.slot === slot);
    if (variant) {
      variant.create();
    } else {
      variants.push({ slot: slot, create: create });
    }

    const createChainedVariant: CreateVariantFromChainedVariant<
      Slots,
      keyof Slots
    > = ({ name, create: create2 }) =>
      createVariant({
        slot,
        name,
        create: (props, cn) => create2(props, create(props, cn), cn),
      });
    return {
      createChainedVariant: createChainedVariant,
    } as never as VariantChain<Slots>;
  };

  return Object.assign(Component, {
    createVariant,
  });
};
