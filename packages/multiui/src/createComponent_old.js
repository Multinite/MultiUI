"use strict";
// "use client";
// import { forwardRef, ReactNode, useState } from "react";
// import { __seperateClasses } from "../utils/cn.js";
// import {
//   Component,
//   CreateComponentCreateFnprops,
//   CreateComponentFn,
//   CreateComponentProps,
//   CreateComponentReturn,
//   ValidComponentProps,
// } from "./createComponentTypes.js";
// //? createComponent function
// export const createComponent: CreateComponentFn = <
//   ComponentProps extends Record<string, unknown>,
//   const Element extends HTMLElement = HTMLElement,
// >({
//   componentName,
//   create,
// }: CreateComponentProps<ComponentProps, Element>): CreateComponentReturn<
//   ComponentProps,
//   Element
// > => {
//   // create the component
//   const Component = forwardRef<
//     Element,
//     CreateComponentCreateFnprops<ComponentProps, Element>
//   >((props, ref) => {
//     props[""]
//     // get the Component created by the dev from the createComponent fn.
//     let Component = create({
//       props: { ...props, ref },
//       createSlot: createSlot,
//       classNameSeperator: __seperateClasses,
//     });
//     // we essentially wrap their component with our own to ensure it's good 👍.
//     return Component;
//   });
//   Component.displayName = `MultiUI.${componentName}`;
//   //? createButton function
//   const createSpecificComponentFn: CreateComponentReturn<
//     ComponentProps, // we convert this to a ValidComponentProp in types already.
//     Element
//   > = (cb) => {
//     // the most latest component made by us, which is the one that's returned.
//     const New_Component: Component<
//       ValidComponentProps<ComponentProps>,
//       Element
//     > = forwardRef((props, ref) => {
//       const DevDefinedComponent = cb({
//         helperFunctions: {},
//         // @ts-expect-error - we're passing the correct props, both the Component itself, and all the other props.
//         props: {
//           Component,
//           ...props,
//           ...ref,
//         },
//       });
//       return DevDefinedComponent({ ...props, ...ref });
//     });
//     <New_Component  />
//     //TODO: Fix vv
//     return Object.assign(New_Component, { createVariant: () => {} });
//   };
//   return createSpecificComponentFn;
// };
// type UppercaseFirstLetter<T extends string> =
//   T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
// export function createSlot<
//   SlotName extends string,
//   SlotProps extends Record<string, any>,
// >(
//   slotName: SlotName
// ): {
//   [K in SlotName]: SlotName;
// } & {
//   [K in `get${UppercaseFirstLetter<SlotName>}Classes`]: (
//     props: SlotProps
//   ) => string;
// } {
//   return {
//     [slotName]: slotName,
//     [`get${capitalize(slotName)}Classes`]: 1,
//   } as any;
// }
// function capitalize<T extends string>(s: T): Capitalize<T> {
//   return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
// }
// // potentially useful function to use in the future.
// // converts an object to have `$` in front of all keys.
// function convertPropsToValidProps<
//   const ComponentProps extends Record<string, unknown>,
// >(obj: ComponentProps): ValidComponentProps<ComponentProps> {
//   return Object.fromEntries(
//     Object.entries(obj).map(([k, v]) => [k.startsWith("$") ? k : `$${k}`, v])
//   ) as ValidComponentProps<ComponentProps>;
// }
// //============================================================================= TESTING API:
// const createButton = createComponent<{ hi: boolean }, HTMLButtonElement>({
//   componentName: "Button",
//   create: ({ props, createSlot, classNameSeperator }) => {
//     const [isDisabled, setIsDisabled] = useState(false);
//     const { Base, getBaseClasses } = createSlot<
//       "Base",
//       { $isDisabled: boolean }
//     >("Base");
//     return (
//       <button
//         {...props}
//         slot={Base}
//         className={classNameSeperator((cn) => [
//           cn("bg-red-500"),
//           cn(getBaseClasses({ $isDisabled: isDisabled })),
//         ])}
//       ></button>
//     );
//   },
// });
// const Button = createButton(({ helperFunctions, props }) => {
//   const { Component } = props;
//   return Component;
// });
// // ============================================================================== NEW API in simple form:
//# sourceMappingURL=createComponent_old.js.map