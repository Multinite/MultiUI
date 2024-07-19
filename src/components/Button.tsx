"use client";
import { Button as RACButton } from "react-aria-components";

function Button({ children }: { children: React.ReactNode }) {
  return <RACButton>{children}</RACButton>;
}

export default Button;
