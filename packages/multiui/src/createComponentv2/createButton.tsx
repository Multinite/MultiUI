import {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type { Prettify } from "./types";
import { cn } from "../utils";

const Button = createButton_(({ props, slots, helpers }) => {
  return (
    <slots.wrapper>
      <slots.base {...props} ref={props.ref}></slots.base>
    </slots.wrapper>
  );
});
<Button>Hello</Button>;

// =====================================
// Below is what code minimum is required to make the above Button component work.
// =====================================
type Props = Prettify<
  HTMLAttributes<HTMLButtonElement> & {
    ref: ForwardedRef<HTMLButtonElement>;
  }
>;

type CreateButtonCallback = (
  args: Prettify<{
    props: Props;
    slots: {
      base: (props: any) => ReactNode;
      wrapper: (props: any) => ReactNode;
    };
    helpers: { className: string };
  }>
) => ReactNode;

function createButton_(cb: CreateButtonCallback) {
  const Component = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    // parse out className
    // parse out children
    return cb({
      slots: {
        base: () => null,
        wrapper: () => null,
      },
      props: Object.assign(props, { ref }),
      helpers: { className: "hello" },
    });
  });

  Component.displayName = "Button";

  return Component;
}

// =====================================
// Below is what code I desire to make the DX of `createButton` function good, to then create that Button component.
// =====================================

export const buttonSlots = createSlots({
  base: (props: SlotElement<"button">) => (
    <button
      {...props}
      className={cn("rounded-medium", props.className)}
      slot={props.slot}
    />
  ),
  wrapper: (props: SlotElement<"div">) => (
    <div
      {...props}
      className={cn("text-3xl", props.className)}
      slot={props.slot}
    />
  ),
});

const myHook = buttonSlots.createHook((slots) => {
  slots.base;

  return { a: 1, b: 2, c: 3 };
});

const myVariant = buttonSlots.createVariant((slots) => {
  return {
    base: "HI",
  };
});

// ===================================================================================================

type CreateHook<
  Slots extends Record<
    string,
    (
      props: Prettify<HTMLAttributes<HTMLElement> & { slot: string }>
    ) => JSX.Element
  >,
> = <HookCB extends (slots: Slots) => unknown>(cb: HookCB) => HookCB;



type CreateVariant<
  Slots extends Record<
    string,
    (
      props: Prettify<HTMLAttributes<HTMLElement> & { slot: string }>
    ) => JSX.Element
  >,
> = <VariantCB extends (slots: Slots) => Partial<Record<keyof Slots, string>>>(
  cb: VariantCB
) => VariantCB;




function createSlots<
  T extends Record<
    string,
    (
      props: Prettify<HTMLAttributes<HTMLElement> & { slot: string }>
    ) => JSX.Element
  >,
>(
  slots: T
): Prettify<
  T & {
    createHook: CreateHook<T>;
    createVariant: CreateVariant<T>;
  }
> {
  const createHook: CreateHook<T> = (cb) => {
    return cb;
  };

  const createVariant: CreateVariant<T> = (cb) => {
    return cb;
  };

  return Object.assign(slots, { createHook, createVariant });
}



type SlotElement<Element extends keyof JSX.IntrinsicElements> = Prettify<
  JSX.IntrinsicElements[Element] & { slot: string }
>;
