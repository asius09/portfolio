import { motion, MotionProps } from "motion/react";
import React from "react";

type MotionTag = keyof typeof motion;

type AnimateProps = MotionProps & {
  children: React.ReactNode;
  as?: MotionTag;
  defaultInitial?: MotionProps["initial"];
  defaultAnimate?: MotionProps["animate"];
  defaultTransition?: MotionProps["transition"];
};

/**
 * A flexible Motion wrapper component to avoid repeating motion boilerplate.
 * You can override initial, animate, and transition per usage, or set defaults for a group.
 * Usage:
 * <Animate initial={...} animate={...} transition={...}><div>...</div></Animate>
 * <Animate defaultInitial={...} defaultAnimate={...} defaultTransition={...}><div>...</div></Animate>
 */
export function Animate({
  children,
  initial,
  animate,
  transition,
  as = "div",
  defaultInitial = { y: 12, opacity: 0, filter: "blur(8px)" },
  defaultAnimate = { y: 0, opacity: 1, filter: "blur(0px)" },
  defaultTransition = { duration: 0.6, ease: "easeOut" },
  ...rest
}: AnimateProps) {
  const MotionComponent =
    (motion as unknown as Record<string, React.ElementType>)[as] || motion.div;

  return (
    <MotionComponent
      initial={initial ?? defaultInitial}
      animate={animate ?? defaultAnimate}
      transition={transition ?? defaultTransition}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
