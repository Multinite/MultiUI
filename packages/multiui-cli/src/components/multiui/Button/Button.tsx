"use client";
import { cn, cn_seperator } from "@multinite_official/multiui";
import { Button as RACButton } from "react-aria-components";
import type { ButtonProps as R_ButtonProps } from "react-aria-components";

export type ButtonProps = R_ButtonProps & {
  cool: true;
};

/**
 * ## Button component
 * This is the default button component.
 *
 * @see https://multiui.org/packages/Button@1.0.0
 * @version 1.0.0
 * @author Multinite
 */
export const Button = (props: ButtonProps) => {
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
