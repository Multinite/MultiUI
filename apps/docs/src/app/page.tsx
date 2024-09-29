"use client";

import { useTheme } from "@multinite_official/multiui";
import { RefAttributes, useEffect, useRef } from "react";
import Button from "../multiui/test_button";
import { useFocus, usePress } from "../multiui/test_button/lib/hooks";

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
      console.log(`theme changed:`, themeName);
    });
  }, [addTheme, onThemeChange]);

  const { pressProps } = usePress({
    isDisabled: false,
    onPress: () => {
      console.log("press");
    },
    onPressStart: () => {
      console.log("press start");
    },
    onPressEnd: () => {
      console.log("press end");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5">
      <span className="text-lg text-primary">
        Hello and welcome to the MultiUI docs!
      </span>
      <span className="text-lg bg-primary">
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
      <Button>
        {({ Component, props }) => {
          const ariaProps = aria({ ariaLabel: "Hello World" });
          // const cnProps = className({ $className: "", default_className: "" });

          // console.log(focusProps);

          // const x = { ...props, ...ariaProps, ...cnProps, ...focusProps };
          // const { focusProps } = useFocus({
          //   isDisabled: true,
          //   onFocus: () => {
          //     console.log("focus");
          //   },
          // });

          // console.log(pressProps);

          return (
            <Component {...ariaProps} {...pressProps}>
              Hello World
            </Component>
          );
        }}
      </Button>

      <Button>
        {({ Component, props }) => {
          // const disable_ = disable({ isDisabled: true });
          return <Component>Sup</Component>;
        }}
      </Button>
    </div>
  );
}

const d: RefAttributes<HTMLButtonElement> = {};
