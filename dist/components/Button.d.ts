/// <reference types="react" />
import { type ButtonProps } from "react-aria-components";
import { cn } from "../utils/cn";
declare function Button(props: {
    children: React.ReactNode;
} & ButtonProps & {
    className?: Parameters<typeof cn>[0];
}): import("react/jsx-runtime").JSX.Element;
export default Button;
