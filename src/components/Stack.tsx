"use client";
import React, { useRef, useEffect, useState } from "react";
import { stackItems } from "@/data/techStack";
import { motion, Transition, useAnimation } from "motion/react";

// Animation configs (inspired by About.tsx, but for horizontal stretch)
const fadeInUpInitial = {
  y: 12,
  opacity: 0,
  filter: "blur(8px)",
};
const fadeInUpAnimate = {
  y: 0,
  opacity: 1,
  filter: "blur(0px)",
};
const fadeInUpSpring: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
  type: "spring" as any,
  stiffness: 80,
};

// For the stack list: horizontal "stretch" animation
const listInitial = {
  scaleX: 0,
  opacity: 0,
  originX: 0, // stretch from left
  filter: "blur(8px)",
};
const listAnimate = {
  scaleX: 1,
  opacity: 1,
  originX: 0,
  filter: "blur(0px)",
};
const listTransition: Transition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1],
  type: "spring" as any,
  stiffness: 60,
};

// Utility to check if element is in viewport
function isElementInViewport(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export const Stack = () => {
  // Stagger for each stack item
  const baseDelay = 0.18;
  const step = 0.09;

  // Animation controls for section and children
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!hasAnimated && isElementInViewport(sectionRef.current)) {
        controls.start("animate");
        setHasAnimated(true);
      }
    }
    // Run on mount in case already in view
    handleScroll();
    if (!hasAnimated) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated, controls]);

  return (
    <motion.section
      ref={sectionRef}
      id="stack-section"
      className="mt-12 w-full"
      aria-labelledby="stack-heading"
      tabIndex={-1}
      role="region"
      initial="initial"
      animate={controls}
      variants={{
        initial: fadeInUpInitial,
        animate: fadeInUpAnimate,
      }}
      transition={{
        ...fadeInUpSpring,
        delay: baseDelay,
      }}
    >
      <motion.h2
        id="stack-heading"
        className="text-2xl font-semibold text-white"
        tabIndex={0}
        initial="initial"
        animate={controls}
        variants={{
          initial: fadeInUpInitial,
          animate: fadeInUpAnimate,
        }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 1,
        }}
      >
        Stacks
      </motion.h2>
      <motion.ul
        className="mt-3 flex flex-wrap gap-4"
        aria-label="Technology stack"
        role="list"
        initial="initial"
        animate={controls}
        variants={{
          initial: listInitial,
          animate: listAnimate,
        }}
        transition={{
          ...listTransition,
          delay: baseDelay + step * 2,
        }}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {stackItems.map(({ key, label, icon: Icon, className }, idx) => (
          <motion.li
            key={key}
            className="group relative flex cursor-pointer flex-col items-center justify-center"
            role="listitem"
            initial="initial"
            animate={controls}
            variants={{
              initial: {
                x: -24,
                opacity: 0,
                filter: "blur(8px)",
              },
              animate: {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
              },
            }}
            transition={{
              ...fadeInUpSpring,
              delay: baseDelay + step * (3 + idx),
            }}
          >
            <motion.button
              type="button"
              tabIndex={0}
              aria-label={label}
              className="flex items-center justify-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              whileHover={{ rotate: 18 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              style={{ willChange: "transform" }}
            >
              <Icon
                className={`size-8 ${className}`}
                aria-hidden="true"
                focusable="false"
                title={label}
              />
            </motion.button>
            {/* Tooltip */}
            <span
              className="pointer-events-none absolute -bottom-8 z-10 min-w-max rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
              role="tooltip"
              id={`tooltip-${key}`}
            >
              {label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};
