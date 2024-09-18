import { forwardRef } from "react";
import { __seperateClasses } from "../utils/cn";
//================================ CODE ==================================
export function createComponent(args) {
    //======================== createComponent Stage ==========================
    //@ts-expect-error - We will add the hooks soon.
    let hooks = {
        className: (cb) => ({ className: cb({ defaultCn: "", passedCn: "" }) }),
    };
    const LowestComponent = forwardRef((props, ref) => {
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
export function createSlot(slotName) {
    return {
        [slotName]: slotName, //TODO: Fix vvv
        [`get${capitalize(slotName)}Classes`]: (props) => "placeholder_class",
    };
}
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