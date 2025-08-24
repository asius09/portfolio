/**
 * About section animation:
 * - Matches Hero section's crisp fade-in-up spring animation.
 * - Animation is triggered when the About section comes into view (viewport).
 * - Staggered, springy, and lively, just like Hero.
 *
 * Implementation:
 * - Uses Framer Motion's `whileInView` and `viewport` props to trigger animation on scroll into view.
 * - No parent prop needed; animation is handled by intersection observer.
 */

"use client";
import { motion, Transition } from "motion/react";
import React from "react";

// Hero's fadeInUp animation config
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

export const About = () => {
  // Match Hero's stagger rhythm
  const baseDelay = 0.18;
  const step = 0.13;

  return (
    <motion.section
      id="about-section"
      className="mt-12 w-full"
      initial={fadeInUpInitial}
      whileInView={fadeInUpAnimate}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        ...fadeInUpSpring,
        delay: baseDelay,
      }}
    >
      <motion.h2
        className="text-2xl font-semibold text-white"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 1,
        }}
      >
        About
      </motion.h2>
      <motion.p
        className="mt-3 text-sm font-normal text-white"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 2,
        }}
      >
        Hi, I’m Bobby — a frontend developer who turns 1 AM ideas into working
        apps.
      </motion.p>
      <motion.p
        className="mt-2 text-sm font-normal text-white"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 3,
        }}
      >
        I like building simple, animated interfaces with React, Next.js,
        TailwindCSS, and Framer Motion. I’m also interested in AI projects and
        game platforms.
      </motion.p>
      <motion.p
        className="mt-2 text-sm font-normal text-white"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 4,
        }}
      >
        Always open to new challenges and conversations, so let’s connect.
      </motion.p>
    </motion.section>
  );
};
