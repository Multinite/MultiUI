import { type ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";

export function MultiUIProvider({
  // multiUIConfig,
  children,
}: {
  // multiUIConfig: MultiUIConfig;
  children?: ReactNode;
}) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
