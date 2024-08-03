"use client";

import { useTheme } from "@multinite_official/multiui";
import { multiUI_defaultTheme } from "@multinite_official/multiui/providers/MultiUIProvider";
import { useEffect, useRef } from "react";

export default function Home() {
  const { setTheme, currentTheme, themes, addTheme, onThemeChange } =
    useTheme();
  const hasCalled = useRef(false);
  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;
    addTheme(multiUI_defaultTheme);
    onThemeChange((themeName, theme) => {
      console.log(`themeName`, themeName);
      console.log(`theme`, theme);
    });
  }, [addTheme]);

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-5 text-primary flex-col">
      <span className="text-lg">Hello and welcome to the MultiUI docs!</span>
      <span className="text-lg text-secondary">
        Hello and welcome to the MultiUI docs!
      </span>
      <button className="focus:outline-focus">Hello, World!</button>
      <h1>Theme: {currentTheme}</h1>
      <button className="" onClick={() => setTheme(themes[0]!)}>
        Click to toggle theme (0)
      </button>
      <button className="" onClick={() => setTheme(themes[1]!)}>
        Click to toggle theme (1)
      </button>
    </div>
  );
}
