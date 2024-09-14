"use client";
import { forwardRef } from "react";
import { __seperateClasses } from "../utils/cn.js";
import {
  CreateComponentCreateFnprops,
  CreateComponentFn,
  CreateComponentProps,
  CreateComponentReturn,
} from "./createComponentTypes.js";

export const createComponent: CreateComponentFn = <
  ComponentProps,
  Element extends HTMLElement = HTMLElement,
>({
  componentName,
  create,
}: CreateComponentProps<ComponentProps, Element>): CreateComponentReturn<
  ComponentProps,
  Element
> => {
  const Component = forwardRef<
    Element,
    CreateComponentCreateFnprops<ComponentProps, Element>
  >((props, ref) => {
    let Component = create({
      props: { ...props, ref },
      createSlot: createSlot,
      classNameSeperator: __seperateClasses,
    });

    return Component;
  });
  Component.displayName = `MultiUI.${componentName}`;

  return Object.assign(Component, {
    createVariant: () => {},
  });
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
