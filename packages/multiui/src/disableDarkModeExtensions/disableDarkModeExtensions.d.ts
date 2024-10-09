/**
 * Pass this object to the NextJS metadata export.
 * We intend to collect the most common dark mode extensions and disable them using meta tags.
 *
 * @example
 * ```ts
 * export const metadata: Metadata = {
 *   title: "MultiUI Docs",
 *   description: "The MultiUI documentation.",
 *   ...disableDarkReaderMeta,
 * };
 * ```
 */
export declare const disableDarkModeExtensions: {
    other: {
        "darkreader-lock": string;
    };
};
/**
 * This is the same as the `disableDarkModeExtensions` object, but as a JSX element.
 */
export declare const disableModeExtensions_metaJSX: import("react/jsx-runtime").JSX.Element;
