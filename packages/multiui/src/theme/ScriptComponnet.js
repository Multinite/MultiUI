"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import setThemeScript from "./script";
export function ScriptComponnet(args) {
    return (_jsx("script", { id: `multiui-theme-script-${args.themeId}`, suppressHydrationWarning: true, dangerouslySetInnerHTML: {
            __html: `(()=>{${setThemeScript.toString() + `;setThemeScript(${JSON.stringify(args)})`}})()`,
        } }));
}
//# sourceMappingURL=ScriptComponnet.js.map