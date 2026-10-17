import type { Transition } from "motion/react";

/**
 * Global animation configuration.
 * Single source of truth for timings, easing, offsets, and section sequence delays.
 */
export const ANIMATION_CONFIG = {
  duration: 0.75,
  microDuration: 0.6,

  ease: [0.22, 1, 0.36, 1] as const,

  y: 16,
  microY: 8,

  blur: "8px",
  microBlur: "4px",

  staggerStep: 0.06,
  microStaggerStep: 0.04,

  // Reading order sequence for above-the-fold content
  hero: {
    title: 0,
    profile: 0.08,
    socials: 0.14,
    keyPoints: 0.22,
  },
  about: {
    heading: 0.52,
    paragraphStep: 0.06,
  },
} as const;

export const DEFAULT_VIEWPORT = {
  once: true,
  amount: 0.15,
} as const;

/* Section & card reveals */
export const fadeInUpInitial = {
  y: ANIMATION_CONFIG.y,
  opacity: 0,
  filter: `blur(${ANIMATION_CONFIG.blur})`,
};

export const fadeInUpAnimate = {
  y: 0,
  opacity: 1,
  filter: "blur(0px)",
};

export const getFadeInUpTransition = (
  delay = 0,
  duration = ANIMATION_CONFIG.duration,
): Transition => ({
  duration,
  ease: ANIMATION_CONFIG.ease,
  delay,
});

/* Micro reveals (badges, buttons, icons) */
export const microInitial = {
  scale: 0.94,
  opacity: 0,
  y: ANIMATION_CONFIG.microY,
  filter: `blur(${ANIMATION_CONFIG.microBlur})`,
};

export const microAnimate = {
  scale: 1,
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
};

export const getMicroTransition = (
  delay = 0,
  duration = ANIMATION_CONFIG.microDuration,
): Transition => ({
  duration,
  ease: ANIMATION_CONFIG.ease,
  delay,
});

/* Stagger helpers */
export const getSectionItemTransition = (
  index: number,
  baseDelay = 0.04,
  step = ANIMATION_CONFIG.staggerStep,
): Transition => ({
  duration: ANIMATION_CONFIG.duration,
  ease: ANIMATION_CONFIG.ease,
  delay: baseDelay + index * step,
});

export const getSectionMicroTransition = (
  index: number,
  baseDelay = 0.04,
  step = ANIMATION_CONFIG.microStaggerStep,
): Transition => ({
  duration: ANIMATION_CONFIG.microDuration,
  ease: ANIMATION_CONFIG.ease,
  delay: baseDelay + index * step,
});
