import { type HTMLAttributes } from "react";
import type { Prettify } from "./types";
export declare const buttonSlots: {
    base: (props: SlotElement<"button">) => import("react/jsx-runtime").JSX.Element;
    wrapper: (props: SlotElement<"div">) => import("react/jsx-runtime").JSX.Element;
    createHook: CreateHook<{
        base: (props: SlotElement<"button">) => import("react/jsx-runtime").JSX.Element;
        wrapper: (props: SlotElement<"div">) => import("react/jsx-runtime").JSX.Element;
    }>;
    createVariant: CreateVariant<{
        base: (props: SlotElement<"button">) => import("react/jsx-runtime").JSX.Element;
        wrapper: (props: SlotElement<"div">) => import("react/jsx-runtime").JSX.Element;
    }>;
};
type CreateHook<Slots extends Record<string, (props: Prettify<HTMLAttributes<HTMLElement> & {
    slot: string;
}>) => JSX.Element>> = <HookCB extends (slots: Slots) => unknown>(cb: HookCB) => HookCB;
type CreateVariant<Slots extends Record<string, (props: Prettify<HTMLAttributes<HTMLElement> & {
    slot: string;
}>) => JSX.Element>> = <VariantCB extends (slots: Slots) => Partial<Record<keyof Slots, string>>>(cb: VariantCB) => VariantCB;
type SlotElement<Element extends keyof JSX.IntrinsicElements> = Prettify<JSX.IntrinsicElements[Element] & {
    slot: string;
}>;
export {};
