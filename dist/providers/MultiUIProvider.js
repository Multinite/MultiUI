"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from "react";
const MultiUIContext = createContext({});
function MultiUIProvider({ children }) {
    return (_jsx(MultiUIContext.Provider, { value: {}, children: children }));
}
export default MultiUIProvider;
//# sourceMappingURL=MultiUIProvider.js.map