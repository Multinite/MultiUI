const { test } = (() => {
    return {
        test: function (test) {
            // Change here
            //@ts-ignore
            return 1;
        },
    };
})();
const ddddddd = test("hi");
ddddddd;
/**
 * This allows you to create slots for your component which in-turn supports variants.
 *
 * ```tsx
 * const {base, getBaseClasses} = createSlot<"Base", {}>("Base");
 * <Button slot={base} className={getBaseClasses()}>Foo</Button>
 * ```
 */
function createSlot(slotName) {
    return {
        [slotName]: slotName,
        [`get${capitalize(slotName)}Classes`]: 1,
    };
}
function capitalize(s) {
    return (s.charAt(0).toUpperCase() + s.slice(1));
}
const test2 = createSlot("base");
createSlot("hi");
export {};
//# sourceMappingURL=createComponentTypes.js.map