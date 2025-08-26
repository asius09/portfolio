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
  type: "spring",
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
        className="text-foreground text-2xl font-semibold"
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
        className="text-foreground mt-3 text-sm font-normal"
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
        className="text-foreground mt-2 text-sm font-normal"
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
        className="text-foreground mt-2 text-sm font-normal"
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
