import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

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

// type ConvertToHookNames<Hooks extends Record<string, Function>> = {
//   [K in keyof Hooks as K extends `use${string}`
//     ? K
//     : // @ts-expect-error - This works.
//       `use${UppercaseFirstLetter<K>}`]: Hooks[K];
// };

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
  hooks: Hooks
) => ReactNode;

//================================ CODE ==================================

export function createComponent<
  CustomProperties extends Record<`$${string}`, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<`use${string}`, Function>,
>(args: {
  name: string;
  createFn: (args: {
    props: ComponentProperties<CustomProperties, Element>;
  }) => { Component: ReactNode; hooks: Hooks };
}) {
  //======================== createComponent Stage ==========================
  let hooks: Hooks;
  const LowestComponent = forwardRef<
    Element,
    ConvertToValidProps<CustomProperties> & HTMLAttributes<Element>
  >((props, ref) => {
    const { Component, hooks: h2 } = args.createFn({
      props: { ...props, ref: ref },
    });
    hooks = h2;
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
      hooks: Hooks
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
