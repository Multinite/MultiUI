"use client";
import { useEffect, useRef } from "react";
function useEffectOnce(effect) {
    const ranOnce = useRef(false);
    useEffect(() => {
        if (ranOnce.current)
            return;
        ranOnce.current = true;
        return effect();
    }, []);
}
export default useEffectOnce;
//# sourceMappingURL=useEffectOnce.js.map