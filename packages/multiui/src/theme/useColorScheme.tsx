"use client";
import { useEffect, useState } from "react";

/**
 * Get the user's preferred color scheme from the browser.
 */
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<undefined | "dark" | "light">(
    undefined
  );

  useEffect(() => {
    // Check if the browser supports matchMedia
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Set the initial value
      setColorScheme(mediaQuery.matches ? "dark" : "light");

      // Add event listener for changes
      const handler = (e: MediaQueryListEvent) =>
        setColorScheme(e.matches ? "dark" : "light");

      // Use addListener or addEventListener, depending on browser support
      if (mediaQuery.addListener) {
        mediaQuery.addListener(handler);
      } else {
        mediaQuery.addEventListener("change", handler);
      }

      // Clean up the event listener
      return () => {
        if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handler);
        } else {
          mediaQuery.removeEventListener("change", handler);
        }
      };
    } else {
      // Fallback for browsers that don't support matchMedia
      // You could use other methods here to determine a default theme
      setColorScheme(undefined);
    }
  }, []);

  return colorScheme;
}

/**
 * Get the user's preferred color scheme from the browser synchronously, without React states.
 */
export function getColorSchemeSync() {
  if (typeof window != "undefined" && window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "dark" : "light";
  } else {
    return "dark";
  }
}
