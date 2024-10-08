import type { ReactNode } from "react";
export declare function MultiUIProvider({ children, disableDarkReaderByDeafult, }: {
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
}): import("react/jsx-runtime").JSX.Element;
