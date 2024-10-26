/**
 * THIS CODE IS A COPY OF THE usehooks-ts REPOSITORY
 * https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.ts
 * IT HAS BEEN MODIFIED TO WORK WITH MULTIUI
 * THE ORIGINAL CODE IS LICENSED UNDER MIT
 * https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE
 */
import { useLayoutEffect } from "react";
/**
 * Custom hook that uses either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
 * @param {Function} effect - The effect function to be executed.
 * @param {Array<any>} [dependencies] - An array of dependencies for the effect (optional).
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
 * @example
 * ```tsx
 * useIsomorphicLayoutEffect(() => {
 *   // Code to be executed during the layout phase on the client side
 * }, [dependency1, dependency2]);
 * ```
 */
export declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;