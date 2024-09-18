"use client";

import { useTheme } from "@multinite_official/multiui";
import { multiUI_defaultTheme } from "@multinite_official/multiui/providers/MultiUIProvider";
import { useEffect, useRef } from "react";
import Button from "../multiui/test_button";

export default function Home() {
  const { setTheme, currentTheme, themes, addTheme, onThemeChange } =
    useTheme();
  const hasCalled = useRef(false);
  const rerenders = useRef(0);
  rerenders.current++;
  console.log("Rerender:", rerenders.current);
  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;
    onThemeChange((themeName, theme) => {
    });
  }, [addTheme, onThemeChange]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5">
      <span className="text-lg text-primary">
        Hello and welcome to the MultiUI docs!
      </span>
      <span className="text-lg text-secondary">
        Hello and welcome to the MultiUI docs!
      </span>
      <h1>
        Theme: <b>{currentTheme}</b>
      </h1>
      <button className="" onClick={() => setTheme(themes[0]!)}>
        Click to toggle theme (0)
      </button>
      <button className="" onClick={() => setTheme(themes[1]!)}>
        Click to toggle theme (1)
      </button>
      <hr className="my-5" />
      <Button $className="Hello World!" slot="hi" className="hi" >Hi</Button>
    </div>
  );
}
