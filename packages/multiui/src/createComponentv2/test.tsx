import {
  type ComponentProps,
  createElement,
  isValidElement,
  ReactNode,
} from "react";
import type { Prettify } from "./types";

type RequiredKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]>
    ? T[K] extends undefined
      ? never
      : K
    : never;
}[keyof T];

type HasRequiredKeys<T> = RequiredKeys<T> extends never ? false : true;

type CustomComponent = (props?: any) => JSX.Element;
type SlotCreator = <
  ElementType extends CustomComponent | keyof JSX.IntrinsicElements,
>({
  as,
  props,
  children,
}: {
  as: ElementType;
  children?:
    | JSX.Element
    | JSX.Element[]
    | (ElementType extends keyof JSX.IntrinsicElements
        ? ComponentProps<ElementType> extends { children?: ReactNode }
          ? ReactNode
          : never
        : //@ts-ignore
          Parameters<ElementType>[0] extends { children?: ReactNode }
          ? ReactNode
          : never);
} & (ElementType extends (args: any) => any
  ? HasRequiredKeys<Parameters<ElementType>[0]> extends true
    ? { props: Prettify<Omit<Parameters<ElementType>[0], "children">> }
    : { props?: Prettify<Omit<Parameters<ElementType>[0], "children">> }
  : {
      props?: Omit<ComponentProps<ElementType>, "children">;
    })) => JSX.Element;

const Slot = new Proxy(
  {} as Record<`${CapitalLetters}${string}`, SlotCreator>,
  {
    get(_target, slotName: `${CapitalLetters}${string}`, _receiver) {
      const Slot: SlotCreator = ({ as, props = {}, children }) => {
        if (typeof as === "function" && !isValidElement(as)) {
          let componentOutput: JSX.Element | null = null;
          try {
            componentOutput = as(props);
            componentOutput.props.slot = slotName;
            componentOutput.props.children = children;
          } catch (error) {
            throw new Error(
              `An error occured while calling <${as.name} /> for slot "${slotName}" with the props: ` +
                JSON.stringify(props, null, 2)
            );
          }
          return componentOutput;
        } else {
          const element = createElement(
            as,
            Object.assign(props, { slot: slotName }),
            children
          );
          return element;
        }
      };

      return Slot;
    },
  }
);

type CapitalLetters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

<Slot.ButtonWrapper as={"p"}>
  <Slot.ButtonLabel as={"h1"}>I'm a button Label</Slot.ButtonLabel>
  <Slot.Base as={"button"} props={{ className: "hello" }} />
  <Slot.Test as={MyCustomComponent} props={{ hello: "World" }} />
</Slot.ButtonWrapper>;

function MyCustomComponent(args: { hello: "World" }) {
  return <h1>Hello World</h1>;
}
