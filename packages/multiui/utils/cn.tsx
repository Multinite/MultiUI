import type { ClassValue } from "clsx";
import clsx from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const COMMON_UNITS = ["small", "medium", "large"];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      opacity: ["disabled"],
      spacing: ["divider"],
      borderWidth: COMMON_UNITS,
      borderRadius: COMMON_UNITS,
    },
    classGroups: {
      shadow: [{ shadow: COMMON_UNITS }],
      "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
      "bg-image": ["bg-stripe-gradient"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const cn_seperator = cn("➜");
export const cn_seperator = cn("•");

type beforeSeperator = string;
type afterSeperator = string;

/**
 * ## DO NOT USE, THIS IS FOR INTERNAL USE ONLY!
 *
 * ### Intended use:
 * Anything before the seperator is internal classes, and anything after is user passed classes.
 *
 * @example
 * ```ts
 * const defaultClasses = "bg-red-500";
 * const userPassedClasses = "bg-blue-500";
 *
 * const classes = __cn_seperator((cn) => [cn(defaultClasses), cn(userPassedClasses)]);
 * ```
 */
export function __cn_seperator(
  cb: (cn_: typeof cn) => [beforeSeperator, afterSeperator]
) {
  const [before, after] = cb(cn);
  return cn(before, cn_seperator, after);
}
