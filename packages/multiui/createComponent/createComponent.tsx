import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { __seperateClasses, cn } from "../utils/cn";

// =========================== TYPES ==================================

// Pass the `Element` and it returns all the attributes for said element type, plus `ref` attributes.
type GetElementAttributes<Element> = React.RefAttributes<Element> &
  HTMLAttributes<Element>;

// PURPOSE: The complete list of properties for a component.
// Pass the `CustomProperties` (defined by the dev) and an Element Type, and we return
// all the properties to form a valid component.
// - attributes of element
// - `CustomProperties` defined by the dev, but modified to be valid; Such as prefixing with `$`, and other modifications.
type ComponentProperties<
  CustomProperties extends Record<string, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<string, Function>,
> = ConvertToValidProps<CustomProperties> &
  OmitUnwantedElementAttributes<GetElementAttributes<Element>> &
  AppendDefaultProperties<CustomProperties, Element, Hooks>;

// A Type function which removes all the attributes that are provided by an element, but are not wanted.
// This is because we provide custom attributes that overwrite the default behavour of it.
type OmitUnwantedElementAttributes<Attributes extends {}> = Omit<
  Attributes,
  UnwantedAttributes
>;

// Create a list of all unwated attributes.
// Made this a seperate type since both `ConvertToValidProps` & `OmitUnwantedElementAttributes` use it.
type UnwantedAttributes = "children" | "className" | "slot";

// A type function which allows you to pass `CustomProperties` and we will return
// the same thing but with all keys prefixed with `$`.
type ConvertToValidProps<CustomProperties extends Record<string, unknown>> =
  Omit<
    {
      [K in keyof CustomProperties as K extends `$${string}`
        ? K
        : // @ts-expect-error - This works.
          `$${K}`]: CustomProperties[K];
    },
    Prefix$onTuples<UnwantedAttributes>
  >;

// This Type function simply adds `$` to the start of all the tuples.
// Eg: `hi | bye` becomes `$hi | $bye`
type Prefix$onTuples<T extends string> = T extends `${infer U}`
  ? `${`$${U}`}`
  : T;

// This will be passed along-side the hooks made by the dev during `createComponent`.
// Then both this, and dev-made hooks will be avalible in `create<Name>` function to be utilized creating powerful components.
type DefaultHooks = {
  // Allow the dev to call it with a callback within and gain access to
  // the classNames that were initially made by `createComponent`, as well as all the classNames provded as props to the component.
  className: (
    cb: ({
      defaultCn,
      passedCn,
    }: {
      passedCn: string;
      defaultCn: string;
    }) => string
  ) => {
    className: string;
  };
};

// As the name suggests, this is an object containing all the properties that are also valid for the component and is of course developed by us.
type AppendDefaultProperties<
  CustomProperties extends Record<string, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<string, Function>,
> = CustomProperties & {
  /**
   * ### ───────────────────────────
   * ![Image of demo-code](https://multiui.org/assets/code/classname.png|width=569.6|height=68)
   * ### ───────────────────────────
   * ## Pick your poison: Assigning classes with better control.
   * ### ㅤㅤ
   * ### Function: More control over the button's classes.
   * ```tsx
   * <Button $className={({ classes, cn }) => cn(classes, "your TW classes")}>
   * ㅤHello, World!
   * </Button>
   * ```
   * ### ㅤㅤ
   * # OR
   * ### ㅤㅤ
   *
   * ### String: Default classes are prepended, followed by your classes.
   * ```tsx
   * <Button $className="your TW classes">
   * ㅤHello, World!
   * </Button>
   * ```
   * ### ───────────────────────────
   * Note: If you use the default `className` prop, it will be overridden by this `$className` prop.
   * @see {@link https://multiui.org/docs/custom-classes}
   */
  $className?: ClassNameFn;
  /**
   * # Do not use!
   * You're completely fine to use the `className` prop, however, we recommend you use the MultiUI custom `$className` prop to have further granularity over the classes.
   *
   * Note: If you use both, the `$className` prop will take priority and override the `className` prop.
   *
   * @deprecated
   */
  className?: string;
  /**
   * # Do not use!
   * MultiUI will automatically add a slot.
   *
   * @deprecated
   */
  slot?: string;
  /**
   * # Children
   * Children works like normal, however if you pass a function, it will be treated as a custom component builder.
   *
   * Custom Component Builder:
   * ```tsx
   * <Button>
   *   {({ Component, props, classNameSeperator }) => (
   *     <Component {...props} className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} />
   *   )}
   * </Button>
   * ```
   *
   * @see {@link https://multiui.org/docs/custom-components}
   *
   */
  children?:
    | ReactNode
    | CustomComponentFn<
        AppendDefaultProperties<CustomProperties, Element, Hooks>,
        Element,
        Hooks
      >;
  /**
   * # Don't use.
   * This is a prop made for the sake of DX, it makes it easier to see the seperation between custom properties that are defined with `$` and the normal properties.
   * ### ───────────────────────────
   * ![Image of demo](https://multiui.org/assets/code/underscore_property_seperator)
   * ### ───────────────────────────
   *
   */
  $z_____________________?: never;
};

// This type is used on the `className` prop to allow the dev to either pass a callback to it and do some magic,
// or just pass a string, like the traditional way.
type ClassNameFn =
  | ((props: {
      /**
       * The default classes that intend to be passed to the button.
       */
      classes: string;
      cn: typeof cn;
    }) => string)
  | string;

// A Type function which returns a string with the first letter to be uppercase.
type UppercaseFirstLetter<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;

// This is a function that is used as the children's component creator function.
// EG, this function:
// <Buttom>
//   {({ Component, props, classNameSeperator }) => (
//     <Component {...props} className={classNameSeperator((cn) => [cn("bg-red-500"), cn("bg-blue-500")])} />
//   )}
//</Buttom>
type CustomComponentFn<
  CustomProperties extends Record<string, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<string, Function>,
> = (
  args: {
    props: Omit<
      ComponentProperties<CustomProperties, Element, Hooks>,
      "children"
    >;
    Component: React.ForwardRefExoticComponent<
      // We omit children since the definiton of the "children" would be in process "now" considering the children is being defined in THIS function
      Omit<ComponentProperties<CustomProperties, Element, Hooks>, "children">
    >;
  },
  hooks: Hooks & DefaultHooks
) => ReactNode;

//================================ CODE ==================================

export function createComponent<
  CustomProperties extends Record<`$${string}`, unknown>,
  Element extends HTMLElement,
  Hooks extends Record<`use${string}`, Function> = {},
>(args: {
  name: string;
  createFn: (args: {
    props: ComponentProperties<CustomProperties, Element, Hooks>;
    classNameSeperator: typeof __seperateClasses;
    createSlot: typeof createSlot;
  }) => {
    Component: ReactNode;
    hooks: Hooks;
  };
}) {
  //======================== createComponent Stage ==========================
  //@ts-expect-error - We will add the hooks soon.
  let hooks: Hooks & DefaultHooks = {
    className: (cb) => ({ className: cb({ defaultCn: "", passedCn: "" }) }),
  };
  const LowestComponent = forwardRef<
    Element,
    ComponentProperties<CustomProperties, Element, Hooks>
  >((props, ref) => {
    const { Component, hooks: h2 } = args.createFn({
      props: {
        ...props,
        ref: ref,
      },
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
        props: ComponentProperties<CustomProperties, Element, Hooks>;
        Component: typeof LowestComponent;
      },
      hooks: Hooks & DefaultHooks
    ) => ReactNode
  ) {
    // ========== Component Function Stage ===========
    const ComponentFn = forwardRef<
      Element,
      ComponentProperties<CustomProperties, Element, Hooks>
    >((props, ref) => {
      const Component = createFn(
        {
          Component: LowestComponent,
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
    [slotName]: slotName, //TODO: Fix vvv
    [`get${capitalize(slotName)}Classes`]: (props) => "placeholder_class",
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
