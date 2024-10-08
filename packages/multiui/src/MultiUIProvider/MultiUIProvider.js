import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ThemeProvider } from "../theme/ThemeProvider";
export function MultiUIProvider({ 
// multiUIConfig,
children, disableDarkReaderByDeafult = true, }) {
    if (typeof document !== "undefined") {
        if (disableDarkReaderByDeafult) {
            const lock = document.createElement("meta");
            lock.name = "darkreader-lock";
            document.head.appendChild(lock);
        }
    }
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { children: children }) }));
}
//# sourceMappingURL=MultiUIProvider.js.map