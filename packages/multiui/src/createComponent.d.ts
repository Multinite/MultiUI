import { CreateComponentFn } from "./createComponentTypes.js";
export declare const createComponent: CreateComponentFn;
type UppercaseFirstLetter<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
export declare function createSlot<SlotName extends string, SlotProps extends Record<string, any>>(slotName: SlotName): {
    [K in SlotName]: SlotName;
} & {
    [K in `get${UppercaseFirstLetter<SlotName>}Classes`]: (props: SlotProps) => string;
};
export {};
