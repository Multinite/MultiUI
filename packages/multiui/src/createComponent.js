"use client";
import { forwardRef, } from "react";
import { __seperateClasses } from "../utils/cn.js";
export const createComponent = ({ componentName, create, }) => {
    // let variants: { slot: keyof Slots; create: (...props: any) => sring }[] = [];
    let Component = forwardRef((props, ref) => {
        return create({
            props: { ...props, ref },
            createSlot: createSlot,
            classNameSeperator: __seperateClasses,
        });
    });
    Component.displayName = `MultiUI.${componentName}`;
    const createComponentCb = (cb) => {
        const createVariant = () => { };
        const Component = forwardRef((props, ref) => {
            return cb({ props: { ...props, ref }, helperFunctions: {} });
        });
        return Object.assign(Component, {
            createVariant,
        });
    };
    return createComponentCb;
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