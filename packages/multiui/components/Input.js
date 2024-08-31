"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Button as RACButton } from "react-aria-components";
import { cn, cn_separator } from "../utils/cn";
function Button(props) {
    return (_jsx(RACButton, { slot: `Button`, className: cn("w-fit h-fit", cn_separator, props.className), children: props.children }));
}
export default Button;
//# sourceMappingURL=Input.js.map