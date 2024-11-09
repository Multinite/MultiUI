import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, } from "react";
import { cn } from "../utils";
const Button = createButton_(({ props, slots, helpers }) => {
    return (_jsx(slots.wrapper, { children: _jsx(slots.base, { ...props, ref: props.ref }) }));
});
_jsx(Button, { children: "Hello" });
function createButton_(cb) {
    const Component = forwardRef((props, ref) => {
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
    base: (props) => (_jsx("button", { ...props, className: cn("rounded-medium", props.className), slot: props.slot })),
    wrapper: (props) => (_jsx("div", { ...props, className: cn("text-3xl", props.className), slot: props.slot })),
});
const myHook = buttonSlots.createHook((slots) => {
    slots.base;
    return { a: 1, b: 2, c: 3 };
});
const myVariant = buttonSlots.createVariant((slots) => {
    return {
        base: "HI",
    };
});
function createSlots(slots) {
    const createHook = (cb) => {
        return cb;
    };
    const createVariant = (cb) => {
        return cb;
    };
    return Object.assign(slots, { createHook, createVariant });
}
//# sourceMappingURL=createButton.js.map