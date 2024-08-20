"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Button as RACButton } from "react-aria-components";
import { cn, cn_seperator } from "../utils/cn";
function Button(props) {
    return (_jsx(RACButton, { slot: `Button`, className: cn("w-fit h-fit", cn_seperator, props.className), children: props.children }));
}
export default Button;
//# sourceMappingURL=Input.js.map