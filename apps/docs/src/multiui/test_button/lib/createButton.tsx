"use client";
import { createComponent } from "@multinite_official/multiui/createComponent";
import { useBaseClasses } from "./styling";
import { ButtonProps, HelperFunctions } from "./ButtonTypes";

export const createButton = createComponent<
  ButtonProps,
  HTMLButtonElement,
  HelperFunctions
>({
  name: "Button",
  createFn: ({ children, ref, ...rest }, { createSlot, assembleClassname }) => {
    const base_classes = useBaseClasses(
      rest.$size,
      rest.$color,
      rest.$radius,
      rest.$isIconOnly
    );

    const { Base, getBaseProps } = createSlot(
      "base",
      (props, x: { $isDisabled: boolean }) => (
        <button ref={ref} {...props}></button>
      )
    );

    return (
      <Base className={assembleClassname(base_classes)} {...rest}>
        {children}
      </Base>
    );
  },
});
