"use client";

import {
  BoxSelection,
  Selectable,
  SelectableGroup,
  Theme,
  useTheme,
} from "@multinite_official/multiui";
import { RefAttributes, useEffect, useRef } from "react";
import Button from "../multiui/test_button";
import { useAria, useFocus, usePress } from "../multiui/test_button/lib/hooks";
import { default_theme, test_theme, test_theme2 } from "./test/themes";
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
    <BoxSelection $boxSelectionId="hi">
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 bg-background text-foreground">
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
            $theme={test_theme}
            $enableBoxSelection={true}
            $themeId="YOOOO"
            className="w-[500px] h-fit border-[3px] border-indigo-500 text-secondary"
            $persistOnLocalstorage
            $boxSelectionOptions={{
              className: "rounded-[6px]",
            }}
          >
            <div className="text-primary ">
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
              <div className="border-[3px] border-yellow-500 selectable box-select:bg-primary text-secondary box-select-by-name-[multiui_default]:!border-green-500">
                Option 2
              </div>
            </SelectableGroup>
            <br />
            <br />
            <div className="relative">
              <Theme
                $theme={[test_theme, test_theme2]}
                $enableBoxSelection={true}
                $themeId="test"
                className="w-full h-[30px] border-[3px] border-indigo-500"
                $persistOnLocalstorage={false}
              >
                <div
                  className=" theme-[multiui_default]:text-white theme-[test_theme2]:bg-white theme-[test_theme2]:text-black bg-primary-500/45 via-red-500 via-primary/20"
                  data-exclsion-zone
                >
                  if your system is light, I am light. if your system is dark, I
                  am dark.
                </div>
              </Theme>
            </div>
          </Theme>
        </div>
        <div className="w-full h-fit border-[3px] border-indigo-500 mt-10">
          <Theme
            $theme={test_theme2}
            $enableBoxSelection={true}
            $themeId="test2"
            className="w-full h-[100px] select-none border-[3px] border-indigo-500 bg-primary/20"
            $persistOnLocalstorage={false}
          >
            <div className="">TEST</div>

            <Theme
              $theme={default_theme}
              $enableBoxSelection={true}
              $themeId="test3"
              className="w-full h-[80px] bg-black/50 border-[3px] border-indigo-500"
              $persistOnLocalstorage={false}
            >
              <div className="">TEST</div>
            </Theme>
          </Theme>
        </div>
        {/* <Theme
        $theme={test_theme}
        $enableBoxSelection={true}
        $themeId="sup1"
        className="w-[500px] h-fit min-h-[100px] border-[3px] border-indigo-500"
        $persistOnLocalstorage
        $boxSelectionOptions={{
          className: "rounded-[6px]",
        }}
      >
        sup1
        <Theme
          $theme={test_theme}
          $enableBoxSelection={true}
          $themeId="sup2"
          className="w-[500px] h-fit min-h-[100px] border-[3px] border-indigo-500"
          $persistOnLocalstorage
          $boxSelectionOptions={{
            className: "rounded-[6px]",
          }}
          id="HI"
        >
          <div className="w-full h-full">sup2</div>
        </Theme>
      </Theme> */}

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
        {/* <Button>Test</Button> */}
      </div>
    </BoxSelection>
  );
}

const d: RefAttributes<HTMLButtonElement> = {};
