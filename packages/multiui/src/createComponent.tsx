import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { __seperateClasses } from "../utils/cn";

// =========================== TYPES ==================================

type ComponentDefaultProps<Element> = React.RefAttributes<Element> &
  HTMLAttributes<Element>;
type ComponentProperties<
  CustomProperties extends Record<string, unknown>,
  Element,
> = ConvertToValidProps<CustomProperties> & ComponentDefaultProps<Element>;

type ConvertToValidProps<CustomProperties extends Record<string, unknown>> = {
  [K in keyof CustomProperties as K extends `$${string}`
    ? K
    : // @ts-expect-error - This works.
      `$${K}`]: CustomProperties[K];
};

type ClassNameHook = {
  className: (
    cb: ({
      defaultCn,
      passedCn,
    }: {
      passedCn: string;
      defaultCn: string;
    }) => string
  ) => string;
};

type UppercaseFirstLetter<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;

type CustomComponentFn<
  CustomProperties extends Record<string, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<string, Function>,
> = (
  args: {
    props: Omit<ComponentProperties<CustomProperties, Element>, "children">;
    Component: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<
        ConvertToValidProps<CustomProperties> & React.HTMLAttributes<Element>
      > &
        React.RefAttributes<Element>
    >;
  },
  hooks: Hooks & ClassNameHook
) => ReactNode;

//================================ CODE ==================================

export function createComponent<
  CustomProperties extends Record<`$${string}`, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<`use${string}`, Function> = {},
>(args: {
  name: string;
  createFn: (args: {
    props: ComponentProperties<CustomProperties, Element>;
    classNameSeperator: typeof __seperateClasses;
    createSlot: typeof createSlot;
  }) => {
    Component: ReactNode;
    hooks: Hooks;
  };
}) {
  //======================== createComponent Stage ==========================
  //@ts-expect-error - We will add the hooks soon.
  let hooks: Hooks & ClassNameHook = {
    className: (cb) => cb({ defaultCn: "", passedCn: "" }),
  };
  const LowestComponent = forwardRef<
    Element,
    ConvertToValidProps<CustomProperties> & HTMLAttributes<Element>
  >((props, ref) => {
    const { Component, hooks: h2 } = args.createFn({
      props: { ...props, ref: ref },
      createSlot,
      classNameSeperator: __seperateClasses,
    });
    hooks = { ...hooks, ...h2 };
    return Component;
  });
  LowestComponent.displayName = `MultiUI.${args.name}.Lowest`;

  return createSpecificComponent;

  //======================== createButton Stage ==========================

  function createSpecificComponent(
    createFn: (
      args: {
        props: ComponentProperties<CustomProperties, Element>;
        Component: typeof LowestComponent;
      },
      hooks: Hooks & ClassNameHook
    ) => ReactNode
  ) {
    // ========== Component Function Stage ===========
    const ComponentFn = forwardRef<
      Element,
      ConvertToValidProps<CustomProperties> &
        Omit<HTMLAttributes<Element>, "children"> & {
          children?:
            | ReactNode
            | CustomComponentFn<CustomProperties, Element, Hooks>;
        }
    >((props, ref) => {
      if (typeof props.children === "function") {
        const { children, ...rest } = props;
        const Component = children(
          {
            Component: LowestComponent,
            //@ts-expect-error - we're passing the correct props.
            props: { ...rest, ref: ref },
          },
          hooks
        );
        return Component;
      }

      const Component = createFn(
        {
          Component: LowestComponent,
          //@ts-expect-error - we're passing the correct props.
          props: { ...props, ref: ref },
        },
        hooks
      );
      return Component;
    });
    ComponentFn.displayName = `MultiUI.${args.name}`;

    return ComponentFn;
  }
}

//================================ createSlot ==================================

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

//============================================================================= TESTING API:

// const createButton = createComponent<
//   {
//     isDisabled?: boolean;
//   },
//   HTMLButtonElement,
//   {
//     /**
//      * Hello world
//      * @param isDisabled
//      * @returns
//      */
//     setDisabled: (isDisabled?: boolean) => void;
//   }
// >({
//   name: "Button",
//   createFn({ props }) {
//     const { $isDisabled = false } = props;
//     const [isDisabled, setIsDisabled] = useState($isDisabled);

//     const Component = <button disabled={isDisabled} {...props}></button>;

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

// const Button = createButton(({ props, Component }, { setDisabled }) => {
//   const comp = <Component {...props} />;

//   setDisabled(true);

//   return comp;
// });

// <Button $isDisabled>
//   {({ props, Component }, { setDisabled }) => {
//     setDisabled(true);
//     return <Component {...props}>Hello</Component>;
//   }}
// </Button>;
