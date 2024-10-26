import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ThemeProvider } from "../theme/ThemeProvider";
export function MultiUIProvider({ 
// multiUIConfig,
children, }) {
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { children: children }) }));
}
//# sourceMappingURL=MultiUIProvider.js.map