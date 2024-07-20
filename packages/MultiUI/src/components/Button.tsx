"use client";
import { Button as RACButton, type ButtonProps } from "react-aria-components";
import { cn, cn_seperator } from "../utils/cn";

function Button(
  props: { children: React.ReactNode } & ButtonProps & {
      className?: Parameters<typeof cn>[0];
    }
) {
  return (
    <RACButton
      slot={`Button`}
      className={cn("w-fit ", cn_seperator, props.className)}
    >
      {props.children}
    </RACButton>
  );
}

export default Button;