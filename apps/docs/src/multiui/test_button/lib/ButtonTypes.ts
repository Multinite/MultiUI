// import type { cn } from "@multinite_official/multiui";
// import type { MouseEventHandler, ReactNode } from "react";

// import type {
//   As,
//   TEMP_MultiUI_Icons,
// } from "@multinite_official/multiui/createComponent";

// export type ButtonProps = {
//   /**
//    * Whether the button is loading.
//    * @default false
//    */
//   $isLoading?: boolean;
//   /**
//    * The element type to render the button as.
//    */
//   $as?: As;
//   /**
//    * Whether the button is disabled.
//    * @default false
//    */
//   $isDisabled?: boolean;
//   /**
//    * The size of the button.
//    * @default "md"
//    */
//   $size?: "sm" | "md" | "lg";
//   /**
//    * The color of the button.
//    * @default "primary"
//    */
//   $color?: "primary" | "secondary" | "success" | "danger" | "warning";
//   /**
//    * The radius of the button.
//    * @default "md"
//    */
//   $radius?: "none" | "sm" | "md" | "lg" | "full";
//   /**
//    * Whether the button should disable it's ripple effect.
//    * @default false
//    */
//   $disableRipple?: boolean;
//   /**
//    * Whether the button is an icon-only button.
//    * @default false
//    */
//   $isIconOnly?: boolean;

//   /**
//    * ![Mic icon](https://media.discordapp.net/attachments/797814323673301033/1280707633376133231/ovwuMeR.png?ex=66d90f6e&is=66d7bdee&hm=e46cd78e564c90bacd6873abae6b7349851bef6e456e551d1459e590e9ae1a54&=&format=webp&quality=lossless&width=96&height=96|width=50|height=50)
//    */
//   $icon?: TEMP_MultiUI_Icons;
//   /**
//    * Native `onClick` handler.
//    * Please use `onPress` instead.
//    */
//   onClick?: MouseEventHandler<HTMLButtonElement>;
// };

// export type HelperFunctions = {
//     /**
//      * The ripple effect to apply to the button.
//      * @default true
//      */
//     ripple: <T extends { disableRipple?: boolean }>(arg: T) => {};
//     /**
//      * Allows you to correctly disable the button.
//      * @default false
//      */
//     disable: <T extends { isDisabled?: boolean }>(arg: T) => {};
//     /**
//      * Allows you to correctly set the aria attributes of the button.
//      * @returns The aria attributes of the button.
//      */
//     aria: <
//       Label extends string,
//       TabIndex extends number,
//       Role extends "button" | (string & {}),
//       HasPopup extends boolean,
//       Expandable extends boolean,
//     >(arg: {
//       /**
//        * The label of the button.
//        */
//       ariaLabel: Label | string;
//       /**
//        * The tab index of the button.
//        * @default 0
//        */
//       tabIndex?: TabIndex | number;
//       /**
//        * The role of the button.
//        * @default "button"
//        */
//       role?: Role | (string & {});
//       /**
//        * Certain buttons opens menus or other popups.
//        * @default false
//        */
//       hasPopup?: HasPopup | boolean;
//       /**
//        * Certain buttons control expandable elements.
//        * @default false
//        */
//       expandable?: Expandable | boolean;
//     }) => {
//       "aria-label": Label | string;
//       "tab-index": TabIndex | number;
//       role: Role | (string & {});
//       "aria-haspopup": HasPopup | boolean;
//       "aria-expanded": Expandable | boolean;
//     };
//     /**
//      * Allows you to set the loading state of the button.
//      * This would place a loading spinner in the button when `isLoading` is set to `true`.
//      */
//     loading: (arg: { isLoading?: boolean }) => {};
//     /**
//      * Allows you to correctly set the focus state of the button.
//      * We recommend using this to have better accessibility for the focus state.
//      */
//     focus: () => {};
//     /**
//      * Allows you to correctly set the hover state of the button.
//      * We recommend using this to have better accessibility for the hover state.
//      */
//     hover: () => {};
//     /**
//      * Allows you to correctly set the press state of the button.
//      * We recommend using this to have better accessibility for the press state.
//      */
//     press: () => {};
//   };