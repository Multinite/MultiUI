"use client";
import { forwardRef } from "react";
import { __seperateClasses } from "../utils/cn.js";
export const createComponent = ({ componentName, create, }) => {
    const Component = forwardRef((props, ref) => {
        let Component = create({
            props: { ...props, ref },
            createSlot: createSlot,
            classNameSeperator: __seperateClasses,
        });
        return Component;
    });
    Component.displayName = `MultiUI.${componentName}`;
    return Object.assign(Component, {
        createVariant: () => { },
    });
};
export function createSlot(slotName) {
    return {
        [slotName]: slotName,
        [`get${capitalize(slotName)}Classes`]: 1,
    };
}
function capitalize(s) {
    return (s.charAt(0).toUpperCase() + s.slice(1));
}
//# sourceMappingURL=createComponent.js.map