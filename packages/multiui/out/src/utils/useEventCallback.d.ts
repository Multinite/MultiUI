/**
 * Custom hook that creates a memoized event callback.
 * @template Args - An array of argument types for the event callback.
 * @template R - The return type of the event callback.
 * @param {(...args: Args) => R} fn - The callback function.
 * @returns {(...args: Args) => R} A memoized event callback function.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-event-callback)
 * @example
 * ```tsx
 * const handleClick = useEventCallback((event) => {
 *   // Handle the event here
 * });
 * ```
 */
export declare function useEventCallback<Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R;
export declare function useEventCallback<Args extends unknown[], R>(fn: ((...args: Args) => R) | undefined): ((...args: Args) => R) | undefined;
