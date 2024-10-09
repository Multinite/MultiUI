"use client";
import { useEffect, type ReactNode } from "react";
import type { MultiUIConfig } from "../types";
import { ThemeProvider } from "../theme/ThemeProvider";

export function MultiUIProvider({
  // multiUIConfig,
  children,
  disableDarkReaderByDeafult = true,
}: {
  // multiUIConfig: MultiUIConfig;
  children?: ReactNode;
  /**
   * We allow you to enable or disable the `dark-reader` extension.
   * By default, we disable dark reader since they often don't play well with theme systems.
   *
   * @see Dark-reader {@link https://darkreader.org/}
   * @see MultiUI disable dark reader documentation {@link https://multiui.org/docs/dark-reader}
   *
   * @default true
   */
  disableDarkReaderByDeafult?: boolean;
}) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (disableDarkReaderByDeafult) {
        const findDarkReaderDisableEl = document.querySelector(
          "meta[name=darkreader-lock]"
        );
        if (findDarkReaderDisableEl) return;
        const lock = document.createElement("meta");
        lock.name = "darkreader-lock";
        document.head.appendChild(lock);
      }
    }
  }, []);

  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
