"use client";
import { Button as RACButton, type ButtonProps } from "react-aria-components";
import { cn } from "../utils/cn";

cn;

function Button({
  children,
}: { children: React.ReactNode } & ButtonProps & {
    className?: Parameters<typeof cn>[0];
  }) {
  return <RACButton className={""}>{children}</RACButton>;
}

export default Button;
