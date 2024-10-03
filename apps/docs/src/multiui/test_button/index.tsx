"use client";
import { createButton } from "./lib/createButton";

/**
 * ### ───────────────────────────
 * ## [Button](https://multiui.org/components/button)
 * ![Button Image](https://multiui.org/assets/components/button/button.png|width=145.2|height=100.7)
 * ### ───────────────────────────
 * @name Button
 * @description A MultiUI button component.
 * @version 1.0.0
 * @see {@link https://multiui.org/components/button}
 * @author MultiUI
 */
const Button = createButton(({ props, Base, Video }, { className }) => {
  const {
    $disableRipple,
    $isDisabled,
    $isLoading,
    $isIconOnly,
    $color,
    $radius,
    $size,
    $as,
    $className,
    ...attributes
  } = props;

  const componentProps = {
    ...attributes,
  };

  return <Base {...componentProps}>{attributes.children}</Base>;
});

export default Button;
