"use client";
import {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type ForwardedRef,
  ForwardRefExoticComponent,
} from "react";
import { __seperateClasses } from "../utils/cn.js";
import {
  CreateComponentFn,
  CreateVariantFn,
  VariantChain,
} from "./createComponentTypes.js";

export const createComponent: CreateComponentFn = <
  ComponentProps,
  Element extends HTMLElement = HTMLElement,
  SlotProps extends Record<string, any> = Record<string, any>,
>({
  componentName,
  create,
}: {
  componentName: string;
  slots: <SlotProps, Slots extends string[]>(slots: Slots) => Slots;
  create: (props: {
    props: ComponentProps & { ref: ForwardedRef<Element> };
    createSlot: <Slot extends keyof SlotProps>(props: {
      slot: Slot;
      styling_args: SlotProps[Slot];
    }) => Slot;
    classNameSeperator: typeof __seperateClasses;
  }) => ReactNode;
}): ((
  cb: (props: {
    props: ComponentProps & {
      ref: ForwardedRef<Element>;
    } & HTMLAttributes<Element>;
    helperFunctions: {};
  }) => ReactNode
) => ForwardRefExoticComponent<
  ComponentProps & { ref: ForwardedRef<Element> } & HTMLAttributes<Element>
> & {
  createVariant: CreateVariantFn<Slots, keyof Slots>;
}) => {
  let variants: { slot: keyof Slots; create: (...props: any) => string }[] = [];

  let Component = forwardRef<Element, ComponentProps>((props, ref) => {
    return create({
      props: { ...props, ref },
      createSlot: (props) => {
        const slot = props.slot;
        const styling_args = props.styling_args;
        // variants.push({ slot, create: () => styling_args });
        return slot;
      },
      classNameSeperator: __seperateClasses,
    });
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
  const createVariant: CreateVariantFn<Slots, keyof Slots> = ({
    name,
    create,
  }) => {
    // const variant = variants.find((x) => x.slot === slot);
    // if (variant) {
    //   variant.create();
    // } else {
    //   variants.push({ slot: slot, create: create });
    // }

    // const createChainedVariant: CreateVariantFromChainedVariant<
    //   Slots,
    //   keyof Slots
    // > = ({ name, create: create2 }) =>
    //   createVariant({
    //     slot,
    //     name,
    //     create: (props, cn) => create2(props, create(props, cn), cn),
    //   });
    // return {
    //   createChainedVariant: createChainedVariant,
    // } as never as VariantChain<Slots>;
    return {} as VariantChain<Slots>;
  };

  const createComponentCb = (
    cb: (props: {
      props: ComponentProps & {
        ref: ForwardedRef<Element>;
      } & HTMLAttributes<Element>;
      helperFunctions: {};
    }) => ReactNode
  ): ForwardRefExoticComponent<
    ComponentProps & { ref: ForwardedRef<Element> } & HTMLAttributes<Element>
  > & {
    createVariant: CreateVariantFn<Slots, keyof Slots>;
  } => {
    // cb({
    //   props: {} as ComponentProps & {
    //     ref: ForwardedRef<Element>;
    //   } & HTMLAttributes<Element>,
    //   helperFunctions: {},
    // });

    const Component = forwardRef<
      Element,
      ComponentProps & HTMLAttributes<Element>
    >((props, ref) => {
      return cb({ props: { ...props, ref }, helperFunctions: {} });
    });

    return Object.assign(Component, {
      createVariant,
    }) as ForwardRefExoticComponent<
      ComponentProps & { ref: ForwardedRef<Element> } & HTMLAttributes<Element>
    > & {
      createVariant: CreateVariantFn<Slots, keyof Slots>;
    };
  };

  return createComponentCb;
};

// function createSlots<VariantProps2>(
//   cb: (props: {
//     t: <T>(s: TemplateStringsArray) => T;
//     slot: <VariantProps>(args: {
//       name: string;
//       variant_props: VariantProps;
//     }) => { name: string; variant_props: VariantProps };
//   }) => { name: string; variant_props: VariantProps2 }[]
// ) {
//   function t<T>(s: TemplateStringsArray): T {
//     return {} as T;
//   }
//   function slot<VariantProps>(args: {
//     name: string;
//     variant_props: VariantProps;
//   }) {
//     return args;
//   }

//   const slots = cb({ t, slot });

//   return {
//     slots: slots.map((x) => x.name),
//     createVariants: () => {},
//   };
// }
// //{ slots, createVariants }

// const x = createSlots(
//   ({ t, slot }) =>
//     [
//       slot({
//         name: "base",
//         variant_props: t<{
//           isLoading: boolean;
//           hello: "world";
//         }>``,
//       }),
//       slot({
//         name: "wrapper",
//         variant_props: t<{
//           isLoading: boolean;
//           isDisabled: boolean;
//         }>``,
//       }),
//     ] as const
// );

// function createSlots(){

// }

// const {createVariant, } = createSlots();

createComponent({
  componentName: "button",
  create({ classNameSeperator, createSlot, props }) {
    const {  } = createSlot<{
      isLoading: boolean;
      isDisabled: boolean;
    }>("base2");

    return <div slot={base}></div>;
  },
});
