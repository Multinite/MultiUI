"use strict";
// import {
//   type ComponentProps,
//   createElement,
//   isValidElement,
//   ReactNode,
//   cloneElement,
//   forwardRef,
//   ReactElement,
// } from "react";
// import type { Prettify } from "./types";
// import { Button } from "react-aria-components";
// type RequiredKeys<T> = {
//   [K in keyof T]: T extends Record<K, T[K]>
//     ? T[K] extends undefined
//       ? never
//       : K
//     : never;
// }[keyof T];
// type HasRequiredKeys<T> = RequiredKeys<T> extends never ? false : true;
// type CustomComponent = (props?: any) => ReactElement | null;
// type SlotCreator = <
//   ElementType extends CustomComponent | keyof JSX.IntrinsicElements,
// >({
//   as,
//   props,
//   children,
// }: {
//   as: ElementType;
//   children?:
//     | JSX.Element
//     | JSX.Element[]
//     | (ElementType extends keyof JSX.IntrinsicElements
//         ? ComponentProps<ElementType> extends { children?: ReactNode }
//           ? ReactNode
//           : never
//         : //@ts-ignore
//           Parameters<ElementType>[0] extends { children?: ReactNode }
//           ? ReactNode
//           : never);
// } & (ElementType extends (args: any) => any
//   ? HasRequiredKeys<Parameters<ElementType>[0]> extends true
//     ? { props: Prettify<Omit<Parameters<ElementType>[0], "children">> }
//     : { props?: Prettify<Omit<Parameters<ElementType>[0], "children">> }
//   : {
//       props?: Omit<ComponentProps<ElementType>, "children">;
//     })) => JSX.Element;
// function createComponent<Slots extends string[]>(
//   cb: (
//     Slot: Record<Slots[number], SlotCreator>,
//     ref: React.ForwardedRef<any>
//   ) => JSX.Element
// ) {
//   let slots: string[] = [];
//   const SlotProxy = new Proxy({} as Record<Slots[number], SlotCreator>, {
//     get(_target, slotName: Slots[number], _receiver) {
//       const Slot: SlotCreator = ({ as, props = {}, children }) => {
//         slots.push(slotName);
//         if (typeof as === "function" && !isValidElement(as)) {
//           let componentOutput: JSX.Element | null = null;
//           try {
//             componentOutput = as(props);
//             return cloneElement(componentOutput, {
//               ...componentOutput.props,
//               slot: slotName,
//               children,
//             });
//           } catch (error) {
//             throw new Error(
//               `An error occured while calling <${as.name} /> for slot "${slotName}" with the props: ` +
//                 JSON.stringify(props, null, 2)
//             );
//           }
//         } else {
//           const element = createElement(
//             as,
//             Object.assign(props, { slot: slotName }),
//             children
//           );
//           return element;
//         }
//       };
//       return Slot;
//     },
//   });
//   const Component = forwardRef<any, {}>((props, ref) => {
//     const tree = cb(SlotProxy, ref);
//     Component.displayName = slots[0];
//     console.log(`assigning:`, slots);
//     return tree;
//   });
//   const others = {
//     slots: slots as Slots,
//     /**
//      * A handy type-safe helper function to create variants!
//      */
//     createVariant: (variant: Partial<Record<Slots[number], string>>) => {
//       return variant;
//     },
//   };
//   return Object.assign(Component, others);
// }
// const ButtonComp = createComponent<["Base", "Button", "Label", "Test"]>(
//   (Slot, ref) => (
//     <Slot.Button as="div">
//       <Slot.Label as="h1">I'm a button Label</Slot.Label>
//       <Slot.Base as={Button} props={{ className: "hello", ref: ref }} />
//       <Slot.Test as={MyCustomComponent} props={{ hello: "World" }} />
//     </Slot.Button>
//   )
// );
// console.log(<ButtonComp />);
// const defaultVariant = ButtonComp.createVariant({
//   Base: "some classes for Base",
// });
// function MyCustomComponent(args: { hello: "World" }) {
//   return <h1>Hello {args.hello}</h1>;
// }
//# sourceMappingURL=test.js.map