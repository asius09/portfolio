"use client";
import { motion, Transition } from "motion/react";

const fadeInUpInitial = {
  y: 12,
  opacity: 0,
};
const fadeInUpAnimate = {
  y: 0,
  opacity: 1,
};
const fadeInUpTransition: Transition = {
  duration: 0.45,
  ease: [0.32, 0.72, 0, 1],
};

export const About = () => {
  const baseDelay = 0.18;
  const step = 0.13;

  return (
    <motion.section
      id="about-section"
      className="mt-12 w-full"
      initial={fadeInUpInitial}
      whileInView={fadeInUpAnimate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        ...fadeInUpTransition,
        delay: baseDelay,
      }}
    >
      <motion.h2
        className="text-foreground text-2xl font-semibold"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 1,
        }}
      >
        About
      </motion.h2>
      <motion.p
        className="text-foreground mt-3 text-sm font-normal"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 2,
        }}
      >
        Hi, I’m Bobby — a full stack developer who turns 1 AM ideas into working
        apps.
      </motion.p>
      <motion.p
        className="text-foreground mt-2 text-sm font-normal"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 3,
        }}
      >
        I like building simple, animated interfaces with React, Next.js,
        TailwindCSS, and Framer Motion. On the backend, I work with Node.js,
        Express, PostgreSQL, and modern cloud platforms like AWS and Vercel.
        I&apos;m also interested in AI projects and game platforms.
      </motion.p>
      <motion.p
        className="text-foreground mt-2 text-sm font-normal"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 4,
        }}
      >
        Always open to new challenges and conversations, so let’s connect.
      </motion.p>
    </motion.section>
  );
};
