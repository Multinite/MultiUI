"use client";
import {
  createComponent,
  CreateSlotsType,
} from "@multinite_official/multiui/createComponent";
import { useBaseClasses } from "./styling";
import { ButtonProps } from "./ButtonTypes";

type Slots = CreateSlotsType<{
  base: HTMLButtonElement;
  video: HTMLVideoElement;
}>;

export const createButton = createComponent<
  ButtonProps,
  HTMLButtonElement,
  Slots
>({
  name: "Button",
  createFn: ({ children, ref, ...rest }, { createSlot, assembleClassname }) => {
    const base_classes = useBaseClasses(
      rest.$size,
      rest.$color,
      rest.$radius,
      rest.$isIconOnly
    );

    const { Base, getBaseVariantClasses } = createSlot(
      "Base",
      (props, x: { $isDisabled: boolean }) => (
        <button ref={ref} {...props}></button>
      )
    );

    const { Video, getVideoVariantClasses } = createSlot(
      "Video",
      (props, x: { $isDisabled: boolean }) => (
        <video {...props}></video>
      )
    );

    return (
      <Base className={assembleClassname(base_classes)} {...rest}>
        {children}
      </Base>
    );
  },
});

/*

# There are four sources for classNames:
* className str or undefined
* $className (fn or str or undefined)
* default_className (str)
* variants_defined_classNames (str)


# Order of operation:
1. base classes
2. variants classes
3. $className
4. className

*/
