import { Button as RACButton, type ButtonProps } from "react-aria-components";
import { createComponent, CreateComponents } from "@multinite_official/multiui";
import { cn, cn_seperator } from "../utils/cn";
/**
 * ## Button component
 * This is the default button component.
 *
 * @see https://multiui.org/packages/Button@1.0.0
 * @version 1.0.0
 * @author Multinite
 */
namespace ButtonComponent {
  export const name = "Button";
  export const version = "1.0.0";

  const { create_baseComponent, create_subComponent }: CreateComponents =
    createComponent(ButtonComponent);

  /**
   * ## Button component
   * This is the default button component.
   *
   * @see https://multiui.org/packages/Button@1.0.0
   * @version 1.0.0
   * @author Multinite
   */
  export const base = create_baseComponent((props) => {
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

  /**
   * ## Button's Label component
   * This is label for the button component.
   *
   * @see https://multiui.org/packages/Button@1.0.0
   * @version 1.0.0
   * @author Multinite
   */
  export const ButtonLabel = create_subComponent((props) => {
    return <span className={props.className}>{props.children}</span>;
  });
}

export { ButtonComponent };
export default ButtonComponent.base;
