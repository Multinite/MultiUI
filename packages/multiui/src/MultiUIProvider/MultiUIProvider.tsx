import type { ReactNode } from "react";
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
  if (typeof document !== "undefined") {
    if (disableDarkReaderByDeafult) {
      const lock = document.createElement("meta");
      lock.name = "darkreader-lock";
      document.head.appendChild(lock);
    }
  }

  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
