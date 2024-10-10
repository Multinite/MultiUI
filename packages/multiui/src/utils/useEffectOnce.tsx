"use client";
import { useEffect, useRef } from "react";
type CleanupFn = () => void;
function useEffectOnce(effect: () => void | CleanupFn) {
  const ranOnce = useRef(false);
  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;
    return effect();
  }, []);
}

export default useEffectOnce;
