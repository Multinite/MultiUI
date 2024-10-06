/**
 * THIS CODE IS A COPY OF THE usehooks-ts REPOSITORY
 * https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useLocalStorage/useLocalStorage.ts
 * IT HAS BEEN MODIFIED TO WORK WITH MULTIUI
 * THE ORIGINAL CODE IS LICENSED UNDER MIT
 * https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE
 */
import { useCallback, useEffect, useState } from "react";
import { useEventCallback } from "./useEventCallback.js";
import { useEventListener } from "./useEventListener.js";
const IS_SERVER = typeof window === "undefined";
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
export function useLocalStorage(key, initialValue, options = {}) {
    const { initializeWithValue = true } = options;
    const serializer = useCallback((value) => {
        if (options.serializer) {
            return options.serializer(value);
        }
        return JSON.stringify(value);
    }, [options]);
    const deserializer = useCallback((value) => {
        if (options.deserializer) {
            return options.deserializer(value);
        }
        // Support 'undefined' as a value
        if (value === "undefined") {
            return undefined;
        }
        const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;
        let parsed;
        try {
            parsed = JSON.parse(value);
        }
        catch (error) {
            console.error("Error parsing JSON:", error);
            return defaultValue; // Return initialValue if parsing fails
        }
        return parsed;
    }, [options, initialValue]);
    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = useCallback(() => {
        const initialValueToUse = initialValue instanceof Function ? initialValue() : initialValue;
        // Prevent build error "window is undefined" but keep working
        if (IS_SERVER) {
            return initialValueToUse;
        }
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? deserializer(raw) : initialValueToUse;
        }
        catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValueToUse;
        }
    }, [initialValue, key, deserializer]);
    const [storedValue, setStoredValue] = useState(() => {
        if (initializeWithValue) {
            return readValue();
        }
        return initialValue instanceof Function ? initialValue() : initialValue;
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = useEventCallback((value) => {
        // Prevent build error "window is undefined" but keeps working
        if (IS_SERVER) {
            console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
        }
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(readValue()) : value;
            // Save to local storage
            window.localStorage.setItem(key, serializer(newValue));
            // Save state
            setStoredValue(newValue);
            // We dispatch a custom event so every similar useLocalStorage hook is notified
            window.dispatchEvent(new StorageEvent("local-storage", { key }));
        }
        catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    });
    const removeValue = useEventCallback(() => {
        // Prevent build error "window is undefined" but keeps working
        if (IS_SERVER) {
            console.warn(`Tried removing localStorage key “${key}” even though environment is not a client`);
        }
        const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;
        // Remove the key from local storage
        window.localStorage.removeItem(key);
        // Save state with default value
        setStoredValue(defaultValue);
        // We dispatch a custom event so every similar useLocalStorage hook is notified
        window.dispatchEvent(new StorageEvent("local-storage", { key }));
    });
    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    const handleStorageChange = useCallback((event) => {
        if (event.key && event.key !== key) {
            return;
        }
        setStoredValue(readValue());
    }, [key, readValue]);
    // this only works for other documents, not the current one
    useEventListener("storage", handleStorageChange);
    // this is a custom event, triggered in writeValueToLocalStorage
    // See: useLocalStorage()
    useEventListener("local-storage", handleStorageChange);
    return [storedValue, setValue, removeValue];
}
//# sourceMappingURL=useLocalStorage.js.map