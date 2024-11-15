import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement, isValidElement, cloneElement, forwardRef, } from "react";
import { Button } from "react-aria-components";
function createComponent(cb) {
    let slots = [];
    const SlotProxy = new Proxy({}, {
        get(_target, slotName, _receiver) {
            const Slot = ({ as, props = {}, children }) => {
                slots.push(slotName);
                if (typeof as === "function" && !isValidElement(as)) {
                    let componentOutput = null;
                    try {
                        componentOutput = as(props);
                        return cloneElement(componentOutput, {
                            ...componentOutput.props,
                            slot: slotName,
                            children,
                        });
                    }
                    catch (error) {
                        throw new Error(`An error occured while calling <${as.name} /> for slot "${slotName}" with the props: ` +
                            JSON.stringify(props, null, 2));
                    }
                }
                else {
                    const element = createElement(as, Object.assign(props, { slot: slotName }), children);
                    return element;
                }
            };
            return Slot;
        },
    });
    const Component = forwardRef((props, ref) => {
        const tree = cb(SlotProxy, ref);
        Component.displayName = slots[0];
        console.log(`assigning:`, slots);
        return tree;
    });
    const others = {
        slots: slots,
        /**
         * A handy type-safe helper function to create variants!
         */
        createVariant: (variant) => {
            return variant;
        },
    };
    return Object.assign(Component, others);
}
const ButtonComp = createComponent((Slot, ref) => (_jsxs(Slot.Button, { as: "div", children: [_jsx(Slot.Label, { as: "h1", children: "I'm a button Label" }), _jsx(Slot.Base, { as: Button, props: { className: "hello", ref: ref } }), _jsx(Slot.Test, { as: MyCustomComponent, props: { hello: "World" } })] })));
console.log(_jsx(ButtonComp, {}));
const defaultVariant = ButtonComp.createVariant({
    Base: "some classes for Base",
});
function MyCustomComponent(args) {
    return _jsxs("h1", { children: ["Hello ", args.hello] });
}
//# sourceMappingURL=test.js.map