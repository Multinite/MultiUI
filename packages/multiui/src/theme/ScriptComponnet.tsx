"use client";
import setThemeScript from "./script";

export function ScriptComponnet(args: Parameters<typeof setThemeScript>[0]) {
  return (
    <script
      id={`multiui-theme-script-${args.themeId}`}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(()=>{(${
          setThemeScript.toString() + `)(${JSON.stringify(args)})`
        }})()`,
      }}
    ></script>
  );
}
