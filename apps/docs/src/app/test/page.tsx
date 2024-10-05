"use client";

import {Theme} from "@multinite_official/multiui";
import {ThemeProvider} from "@multinite_official/multiui";
import ClientComp from "./ClientComp";
import { default_theme } from "./themes";

function Page() {
  return (
    <div className="flex w-screen h-screen gap-10">
      <ThemeProvider>
        <Theme theme={default_theme} themeId={"default"}>
          <div className="flex items-center justify-center w-32 h-32 text-sm text-center border-2 border-red-500 bg-primary">
            server rendered purple?
          </div>
        </Theme>

        <ClientComp></ClientComp>
      </ThemeProvider>
    </div>
  );
}

export default Page;
