import { jsx as _jsx } from "react/jsx-runtime";
const createButton = createComponent( /* some code to create the button component */);
createButton.displayName = "Button";
const Button = createButton(({ props, slots, helpers }) => {
    return (_jsx(slots.wrapper, { children: _jsx(slots.base, { ...props }) }));
});
function createButton(cb) { }
//# sourceMappingURL=createComponent.js.map