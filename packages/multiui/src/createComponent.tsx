"use client";
import {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type ForwardedRef,
  ForwardRefExoticComponent,
} from "react";
import { __seperateClasses } from "../utils/cn.js";
import { CreateComponentFn, CreateVariantFn } from "./createComponentTypes.js";

export const createComponent: CreateComponentFn = <
  ComponentProps,
  Element extends HTMLElement = HTMLElement,
>({
  componentName,
  create,
}: {
  componentName: string;
  create: (props: {
    props: ComponentProps & { ref: ForwardedRef<Element> };
    createSlot: typeof createSlot;
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
  createVariant: CreateVariantFn<{}>;
}) => {
  // let variants: { slot: keyof Slots; create: (...props: any) => sring }[] = [];

  let Component = forwardRef<Element, ComponentProps>((props, ref) => {
    return create({
      props: { ...props, ref },
      createSlot: createSlot,
      classNameSeperator: __seperateClasses,
    });
  });

  Component.displayName = `MultiUI.${componentName}`;

  type R = ReturnType<typeof createComponent<ComponentProps, Element>>;
  const createComponentCb: R = (cb) => {
    const createVariant = () => {};

    const Component = forwardRef<
      Element, // was Element
      ComponentProps & HTMLAttributes<Element>
    >((props, ref) => {
      return cb({ props: { ...props, ref }, helperFunctions: {} });
    });

    return Object.assign(Component, {
      createVariant,
    }) as any;
  };

  return createComponentCb;
};

type UppercaseFirstLetter<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;


export function createSlot<
  SlotName extends string,
  SlotProps extends Record<string, any>,
>(
  slotName: SlotName
): {
  [K in SlotName]: SlotName;
} & {
  [K in `get${UppercaseFirstLetter<SlotName>}Classes`]: (
    props: SlotProps
  ) => string;
} {
  return {
    [slotName]: slotName,
    [`get${capitalize(slotName)}Classes`]: 1,
  } as any;
}

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}
