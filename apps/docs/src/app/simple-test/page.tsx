"use client";

import { useTheme } from "@multinite_official/multiui";

function Page() {
  const theme = useTheme();

  return (
    <div className="flex items-center justify-center w-screen h-screen gap-4 whitespace-pre-wrap text-wrap">
      <span>Hello World!</span>
      <br />
      <span className="text-primary">Hello World in Primary</span>
      <br />
      <span className="text-secondary">Hello World in Secondary</span>
    </div>
  );
}

export default Page;
