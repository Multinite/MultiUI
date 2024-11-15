import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
//@ts-nocheck
import { cloneElement, forwardRef, } from "react";
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
    base: (props) => (_jsx("button", { ...props, className: cn("rounded-medium", props.className) })),
    wrapper: (props) => (_jsx("div", { ...props, className: cn("text-3xl", props.className) })),
    hey: (props) => _jsx("h1", { ...props, children: "sup" }),
});
export const buttonSlots2 = createSlots2({
    base: _jsx("button", {}),
    // wrapper: <div />,
    // hey: <h1 />,
});
_jsx(buttonSlots2.base, { className: "hello world", __Element: "base", children: "hi" });
{
    /* <buttonSlots2.wrapper className="hello world">hi</buttonSlots2.wrapper>; */
}
const myHook = buttonSlots.createHook(() => {
    return { a: 1, b: 2, c: 3 };
});
myHook();
function createSlots(slots) {
    function createHook(cb) {
        return cb;
    }
    const createVariant = (cb) => {
        return (args) => {
            return cb(slots, args);
        };
    };
    return Object.assign(slots, { createHook, createVariant });
}
function createSlots2(slots) {
    const slots2 = {};
    for (const slot in slots) {
        slots2[slot] = forwardRef((props, ref) => {
            const { className = "", ...rest } = props;
            //@ts-expect-error - INTENTIONAL
            const el = cloneElement(slots[slot], { ref, ...rest });
            el.props.className = cn(el.props.className, className);
            return el;
        });
    }
    return slots2;
}
// ===================================================================================================
const Input = () => {
    return _jsx(_Fragment, { children: "hi" });
};
const Wrapper = (props) => {
    return _jsx("div", { children: "sup" });
};
const InputElement = () => {
    return _jsx("input", {});
};
Wrapper.InputElement = InputElement;
Input.Wrapper = Wrapper;
// ==============
// access all of Input
_jsx(Input, {});
// or
_jsx(Input.Wrapper, { children: _jsx(Input.Wrapper.InputElement, {}) });
//# sourceMappingURL=createButton.js.map