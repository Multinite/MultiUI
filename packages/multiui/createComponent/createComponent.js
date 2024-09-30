import { forwardRef } from "react";
import { cn } from "../utils/cn";
//================================ CODE ==================================
export function createComponent(args) {
    //======================== createComponent Stage ==========================
    //@ts-expect-error - We will add the hooks soon.
    let hooks = {
        className: getClassname,
    };
    const LowestComponent = forwardRef((props, ref) => {
        // this assembles the className based on all the className related info passed along the way.
        function assembleClassname(default_classes) {
            return props.$className
                ? typeof props.$className === "function"
                    ? props.$className({ cn, classes: default_classes })
                    : cn(default_classes, props.$className)
                : cn(default_classes, props.className);
        }
        if (typeof props.children === "function") {
            const Component = props.children({
                Component: LowestComponent,
                props,
                assembleClassname,
            });
            return Component;
        }
        else {
            const Component = args.createFn({
                ...props,
                children: props.children,
                ref: ref,
            }, {
                createSlot: (name, component) => {
                    const cmp = (props) => component({ ...props, slot: name }, {});
                    cmp.name = `MultiUI.${name}`;
                    return {
                        [name]: cmp,
                        [`get${capitalize(name)}VariantClasses`]: () => "placeholder_class", //TODO: Fix
                    };
                },
                assembleClassname,
            });
            return Component;
        }
    });
    LowestComponent.displayName = `MultiUI.${args.name}.Lowest`;
    return createSpecificComponent;
    //======================== createButton Stage ==========================
    function createSpecificComponent(createFn) {
        // ========== Component Function Stage ===========
        const ComponentFn = forwardRef((props, ref) => {
            const Component = createFn({
                Component: LowestComponent,
                props: { ...props, ref: ref },
            }, hooks);
            return Component;
        });
        ComponentFn.displayName = `MultiUI.${args.name}`;
        return ComponentFn;
    }
}
//================================ createSlot ==================================
function createSlot(name, component) {
    const cmp = (props) => component({ ...props, slot: name }, {});
    cmp.name = `MultiUI.${name}`;
    //@ts-expect-error - This is a hack to make the type checker happy.
    return {
        [name]: cmp,
        [`get${capitalize(name)}VariantClasses`]: () => "placeholder_class", //TODO: Fix
    };
}
function capitalize(s) {
    return (s.charAt(0).toUpperCase() + s.slice(1));
}
//================================ getClassname ==================================
// this function is use in the `createFn` function to get the classes passed by props from the dev,
// as well as the classes provided by default of the component.
export function getClassname({ $className, default_className, }) {
    if (typeof $className === "function") {
        return { className: $className({ cn, classes: default_className }) };
    }
    else {
        return { className: cn(default_className, $className) };
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
//# sourceMappingURL=createComponent.js.map