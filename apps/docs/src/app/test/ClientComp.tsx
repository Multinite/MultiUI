"use client";
import { useTheme } from "@multinite_official/multiui";
import { useEffect, useRef } from "react";

function ClientComp(props: any) {
  const { getTheme, setTheme, subscribe } = useTheme("test-theme");
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;
    subscribe((theme) => {
      console.log("theme changed", theme.name);
    });
    setTheme((theme) => {
      return {
        ...theme,
        primary: {
          ...theme.primary,
          DEFAULT: "0, 100%, 50%",
        },
      };
    });
  }, []);

  return props.children;
}

export default ClientComp;
