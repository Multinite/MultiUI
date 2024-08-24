"use client";
import { cn } from "@multinite_official/multiui";
import { type FC, type ReactNode, useState } from "react";

type ButtonProps = {
  children: CustomButtonFn | ReactNode;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  /**
   * ![Image of demo-code](https://media.discordapp.net/attachments/1223967689127497779/1276393976026628217/image.png?ex=66c95e06&is=66c80c86&hm=05c977b86bc4289959c04e5bb175471efa09c321e6a21ef8f86169537b80c3d3&=&format=webp&quality=lossless&width=1100&height=340|width=569.6|height=68)
   *
   * ```tsx
   * <Button className={({ classes, cn }) => cn(classes, "your TW classes")}>
   * ㅤHello, World!
   * </Button>
   * ```
   *
   */
  className?: (props: {
    /**
     * The default classes passed to the button.
     */
    classes: string;
    cn: (...classnames: string[]) => string;
  }) => string;
};

type CustomButtonProps = {
  isHover: boolean;
  isActive: boolean;
  isPressed: boolean;
  /**
   * ![Base button Image](https://media.discordapp.net/attachments/1223967689127497779/1274656680809988146/NniZt6z.png?ex=66c30c0a&is=66c1ba8a&hm=3bf772e2058cb42012e1b9152121af5f2428f53e03b43704016651fd042794a0&=&format=webp&quality=lossless&width=636&height=256|width=145.2|height=100.7)
   * @returns
   */
  Base: FC<{
    /**
     * ![Image of demo-code](https://media.discordapp.net/attachments/1223967689127497779/1276332932067496089/image.png?ex=66c9252c&is=66c7d3ac&hm=146e20173cacb063d71f9dc927ae32059a136b6d4bd1d8ed68284a25e7ea2f5b&=&format=webp&quality=lossless&width=2880&height=1246|width=569.6|height=246.4)
     *
     * ```tsx
     * <Button>
     * ㅤ{({ Base }) => (
     * ㅤㅤㅤ<Base className={({ classes, cn }) => cn(classes, "text-primary")}>Hello World!</Base>
     * ㅤ)}
     * </Button>
     * ```
     *
     */
    className: (props: {
      /**
       * The default classes passed to the button.
       */
      classes: string;
      cn: (...classnames: string[]) => string;
    }) => string;
    children: Iterable<ReactNode> | JSX.Element;
  }>;
  cn: (...classnames: string[]) => string;
};
type CustomButtonFn = (props: CustomButtonProps) => ReactNode;

/**
 * ![Button Image](https://media.discordapp.net/attachments/1223967689127497779/1274656680809988146/NniZt6z.png?ex=66c30c0a&is=66c1ba8a&hm=3bf772e2058cb42012e1b9152121af5f2428f53e03b43704016651fd042794a0&=&format=webp&quality=lossless&width=636&height=256|width=145.2|height=100.7)
 */
export default function Button(
  props: ButtonProps
): Iterable<ReactNode> | JSX.Element {
  const { children, isDisabled, isIconOnly } = props;
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  if (typeof children === "function") {
    return children({
      Base: ({ className, children }) => {
        return (
          <button
            className={className({
              classes: cn(
                "flex items-center justify-center w-8 h-8 bg-slate-500 ",
                isDisabled && "cursor-default",
                isIconOnly && "w-6 h-6"
              ),
              cn,
            })}
          >
            {children}
          </button>
        );
      },
      cn,
      isActive,
      isHover,
      isPressed,
    }) as Iterable<ReactNode> | JSX.Element;
  }

  return (
    <button
      className={cn(
        "flex items-center justify-center w-8 h-8 bg-slate-500 ",
        isDisabled && "cursor-default",
        isIconOnly && "w-6 h-6"
      )}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
}
