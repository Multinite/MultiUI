import { forwardRef } from "react";
import { cn } from "../utils/cn";
//================================ CODE ==================================
export function createComponent(args) {
    //======================== createComponent Stage ==========================
    let hooks = {
        className: getClassname,
    };
    let slots = {};
    function createSpecificComponent(createFn) {
        // ========== Component Function Stage ===========
        const ComponentFn = forwardRef((props, ref) => {
            console.log(123, slots);
            const Component = createFn({
                props: { ...props, ref: ref },
                ...slots,
            }, hooks);
            return Component;
        });
        ComponentFn.displayName = `MultiUI.${args.name}`;
        return ComponentFn;
    }
    // the lowest component in theory should be the one made in `createButton.tsx`
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
            //@ts-expect-error - it works
            const Component = props.children({
                props,
                assembleClassname,
                ...slots,
            });
            return Component;
        }
        else {
            function createSlot(name, component) {
                const cmp = (props) => component({ ...props, slot: name }, {});
                cmp.name = `MultiUI.${args.name}.${name.toString()}`;
                console.log(121222, cmp.name);
                slots[name.toString()] = cmp;
                //@ts-expect-error - This is a hack to make the type checker happy.
                return {
                    [name]: cmp,
                    [`get${capitalize(name)}VariantClasses`]: () => "placeholder_class", //TODO: Fix
                };
            }
            const Component = args.createComponnetFn({
                ...props,
                children: props.children,
                ref: ref,
            }, {
                createSlot: createSlot,
                assembleClassname,
            });
            return Component;
        }
    });
    LowestComponent.displayName = `MultiUI.${args.name}.Lowest`;
    return createSpecificComponent;
}
//======================== createButton Stage ==========================
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
//================================ utilities ==================================
function capitalize(s) {
    return (s.charAt(0).toUpperCase() + s.slice(1));
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