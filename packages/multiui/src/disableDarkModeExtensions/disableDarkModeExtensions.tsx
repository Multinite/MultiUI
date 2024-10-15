"use client";
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
export const disableDarkModeMeta = {
  other: {
    "darkreader-lock": "true",
  },
};


export function DisableDarkModeExtensions({
  children,
}: {
  children: ReactNode;
}) {
  if (typeof document != "undefined") {
    document.body.style.setProperty(`--ml-ignore`, "true");
  }
  return children;
}
