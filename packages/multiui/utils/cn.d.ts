import type { ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export declare const cn_separator: "•";
type beforeSeparator = string | string[];
type afterSeparator = string | string[];
/**
 * ## DO NOT USE, THIS IS FOR INTERNAL USE ONLY!
 *
 * ### Intended use:
 * Anything before the separator is internal classes, and anything after is user passed classes.
 *
 * @example
 * ```ts
 * const defaultClasses = "bg-red-500";
 * const userPassedClasses = "bg-blue-500";
 *
 * const classes = __cn_separator((cn) => [cn(defaultClasses), cn(userPassedClasses)]);
 * ```
 */
export declare function __cn_separator(cb: (cn_: typeof cn) => [beforeSeparator, afterSeparator]): string;
export {};
