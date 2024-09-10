import { ForwardedRef } from "react";
export declare const createComponent: <ComponentProps, Element extends HTMLElement = HTMLElement>({ componentName, slots, create, }: createComponentProps<ComponentProps, Element>) => <SlotProps extends Record<string, any>>(props: {
    props: ComponentProps & {
        ref: ForwardedRef<Element> & typeof ;
    };
    createSlot: <Slot extends keyof SlotProps>(props: {
        slot: Slot;
        styling_args: SlotProps[Slot];
    }) => Slot;
    classNameSeperator: "";
}) => void;
type createComponentProps<ComponentProps, Element extends HTMLElement, t extends number = 1> = {
    componentName: string;
    slots: <S extends Record<string, any>>(cb: (slots: (keyof S)[]) => (keyof S)[]) => t;
    create: <SlotProps extends Record<string, any>>(props: {
        props: ComponentProps & {
            ref: ForwardedRef<Element> & typeof ;
        };
        createSlot: <Slot extends keyof SlotProps>(props: {
            slot: Slot;
            styling_args: SlotProps[Slot];
        }) => Slot;
        classNameSeperator: "";
    }) => void;
};
export {};
