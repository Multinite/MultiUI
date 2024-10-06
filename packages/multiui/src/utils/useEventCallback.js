/**
 * THIS CODE IS A COPY OF THE usehooks-ts REPOSITORY
 * https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useEventCallback/useEventCallback.ts
 * IT HAS BEEN MODIFIED TO WORK WITH MULTIUI
 * THE ORIGINAL CODE IS LICENSED UNDER MIT
 * https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE
 */
import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsormorphicLayoutEffect.js';
export function useEventCallback(fn) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });
    useIsomorphicLayoutEffect(() => {
        ref.current = fn;
    }, [fn]);
    return useCallback((...args) => ref.current?.(...args), [ref]);
}
//# sourceMappingURL=useEventCallback.js.map