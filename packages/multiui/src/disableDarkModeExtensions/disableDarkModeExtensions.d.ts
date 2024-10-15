import type { ReactNode } from "react";
/**
 * Pass this object to the NextJS metadata export.
 * We intend to collect the most common dark mode extensions and disable them using meta tags.
 *
 * @example
 * ```ts
 * export const metadata: Metadata = {
 *   title: "Some Title!",
 *   description: "Some text",
 *   ...disableDarkModeMeta,
 * };
 * ```
 */
export declare const disableDarkModeMeta: {
    other: {
        "darkreader-lock": string;
    };
};
export declare function DisableDarkModeExtensions({ children, }: {
    children: ReactNode;
}): ReactNode;
