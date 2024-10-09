"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
export function MultiUIProvider({ 
// multiUIConfig,
children, disableDarkReaderByDeafult = true, }) {
    useEffect(() => {
        if (typeof document !== "undefined") {
            if (disableDarkReaderByDeafult) {
                const findDarkReaderDisableEl = document.querySelector("meta[name=darkreader-lock]");
                if (findDarkReaderDisableEl)
                    return;
                const lock = document.createElement("meta");
                lock.name = "darkreader-lock";
                document.head.appendChild(lock);
            }
        }
    }, []);
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { children: children }) }));
}
//# sourceMappingURL=MultiUIProvider.js.map