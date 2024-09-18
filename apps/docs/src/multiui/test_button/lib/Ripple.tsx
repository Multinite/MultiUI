import type { RippleType } from "./use-ripple";
import type { FC } from "react";
import type { HTMLMotionProps } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

export interface RippleProps {
  ripples: RippleType[];
  color?: string;
  motionProps?: HTMLMotionProps<"span">;
  style?: MotionStyle;
  onClear: (key: React.Key) => void;
}

const Ripple: FC<RippleProps> = (props) => {
  const {
    ripples = [],
    motionProps,
    color = "currentColor",
    style,
    onClear,
  } = props;

  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(
          0.01 * ripple.size,
          0.2,
          ripple.size > 100 ? 0.75 : 0.5
        );

        return (
          <LazyMotion key={ripple.key} features={domAnimation}>
            <AnimatePresence mode="popLayout">
              <m.span
                animate={{ transform: "scale(2)", opacity: 0 }}
                className="multiui-ripple"
                exit={{ opacity: 0 }}
                initial={{ transform: "scale(0)", opacity: 0.35 }}
                style={{
                  position: "absolute",
                  backgroundColor: color,
                  borderRadius: "100%",
                  transformOrigin: "center",
                  pointerEvents: "none",
                  overflow: "hidden",
                  inset: 0,
                  zIndex: 0,
                  top: ripple.y,
                  left: ripple.x,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...style,
                }}
                transition={{ duration }}
                onAnimationComplete={() => {
                  onClear(ripple.key);
                }}
                {...motionProps}
              />
            </AnimatePresence>
          </LazyMotion>
        );
      })}
    </>
  );
};

Ripple.displayName = "MultiUI.Ripple";

export default Ripple;

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
