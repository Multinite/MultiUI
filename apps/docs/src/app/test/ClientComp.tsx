"use client";
import { useTheme } from "@multinite_official/multiui";
import { Theme } from "@multinite_official/multiui";
import { useRef, Fragment } from "react";
import { default_theme } from "./themes";

function ClientComp(props: any) {
  const ranOnce = useRef(false);
  const { getTheme } = useTheme("default");

  console.log(getTheme());

  return (
    <Fragment>
      <Theme
        theme={{
          ...default_theme,
          primary: { ...default_theme.primary, DEFAULT: "0, 100%, 50%" },
        }}
        themeId={"test-2"}
      >
        <div className="flex items-center justify-center w-32 h-32 text-sm text-center bg-red-500 border-2 border-red-500 bg-primary">
          Server rendered red?
        </div>
      </Theme>
      {props.children}
    </Fragment>
  );
}

export default ClientComp;
