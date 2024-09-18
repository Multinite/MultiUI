"use strict";
// import type {
//   FC,
//   ForwardedRef,
//   ForwardRefExoticComponent,
//   HTMLAttributes,
//   ReactNode,
//   RefAttributes,
// } from "react";
// import type { cn as cn_, __seperateClasses } from "../utils/cn.js";
// import { createSlot } from "./createComponent.js";
// /**
//  * Represents a chain of variants for component slots.
//  */
// export type VariantChain<Slots extends Record<string, Record<string, any>>> = {
//   createChainedVariant: CreateVariantFromChainedVariant<Slots>;
// };
// /**
//  * Type for creating a chained variant from an existing variant.
//  */
// export type CreateVariantFromChainedVariant<
//   Slots extends Record<string, Record<string, any>>,
// > = (args: {
//   name: string;
//   slots: Record<
//     keyof Slots,
//     (
//       props: Slots[keyof Slots],
//       cn: typeof cn_,
//       chainedVariantClasses: string
//     ) => string
//   >;
// }) => VariantChain<Slots>;
// /**
//  * Type for creating a new variant function.
//  */
// export type CreateVariantFn<Slots extends Record<string, Record<string, any>>> =
//   (args: {
//     name: string;
//     slots: Record<
//       keyof Slots,
//       (props: Slots[keyof Slots], cn: typeof cn_) => string
//     >;
//   }) => VariantChain<Slots>;
// /**
//  * # Creates a new MultiUI component
//  * Allows you to create a MultiUI component with customizable slots, variants and other features.
//  *
//  * ```tsx
//  * // Make sure to add some JSDoc to your component.
//  * const createMySpecialComponent = createComponent("component_name", ({ props, createSlot, classNameSeperator }) => {
//  *   return (
//  *     <div className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} {...props}>
//  *       {props.children}
//  *     </div>
//  *   );
//  * });
//  *
//  * export default Component;
//  * ```
//  *
//  * @template ComponentProps - The props for the component.
//  * @template Slots
//  * ### ───────────────────────────
//  * # Slots
//  * Define the component's slots using an object structure. Each key represents a slot name,
//  * and its corresponding value is an object containing all the properties that can be
//  * passed to the variants when creating a variant for that slot.
//  *
//  * ```tsx
//  * const createButton = createComponent<MyComponentProps, HTMLButtonElement>(my_component_name, ({ createSlot }) => {
//  *
//  *   const {base, getBaseClasses} = createSlot<"base", {}>("base");
//  *   // example: <Button slot={base} className={getBaseClasses()}>Foo</Button>
//  * ㅤ
//  *   // ... rest of the component
//  * })
//  * ```
//  * ### ─────────────────────────────
//  * @template Element - The HTML element type for the component.
//  * @param {string} componentName - The name of the component.
//  * @param {Function} create - Function to create the component structure.
//  * @returns The component creator function.
//  */
// export type CreateComponentFn = <
//   const ComponentProps extends Record<string, unknown> = {
//     sup: 1;
//     yo: "hello";
//   },
//   const Element extends HTMLElement = HTMLElement,
// >(
//   args: CreateComponentProps<ValidComponentProps<ComponentProps>, Element>
// ) => CreateComponentReturn<ValidComponentProps<ComponentProps>, Element>;
// export type Component<
//   ComponentProps extends Record<string, unknown>,
//   Element,
// > = ForwardRefExoticComponent<
//   React.PropsWithoutRef<
//     CreateComponentCreateFnprops<ValidComponentProps<ComponentProps>, Element>
//   > &
//     React.RefAttributes<Element>
// >;
// export type CreateComponentReturn<
//   ComponentProps extends Record<string, unknown>,
//   Element,
// > = (
//   cb: (args: {
//     props: {
//       Component: Component<ValidComponentProps<ComponentProps>, Element>;
//     } & CreateComponentCreateFnprops<
//       ValidComponentProps<ComponentProps>,
//       Element
//     >;
//     helperFunctions: {};
//   }) => Component<ValidComponentProps<ComponentProps>, Element>
// ) => Component<ValidComponentProps<ComponentProps>, Element> & {
//   //TODO: fix v
//   createVariant: () => void;
// };
// export type CreateComponentReturnChildren<
//   ComponentProps extends Record<string, unknown>,
//   Element,
// > = {
//   children?:
//     | ReactNode
//     | ((
//         cb: (props: {
//           props: CreateComponentCreateFnprops<
//             ValidComponentProps<ComponentProps>,
//             Element
//           >;
//           helperFunctions: {};
//         }) => ReactNode
//       ) => ForwardRefExoticComponent<
//         ValidComponentProps<ComponentProps> & {
//           ref: ForwardedRef<Element>;
//         } & HTMLAttributes<Element>
//       >);
// };
// export type ValidComponentProps<
//   ComponentProps extends Record<string, unknown>,
// > = {
//   [K in keyof ComponentProps as K extends `$${string}`
//     ? K
//     : // @ts-expect-error - This works.
//       `$${K}`]: ComponentProps[K];
// };
// export type CreateComponentCreateFnprops<
//   ComponentProps extends Record<string, unknown>,
//   Element,
// > = ValidComponentProps<ComponentProps> &
//   React.PropsWithoutRef<
//     ValidComponentProps<ComponentProps> &
//       CreateComponentReturnChildren<
//         ValidComponentProps<ComponentProps>,
//         Element
//       >
//   > &
//   React.RefAttributes<Element> &
//   HTMLAttributes<Element>;
// export type CreateComponentProps<
//   ComponentProps extends Record<string, unknown>,
//   Element,
// > = {
//   /**
//    * The name of the component.
//    */
//   componentName: string;
//   /**
//    * The function to create the component structure.
//    * ### ───────────────────────────
//    * # Component Structure
//    * 1. The component structure is created by passing a function to the createComponent function.
//    * 2. This function is called with the `props` and the `createSlot` function, and others.
//    * 3. The `createSlot` function is used to create a slot for the component to later be styled with variants.
//    * 4. The component structure is then returned by the function.
//    * ### ───────────────────────────
//    *
//    */
//   create: (props: {
//     /**
//      * The props passed to the component.
//      */
//     props: CreateComponentCreateFnprops<
//       ValidComponentProps<ComponentProps>,
//       Element
//     >;
//     /**
//      * Slots define the structural components of a UI element.
//      * ### ㅤㅤ
//      * For example, a popout component might have the following slots:
//      * - `base`: The wrapper for the entire popout (always present)
//      * - `content`: The main content area of the popout
//      * - `trigger`: The element that activates the popout
//      *
//      * Each slot can be styled and configured independently, allowing for
//      * flexible and modular component design.
//      * ### ㅤㅤ
//      * @example
//      * ```tsx
//      * createSlot({
//      *   // The slot is the name of the slot to be created.
//      *   slot: "the_name_of_the_slot",
//      *   // The styling_args are the arguments that are passed to the createVariant function,
//      *   // this allows for the creation of the variant to be dynamic.
//      *   styling_args: {
//      *     some_variable,
//      *     some_other_variable,
//      *     even_a_function,
//      *     ...
//      *   },
//      * });
//      * ```
//      * ### ㅤㅤ
//      * ### Use this function to create a slot for an element.
//      * ![Simple example usage of createSlot](https://multiui.org/assets/code/slot_simple.png|width=500)
//      * ### ㅤㅤ
//      * ### ㅤㅤ
//      * ### Advance example:
//      * ![Example usage of createSlot](https://multiui.org/assets/code/slot.png|width=500)
//      * ### ㅤㅤ
//      * For more information on slots, see the [slots documentation](https://multiui.org/docs/slots).
//      */
//     createSlot: typeof createSlot;
//     /**
//      * ## Use this function before passing classes to any element.
//      * **In short:** It seperates internal classes from user passed classes with a symbol which is pre-defined by MultiUI.
//      * ### ───────────────────────────
//      * ### Example of what it returns:
//      * ```ts
//      * const myClasses = "internal hi";
//      * const passedClasses = "external";
//      * classNameSeperator((cn) => [cn(myClasses), cn(passedClasses)]) // -> "internal hi • external"
//      * ```
//      * ### ───────────────────────────
//      * ### Example usage:
//      * ```tsx
//      * // The `class` on this div will be: "select-none • bg-blue-500".
//      * <div className={classNameSeperator((cn) => [cn("bg-red-500 select-none"), cn("bg-blue-500")])}>
//      *  Hello, World!
//      * </div>
//      * // Note: The `bg-blue-500` passed by the user will override the `bg-red-500` that was set internally.
//      * ```
//      * ### ───────────────────────────
//      *
//      * @returns The classes to be passed to the element.
//      */
//     classNameSeperator: typeof __seperateClasses;
//   }) => ReactNode;
// };
//# sourceMappingURL=createComponentTypes.js.map