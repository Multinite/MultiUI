"use client";
import { ThemeT } from "../types";
import setThemeScript from "./script";
import { Schemes } from "./Theme";

export function ScriptComponnet(args: Parameters<typeof setThemeScript>[0]) {
  return (
    <script
      id={`multiui-theme-script-${args.themeId}`}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(()=>{${
          setThemeScript.toString() + `;setThemeScript(${JSON.stringify(args)})`
        }})()`,
      }}
    ></script>
  );
}
