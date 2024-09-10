import { ForwardedRef } from "react";

export const createComponent = <
  ComponentProps,
  Element extends HTMLElement = HTMLElement,
>({
  componentName,
  slots,
  create,
}: createComponentProps<ComponentProps, Element>) => {
  return create;
};

createComponent({
  componentName: "test",
  create: () => {},
  slots: (() => ["hi"])
})

type createComponentProps<ComponentProps, Element extends HTMLElement, t extends number = 1> = {
  componentName: string;
  slots: <S extends Record<string, any>>(
    cb: (slots: (keyof S)[]) => (keyof S)[]
  ) => t;
  create: <SlotProps extends Record<string, any>>(props: {
    props: ComponentProps & { ref: ForwardedRef<Element> & typeof  };
    createSlot: <Slot extends keyof SlotProps>(props: {
      slot: Slot;
      styling_args: SlotProps[Slot];
    }) => Slot;
    classNameSeperator: "";
  }) => void;
};

const test = createComponent({
  componentName: "test",
  slots: (slots) => [...slots],
  create: ({ props, createSlot, classNameSeperator }) => {
    return <div>test</div>;
  },
});
