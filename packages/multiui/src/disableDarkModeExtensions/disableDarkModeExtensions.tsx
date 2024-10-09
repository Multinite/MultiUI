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
export const disableDarkModeExtensions = {
  other: {
    "darkreader-lock": "true",
  },
};

/**
 * This is the same as the `disableDarkModeExtensions` object, but as a JSX element.
 */
export const disableModeExtensions_metaJSX = (
  <>
    <meta name="darkreader-lock" />
  </>
);
