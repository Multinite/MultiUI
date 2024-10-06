import type { Dispatch, SetStateAction } from "react";
declare global {
    interface WindowEventMap {
        "local-storage": CustomEvent;
    }
}
/**
 * Options for customizing the behavior of serialization and deserialization.
 * @template T - The type of the state to be stored in local storage.
 */
type UseLocalStorageOptions<T> = {
    /** A function to serialize the value before storing it. */
    serializer?: (value: T) => string;
    /** A function to deserialize the stored value. */
    deserializer?: (value: string) => T;
    /**
     * If `true` (default), the hook will initialize reading the local storage. In SSR, you should set it to `false`, returning the initial value initially.
     * @default true
     */
    initializeWithValue?: boolean;
};
/**
 * Custom hook that uses the [`localStorage API`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist state across page reloads.
 * @template T - The type of the state to be stored in local storage.
 * @param {string} key - The key under which the value will be stored in local storage.
 * @param {T | (() => T)} initialValue - The initial value of the state or a function that returns the initial value.
 * @param {UseLocalStorageOptions<T>} [options] - Options for customizing the behavior of serialization and deserialization (optional).
 * @returns {[T, Dispatch<SetStateAction<T>>, () => void]} A tuple containing the stored value, a function to set the value and a function to remove the key from storage.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-local-storage)
 * @example
 * ```tsx
 * const [count, setCount, removeCount] = useLocalStorage('count', 0);
 * // Access the `count` value, the `setCount` function to update it and `removeCount` function to remove the key from storage.
 * ```
 */
export declare function useLocalStorage<T>(key: string, initialValue: T | (() => T), options?: UseLocalStorageOptions<T>): [T, Dispatch<SetStateAction<T>>, () => void];
export {};
