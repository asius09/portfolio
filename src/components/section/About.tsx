"use client";
import { motion } from "motion/react";
import {
  ANIMATION_CONFIG,
  fadeInUpInitial,
  fadeInUpAnimate,
  getFadeInUpTransition,
  DEFAULT_VIEWPORT,
} from "@/lib/animations";

export const About = () => {
  return (
    <section id="about-section" className="mt-12 w-full">
      <motion.h2
        className="text-foreground text-2xl font-semibold"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(ANIMATION_CONFIG.about.heading)}
      >
        About
      </motion.h2>
      <motion.p
        className="text-foreground mt-3 text-sm font-normal"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(
          ANIMATION_CONFIG.about.heading +
            ANIMATION_CONFIG.about.paragraphStep * 1
        )}
      >
        Hi, I’m Bobby — a full stack developer who turns 1 AM ideas into working
        apps.
      </motion.p>
      <motion.p
        className="text-foreground mt-2 text-sm font-normal"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(
          ANIMATION_CONFIG.about.heading +
            ANIMATION_CONFIG.about.paragraphStep * 2
        )}
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
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(
          ANIMATION_CONFIG.about.heading +
            ANIMATION_CONFIG.about.paragraphStep * 3
        )}
      >
        Always open to new challenges and conversations, so let’s connect.
      </motion.p>
    </section>
  );
};

