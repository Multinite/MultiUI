import { useMemo } from "react";
import { useFocus, useHover, usePress } from "react-aria";
import type { ButtonProps } from "./ButtonTypes";

export const getProps = (props: ButtonProps) => {
  const { focusProps } = useFocus({
    isDisabled: props.$isDisabled,
  });

  const { hoverProps, isHovered } = useHover({
    isDisabled: props.$isDisabled,
  });

  const { pressProps, isPressed } = usePress({
    isDisabled: props.$isDisabled,
  });

  const disabledProps = useMemo(() => {
    return {
      "data-disabled": props.$isDisabled,
    };
  }, [props.$isDisabled]);

  return {
    focusProps,
    hoverProps,
    pressProps,
    disabledProps,
    isHovered,
    isPressed,
  };
};
