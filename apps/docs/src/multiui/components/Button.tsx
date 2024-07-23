import { createComponent } from "@multinite_official/multiui";
import { CreateComponents } from "@multinite_official/multiui/providers/createComponent";

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
    return <button className={props.className}>{props.children}</button>;
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
