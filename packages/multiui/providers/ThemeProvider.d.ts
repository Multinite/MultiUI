import { type ReactNode } from "react";
import type { Theme as ThemeT } from "../types/MultiUIConfig";
export declare function useTheme(themeId: string): {
    setTheme(callback: (theme: ThemeT) => ThemeT): void;
    subscribe: (cb: (theme: ThemeT) => void) => () => void;
    getTheme: () => ThemeT;
};
export default function ThemeProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
