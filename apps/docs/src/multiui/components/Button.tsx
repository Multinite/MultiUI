"use client";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { createComponent } from "@multinite_official/multiui";
import { cn, cn_seperator } from "../utils/cn";
/**
 * ## Button component
 * This is the default button component.
 *
 * @see https://multiui.org/packages/Button@1.0.0
 * @version 1.0.0
 * @author Multinite
 * @
 */
namespace ButtonComponent {
  export const name = "Button";
  export const version = "1.0.0";

  const { createBaseComponent, createSubComponent } =
    createComponent(ButtonComponent);

  export type ButtonProps = RACButtonProps & {
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
  export const base = createBaseComponent<ButtonProps>((props) => {
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
  });

  export type ButtonLabelProps = RACButtonProps & {
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
  export const ButtonLabel = createSubComponent<ButtonLabelProps>((props) => {
    return <span className={props.className}>{props.children}</span>;
  });
}

export { ButtonComponent };
export default ButtonComponent.base;
