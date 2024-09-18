import { HelperFunctions } from "./ButtonTypes";
import { getProps } from "./getProps";

export const getButtonHelperFunctions: (props: {
  base_classes: string;
  focusProps: ReturnType<typeof getProps>["focusProps"];
  hoverProps: ReturnType<typeof getProps>["hoverProps"];
  pressProps: ReturnType<typeof getProps>["pressProps"];
  disabledProps: ReturnType<typeof getProps>["disabledProps"];
}) => HelperFunctions = ({
  base_classes,
  focusProps,
  hoverProps,
  pressProps,
  disabledProps,
}) => {
  return {
    className: (arg) => {
      return {
        className: arg({
          passedCn: "",
          defaultCn: base_classes,
        }),
      };
    },
    aria: ({
      ariaLabel,
      tabIndex = 0,
      role = "button",
      hasPopup = false,
      expandable = false,
    }) => {
      return {
        "aria-label": ariaLabel,
        "tab-index": tabIndex,
        role: role,
        "aria-haspopup": hasPopup,
        "aria-expanded": expandable,
      };
    },
    loading(arg: { isLoading?: boolean }) {
      return {};
    },
    ripple(arg: { disableRipple?: boolean }) {
      return {};
    },
    disable(arg: { isDisabled?: boolean }) {
      return {
        ...disabledProps,
      };
    },
    focus() {
      return {
        ...focusProps,
      };
    },
    hover() {
      return {
        ...hoverProps,
      };
    },
    press() {
      return {
        ...pressProps,
      };
    },
  };
};
