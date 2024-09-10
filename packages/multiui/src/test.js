import { jsx as _jsx } from "react/jsx-runtime";
export const createComponent = ({ componentName, slots, create, }) => {
    return create;
};
createComponent({
    componentName: "test",
    create: () => { },
    slots: (() => ["hi"])
});
const test = createComponent({
    componentName: "test",
    slots: (slots) => [...slots],
    create: ({ props, createSlot, classNameSeperator }) => {
        return _jsx("div", { children: "test" });
    },
});
//# sourceMappingURL=test.js.map