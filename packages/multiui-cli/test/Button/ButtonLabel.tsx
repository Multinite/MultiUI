"use client";
import { cn, cn_seperator } from "@multinite_official/multiui";
import { Button as RACButton } from "react-aria-components";
import type { ButtonProps as R_ButtonProps } from "react-aria-components";

export type ButtonLabelProps = R_ButtonProps & {
  label?: string;
};

/**
 * ## Button's Label component
 * This is label for the button component.
 *
 * @see https://multiui.org/packages/Button@1.0.0
 * @version 1.0.0
 * @author Multinite
 */
export const ButtonLabel = (props: ButtonLabelProps) => {
  return (
    <RACButton
      slot={`Button`}
      className={cn(
        "w-fit h-fit",
        ...(props.className ? [cn_seperator, props.className] : [])
      )}
    >
      {props.children}
    </RACButton>
  );
};
