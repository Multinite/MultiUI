//@ts-nocheck

import {
  cloneElement,
  type ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  type HTMLAttributes,
  ReactElement,
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
    <button {...props} className={cn("rounded-medium", props.className)} />
  ),
  wrapper: (props: SlotElement<"div">) => (
    <div {...props} className={cn("text-3xl", props.className)} />
  ),
  hey: (props) => <h1 {...props}>sup</h1>,
});
export const buttonSlots2 = createSlots2<{
  base: HTMLButtonElement;
  // wrapper: HTMLDivElement;
  // hey: HTMLHeadingElement;
}>({
  base: <button />,
  // wrapper: <div />,
  // hey: <h1 />,
});

<buttonSlots2.base className="hello world" __Element="base">
  hi
</buttonSlots2.base>;
{
  /* <buttonSlots2.wrapper className="hello world">hi</buttonSlots2.wrapper>; */
}

const myHook = buttonSlots.createHook(() => {
  return { a: 1, b: 2, c: 3 };
});
myHook();

// const myVariant = buttonSlots.createVariant<{ isDisabled: boolean }>(
//   (slots, args) => {
//     args.isDisabled;
//     return {
//       base: "HI",
//     };
//   }
// );

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
> = <Args, ReturnType extends Partial<Record<keyof Slots, string>>>(
  cb: (slots: Slots, args: Args) => ReturnType
) => (args: Args) => ReturnType;

function createSlots<
  Slots extends Record<
    string,
    (
      props: Prettify<HTMLAttributes<HTMLElement> & { slot: string }>
    ) => JSX.Element
  >,
>(slots: Slots) {
  function createHook<Res>(cb: () => Res): () => Res {
    return cb;
  }

  const createVariant: CreateVariant<Slots> = (cb) => {
    return (args) => {
      return cb(slots, args);
    };
  };

  return Object.assign(slots, { createHook, createVariant });
}

type SlotElement<Element extends keyof JSX.IntrinsicElements> = Prettify<
  JSX.IntrinsicElements[Element] & { slot: string }
>;

type SlotComponents<Slots extends Record<string, HTMLElement>> = {
  [SlotName in keyof Slots]: ForwardRefExoticComponent<
    Prettify<
      HTMLAttributes<Slots[SlotName]> &
        React.RefAttributes<Slots[SlotName]> & { __Element?: SlotName }
    >
  >;
};

function createSlots2<Slots extends Record<string, HTMLElement>>(
  slots: Record<keyof Slots, ReactElement<Slots[keyof Slots]>>
): SlotComponents<Slots> {
  const slots2 = {} as SlotComponents<Slots>;

  for (const slot in slots) {
    slots2[slot] = forwardRef((props, ref) => {
      const { className = "", ...rest } = props;
      //@ts-expect-error - INTENTIONAL
      const el = cloneElement(slots[slot], { ref, ...rest });
      el.props.className = cn(el.props.className, className);
      return el;
    });
  }
  return slots2;
}
// ===================================================================================================

const Input = () => {
  return <>hi</>;
};
const Wrapper = (props: { children: ReactNode }) => {
  return <div>sup</div>;
};
const InputElement = () => {
  return <input />;
};
Wrapper.InputElement = InputElement;
Input.Wrapper = Wrapper;

// ==============

// access all of Input
<Input />;

// or
<Input.Wrapper>
  <Input.Wrapper.InputElement />
</Input.Wrapper>;

// ==============
