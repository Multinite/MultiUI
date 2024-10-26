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
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
// export const cn_separator = "➜" as const;
export const cn_separator = "•";
/**
 * ## DO NOT USE, THIS IS FOR INTERNAL USE ONLY!
 *
 * ### Intended use:
 * Anything before the separator is internal classes, and anything after is user passed classes.
 *
 * @example
 * ```ts
 * const classes = __seperateClasses(defaultClasses, userPassedClasses);
 * ```
 * ## OR
 * ```ts
 * const defaultClasses = "bg-red-500";
 * const userPassedClasses = "bg-blue-500";
 *
 * const classes = __seperateClasses((cn) => [cn(defaultClasses), cn(userPassedClasses)]);
 * ```
 */
export function __seperateClasses(cb_or_class, afterClasses = "") {
    if (typeof cb_or_class === "function") {
        const [before, after] = cb_or_class(cn);
        if (typeof after === "string"
            ? after.trim().length === 0
            : cn(after).trim().length === 0)
            return cn(before);
        return cn(typeof before === "string" ? before : cn(before), cn_separator, typeof after === "string" ? after : cn(after));
    }
    else {
        return cn(cb_or_class, cn_separator, afterClasses);
    }
}
//# sourceMappingURL=cn.js.map