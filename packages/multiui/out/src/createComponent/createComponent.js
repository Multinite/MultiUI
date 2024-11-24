"use strict";
// import {
//   FC,
//   forwardRef,
//   useState,
//   type HTMLAttributes,
//   type ReactNode,
// } from "react";
// import { cn } from "../utils";
// // =========================== TYPES ==================================
// /**
//  * The Prettify helper is a utility type that takes an object type and makes the hover overlay more readable.
//  */
// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};
// // Pass the `Element` and it returns all the attributes for said element type, plus `ref` attributes.
// type GetElementAttributes<Element> = React.RefAttributes<Element> &
//   HTMLAttributes<Element>;
// // PURPOSE: The complete list of properties for a component.
// // Pass the `CustomProperties` (defined by the dev) and an Element Type, and we return
// // all the properties to form a valid component.
// // - attributes of element
// // - `CustomProperties` defined by the dev, but modified to be valid; Such as prefixing with `$`, and other modifications.
// type ComponentProperties<
//   CustomProperties extends Record<string, unknown>,
//   Element extends HTMLElement,
//   Slots extends {
//     [K in string]: HTMLElement;
//   },
// > = Prettify<
//   ConvertToValidProps<CustomProperties> &
//     OmitUnwantedElementAttributes<GetElementAttributes<Element>> &
//     AppendDefaultProperties<CustomProperties, Element, Slots>
// >;
// // A Type function which removes all the attributes that are provided by an element, but are not wanted.
// // This is because we provide custom attributes that overwrite the default behavour of it.
// type OmitUnwantedElementAttributes<Attributes extends {}> = Omit<
//   Attributes,
//   UnwantedAttributes
// >;
// // Create a list of all unwated attributes.
// // Made this a seperate type since both `ConvertToValidProps` & `OmitUnwantedElementAttributes` use it.
// type UnwantedAttributes = "children" | "className" | "slot";
// // A type function which allows you to pass `CustomProperties` and we will return
// // the same thing but with all keys prefixed with `$`.
// type ConvertToValidProps<CustomProperties extends Record<string, unknown>> =
//   Omit<
//     {
//       [K in keyof CustomProperties as K extends `$${string}`
//         ? K
//         : // @ts-expect-error - This works.
//           `$${K}`]: CustomProperties[K];
//     },
//     Prefix$onTuples<UnwantedAttributes>
//   >;
// // This Type function simply adds `$` to the start of all the tuples.
// // Eg: `hi | bye` becomes `$hi | $bye`
// type Prefix$onTuples<T extends string> = T extends `${infer U}`
//   ? `${`$${U}`}`
//   : T;
// // This will be passed along-side the hooks made by the dev during `createComponent`.
// // Then both this, and dev-made hooks will be avalible in `create<Name>` function to be utilized creating powerful components.
// type DefaultHooks = {
//   // Allow the dev to call it with a callback within and gain access to
//   // the classNames that were initially made by `createComponent`, as well as all the classNames provded as props to the component.
//   className: typeof getClassname;
// };
// // As the name suggests, this is an object containing all the properties that are also valid for the component and is of course developed by us.
// type AppendDefaultProperties<
//   CustomProperties extends Record<string, unknown>,
//   Element extends HTMLElement,
//   Slots extends {
//     [K in string]: HTMLElement;
//   },
// > = CustomProperties & {
//   /**
//    * ### ───────────────────────────
//    * ![Image of demo-code](https://multiui.org/assets/code/classname.png|width=569.6|height=68)
//    * ### ───────────────────────────
//    * ## Pick your poison: Assigning classes with better control.
//    * ### ㅤㅤ
//    * ### Function: More control over the button's classes.
//    * ```tsx
//    * <Button $className={({ classes, cn }) => cn(classes, "your TW classes")}>
//    * ㅤHello, World!
//    * </Button>
//    * ```
//    * ### ㅤㅤ
//    * # OR
//    * ### ㅤㅤ
//    *
//    * ### String: Default classes are prepended, followed by your classes.
//    * ```tsx
//    * <Button $className="your TW classes">
//    * ㅤHello, World!
//    * </Button>
//    * ```
//    * ### ───────────────────────────
//    * Note: If you use the default `className` prop, it will be overridden by this `$className` prop.
//    * @see {@link https://multiui.org/docs/custom-classes}
//    */
//   $className?: ClassNameFn;
//   /**
//    * # Do not use!
//    * You're completely fine to use the `className` prop, however, we recommend you use the MultiUI custom `$className` prop to have further granularity over the classes.
//    *
//    * Note: If you use both, the `$className` prop will take priority and override the `className` prop.
//    *
//    * @deprecated
//    */
//   className?: string;
//   /**
//    * # Do not use!
//    * MultiUI will automatically add a slot.
//    *
//    * @deprecated
//    */
//   slot?: string;
//   /**
//    * # Children
//    * Children works like normal, however if you pass a function, it will be treated as a custom component builder.
//    *
//    * Custom Component Builder:
//    * ```tsx
//    * <Button>
//    *   {({ Component, props, classNameSeperator }) => (
//    *     <Component {...props} className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} />
//    *   )}
//    * </Button>
//    * ```
//    *
//    * @see {@link https://multiui.org/docs/custom-components}
//    *
//    */
//   children?:
//     | ReactNode
//     | CustomComponentFn<
//         AppendDefaultProperties<CustomProperties, Element, Slots>,
//         Element,
//         Slots
//       >;
//   /**
//    * # Don't use.
//    * This is a prop made for the sake of DX, it makes it easier to see the seperation between custom properties that are defined with `$` and the normal properties.
//    * ### ───────────────────────────
//    * ![Image of demo](https://multiui.org/assets/code/underscore_property_seperator)
//    * ### ───────────────────────────
//    *
//    */
//   _______________________?: never;
// };
// // A Type function which returns a string with the first letter to be uppercase.
// type UppercaseFirstLetter<T extends string> =
//   T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
// // This is a function that is used as the children's component creator function.
// // EG, this function:
// // <Buttom>
// //   {({ Component, props, classNameSeperator }) => (
// //     <Component {...props} className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} />
// //   )}
// //</Buttom>
// type CustomComponentFn<
//   CustomProperties extends Record<string, unknown>,
//   Element extends HTMLElement,
//   Slots extends {
//     [K: string]: HTMLElement;
//   },
// > = (
//   args: {
//     props: Omit<
//       ComponentProperties<CustomProperties, Element, Slots>,
//       "children"
//     >;
//   } & {
//     [K in keyof Slots as K extends string
//       ? UppercaseFirstLetter<K>
//       : never]: FC<
//       ComponentProperties<CustomProperties, Slots[K], Slots> & {
//         children?: ReactNode;
//       }
//     >;
//   }
// ) => ReactNode;
// //================================ CODE ==================================
// export function createComponent<
//   CustomProperties extends Record<`$${string}`, unknown>,
//   Element extends HTMLElement,
//   Slots extends {
//     [K: string]: HTMLElement;
//   },
// >(args: {
//   name: string;
//   createComponnetFn: (
//     componentProps: Omit<
//       ComponentProperties<CustomProperties, Element, Slots>,
//       "children"
//     > & { children?: ReactNode },
//     args: {
//       createSlot: <
//         SlotName extends keyof Slots,
//         Component extends (
//           props: Omit<HTMLAttributes<Slots[SlotName]>, "children"> & {
//             children?: ReactNode;
//           },
//           variantsPropertiesType: any //any is intentional
//         ) => ReactNode,
//       >(
//         name: SlotName,
//         component: Component
//       ) => {
//         //@ts-expect-error - it works
//         [K in UppercaseFirstLetter<SlotName>]: ((
//           props: Parameters<Component>[0]
//         ) => ReturnType<Component>) & { name: SlotName };
//       } & {
//         //@ts-expect-error - it works
//         [K in `get${UppercaseFirstLetter<SlotName>}VariantClasses`]: (
//           props: Parameters<Component>[1]
//         ) => string;
//       };
//       assembleClassname: (default_classes: string) => string;
//     }
//   ) => ReactNode;
// }) {
//   //======================== createComponent Stage ==========================
//   let hooks: DefaultHooks = {
//     className: getClassname,
//   };
//   let slots = {};
//   function createSpecificComponent(
//     createFn: (
//       args: Prettify<
//         {
//           props: Prettify<
//             Omit<
//               ComponentProperties<CustomProperties, Element, Slots>,
//               "children"
//             > & { children: ReactNode }
//           >;
//         } & {
//           [K in keyof Slots as K extends string
//             ? UppercaseFirstLetter<K>
//             : never]: FC<
//             ComponentProperties<CustomProperties, Slots[K], Slots> & {
//               children?: ReactNode;
//             }
//           >;
//         }
//       >,
//       hooks: DefaultHooks
//     ) => ReactNode
//   ) {
//     // ========== Component Function Stage ===========
//     const ComponentFn = forwardRef<
//       Element,
//       Prettify<ComponentProperties<CustomProperties, Element, Slots>>
//     >((props, ref) => {
//       console.log(123, slots);
//       const Component = createFn(
//         {
//           props: { ...props, ref: ref },
//           ...slots,
//         },
//         hooks
//       );
//       return Component;
//     });
//     ComponentFn.displayName = `MultiUI.${args.name}`;
//     return ComponentFn;
//   }
//   // the lowest component in theory should be the one made in `createButton.tsx`
//   const LowestComponent = forwardRef<
//     Element,
//     Prettify<ComponentProperties<CustomProperties, Element, Slots>>
//   >((props, ref) => {
//     // this assembles the className based on all the className related info passed along the way.
//     function assembleClassname(default_classes: string) {
//       return props.$className
//         ? typeof props.$className === "function"
//           ? props.$className({ cn, classes: default_classes })
//           : cn(default_classes, props.$className)
//         : cn(default_classes, props.className);
//     }
//     if (typeof props.children === "function") {
//       //@ts-expect-error - it works
//       const Component = props.children({
//         props,
//         assembleClassname,
//         ...slots,
//       });
//       return Component;
//     } else {
//       function createSlot<
//         const ComponentName extends keyof Slots,
//         const Component extends (
//           props: HTMLAttributes<Slots[ComponentName]> & {
//             children?: ReactNode;
//           },
//           variantsPropertiesType: any
//         ) => ReactNode,
//       >(
//         name: ComponentName,
//         component: Component
//       ): {
//         //@ts-expect-error - it works
//         [K in UppercaseFirstLetter<ComponentName>]: ((
//           props: Parameters<Component>[0]
//         ) => ReturnType<Component>) & { name: ComponentName };
//       } & {
//         //@ts-expect-error - it works
//         [K in `get${UppercaseFirstLetter<ComponentName>}VariantClasses`]: (
//           props: Parameters<Component>[1]
//         ) => string;
//       } {
//         const cmp = (props) => component({ ...props, slot: name }, {});
//         cmp.name = `MultiUI.${args.name}.${name.toString()}`;
//         console.log(121222, cmp.name);
//         slots[name.toString()] = cmp;
//         //@ts-expect-error - This is a hack to make the type checker happy.
//         return {
//           [name]: cmp,
//           [`get${capitalize(name as string)}VariantClasses`]: () =>
//             "placeholder_class", //TODO: Fix
//         };
//       }
//       const Component = args.createComponnetFn(
//         {
//           ...props,
//           children: props.children,
//           ref: ref,
//         },
//         {
//           createSlot: createSlot,
//           assembleClassname,
//         }
//       );
//       return Component;
//     }
//   });
//   LowestComponent.displayName = `MultiUI.${args.name}.Lowest`;
//   return createSpecificComponent;
// }
// //======================== createButton Stage ==========================
// //================================ getClassname ==================================
// // this function is use in the `createFn` function to get the classes passed by props from the dev,
// // as well as the classes provided by default of the component.
// export function getClassname({
//   $className,
//   default_className,
// }: {
//   $className: ClassNameFn;
//   default_className: string;
// }): { className: string } {
//   if (typeof $className === "function") {
//     return { className: $className({ cn, classes: default_className }) };
//   } else {
//     return { className: cn(default_className, $className) };
//   }
// }
// // This type is used on the `className` prop to allow the dev to either pass a callback to it and do some magic,
// // or just pass a string, like the traditional way.
// type ClassNameFn =
//   | ((props: {
//       /**
//        * The default classes that intend to be passed to the button.
//        */
//       classes: string;
//       cn: typeof cn;
//     }) => string)
//   | string;
// //================================ utilities ==================================
// function capitalize<T extends string>(s: T): Capitalize<T> {
//   return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
// }
// type CapitalizeKeys<T> = {
//   [K in keyof T as Capitalize<string & K>]: T[K];
// };
// export type { CapitalizeKeys as CreateSlotsType };
// //============================================================================= TESTING API:
// const createButton = createComponent<
//   {
//     isDisabled?: boolean;
//   },
//   HTMLButtonElement,
//   {
//     base: HTMLButtonElement;
//     wrapper: HTMLDivElement;
//   }
// >({
//   name: "Button",
//   createComponnetFn(props, helpers) {
//     const { $isDisabled = false } = props;
//     const [isDisabled, setIsDisabled] = useState($isDisabled);
//     const Component = <button disabled={isDisabled} {...props}></button>;
//     const base = helpers.createSlot("base", (props, variantTypes: number) => {
//       return <div>{props.children}</div>;
//     });
//     base.getBaseVariantClasses();
//     return {
//       Component,
//       hooks: {
//         setDisabled: (isDisabled?: boolean) => {
//           setIsDisabled(isDisabled ?? true);
//         },
//       },
//     };
//   },
// });
// const Button = createButton(({ props, Base, Wrapper }, { className }) => {
//   const comp = <Base {...props} />;
//   return comp;
// });
// <Button $isDisabled>
//   {({ props, Component }, { setDisabled }) => {
//     setDisabled(true);
//     return <Component {...props}>Hello</Component>;
//   }}
// </Button>;
//# sourceMappingURL=createComponent.js.map