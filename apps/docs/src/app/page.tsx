"use client";

import {
  Selectable,
  SelectableGroup,
  Theme,
  useTheme,
} from "@multinite_official/multiui";
import { ReactNode, RefAttributes, useEffect, useRef } from "react";
import Button from "../multiui/test_button";
import { useAria, useFocus, usePress } from "../multiui/test_button/lib/hooks";
import { default_theme, test_theme } from "./test/themes";

export default function Home() {
  const { setTheme, theme, subscribe } = useTheme("default", {
    rerenderOnThemeChange: true,
  });
  const rerenders = useRef(0);
  rerenders.current++;
  console.log("Rerender:", rerenders.current);

  useEffect(() => {
    return subscribe((theme) => {
      console.log(`theme changed:`, theme.name);
    });
  }, [subscribe]);

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
        Theme: <b>{theme.name}</b>
      </h1>
      <button
        className="selectable select:bg-primary select:text-foreground"
        onClick={() => setTheme(test_theme)}
      >
        Click to toggle theme (0)
      </button>
      <button
        className="selectable select:bg-secondary select:text-foreground"
        onClick={() => setTheme(default_theme)}
      >
        Click to toggle theme (1)
      </button>
      <div className="relative mt-32 border border-red-500 select-none w-fit h-fit">
        <Theme
          theme={test_theme}
          enableBoxSelection={true}
          themeId="YOOOO"
          defineThemeStylesInline={false}
          className="w-[500px] h-[300px] "
        >
          <div className="text-primary">
            Within this box, is a separate theme container!
          </div>
          <br />
          <Selectable specificThemeId="default">
            <div className="border border-yellow-500 box-select:bg-primary w-fit">
              I am only selectable by the purple theme!
            </div>
          </Selectable>
          <Selectable specificThemeId="YOOOO">
            <div className="border border-yellow-500 box-select:bg-primary w-fit">
              I am only selectable by the pink theme!
            </div>
          </Selectable>
          <Selectable>
            <div className="border border-yellow-500 box-select:bg-primary w-fit">
              I am selectable by ALL themes!
            </div>
          </Selectable>
          <br />
          <br />
          <h1>Below is a grouped selectable</h1>
          <SelectableGroup
            className="flex items-center justify-center gap-5"
            // specificThemeId="default"
          >
            <div className="border border-yellow-500 selectable box-select:bg-primary text-secondary">
              Option 1
            </div>
            <div className="border border-yellow-500 selectable box-select:bg-primary text-secondary">
              Option 2
            </div>
          </SelectableGroup>
          <br />
          <br />
          <Selectable>
            <div className="box-select-by-id-[default]:!border-red-500 border-[6px] box-select:!border-blue-500 border-yellow-500 w-fit">
              red for purple, blue for pink
            </div>
          </Selectable>
        </Theme>
      </div>

      <hr className="my-5" />
      {/* <Button>
        {({ Base, props, Video }) => {
          <Base {...props}>hey</Base>;

          <Video></Video>

          const ariaProps = useAria({ ariaLabel: "Hello World" });
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
            <Base {...ariaProps} {...pressProps}>
              Hello World
            </Base>
          );
        }}
      </Button> */}
      <Button>Test</Button>
    </div>
  );
}

const d: RefAttributes<HTMLButtonElement> = {};
