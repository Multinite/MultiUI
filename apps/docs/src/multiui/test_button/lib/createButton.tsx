"use client";
import { cn } from "@multinite_official/multiui";
import { createComponent } from "@multinite_official/multiui/createComponent";
import { FC, ReactNode, useMemo } from "react";
import { getProps } from "./getProps";
import { getColorClass, getRadiusClass, getSizeClass } from "./styling";
import { getButtonHelperFunctions } from "./helperFn";
import { ButtonProps, HelperFunctions } from "./ButtonTypes";

export const createButton = createComponent<
  ButtonProps,
  HTMLButtonElement,
  HelperFunctions
>({
  name: "Button",
  createFn: ({ props, classNameSeperator, createSlot, createHooks }) => {
    const { children, ref, $className, ...rest } = props;
    type ButtonProps = typeof props;

    const {
      focusProps,
      hoverProps,
      pressProps,
      disabledProps,
      isHovered,
      isPressed,
    } = getProps(props);

    const base_classes = useMemo(() => {
      return cn(
        `text-nowrap px-4 py-2 appearance-none box-border select-none outline-none transition-all ease-in-out relative overflow-hidden outline-none `,
        `data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50`,
        `data-[pressed=true]:scale-[0.97]`,
        `motion-reduce:transition-none`,
        getSizeClass(props.$size ?? "md", props.$isIconOnly ?? false),
        getColorClass(props.$color ?? "primary"),
        getRadiusClass(props.$radius ?? "sm")
      );
    }, [props.$size, props.$isIconOnly, props.$radius, props.$color]);

    const className = $className
      ? typeof $className === "function"
        ? $className({ cn, classes: base_classes })
        : $className
      : base_classes;

    // TODO: RETHINK THIS CLASSNAME STUFF< Its bad DX rn

    const helperFunctions = getButtonHelperFunctions({
      base_classes,
      focusProps,
      hoverProps,
      pressProps,
      disabledProps,
    });

    const { base, getBaseClasses } = createSlot<
      "base",
      {
        $isDisabled?: boolean;
      }
    >("base");

    const Base: FC<ButtonProps & { children?: ReactNode }> = (args) => {
      args.$className;
      return (
        <button ref={ref} {...args} slot={base}>
          {args.children}
        </button>
      );
    };

    const hooks = helperFunctions;

    if (typeof children === "function") {
      const Component = children(
        { Component: Base, props: props },
        createHooks(hooks)
      );

      return {
        Component: Component,
        hooks,
      };
    }

    return {
      Component: (
        <Base
          $className={classNameSeperator(() => [
            cn(
              getBaseClasses({ $isDisabled: props.$isDisabled }),
              base_classes
            ),
            className,
          ])}
          {...rest}
        >
          {children}
        </Base>
      ),
      hooks,
    };
  },
});
