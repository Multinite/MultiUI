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
const Button = createButton(
  (
    { props, Component },
    { className, aria, disable, focus, hover, press, loading, ripple }
  ) => {

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

    

    // console.log(disable({isDisabled: true}))

    // Comment out any helper function you don't want to use.
    // You can always hover over the helper function to see more information about it.
    const componentProps = {
      //   ...disable({ isDisabled: $isDisabled }), // Allows the button to have proper disabled functionality.
      //   ...ripple({ disableRipple: $disableRipple }), // Allows the button to ripple.
      //   ...className(({ passedCn, defaultCn }) => cn(passedCn, defaultCn)), // Allows the button to have custom classes.
      //   ...aria({ ariaLabel: "This is my button" }), // Allows the button to have custom aria attributes.
      //   ...loading({ isLoading: $isLoading }), // Allows the button to have loading functionality.
      //   ...focus(), // Allows the button to have better accessibility for focus functionality.
      //   ...hover(), // Allows the button to have better accessibility for hover functionality.
      //   ...press(), // Allows the button to have better accessibility for press functionality.
      ...attributes,
    };

    return <Component {...componentProps}>{attributes.children}</Component>;
  }
);

export default Button;
