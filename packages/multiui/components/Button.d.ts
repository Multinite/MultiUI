import { type ButtonProps } from "react-aria-components";
import { cn } from "../utils/cn";
declare function Button(props: ButtonProps & {
    className?: Parameters<typeof cn>[0];
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default Button;
