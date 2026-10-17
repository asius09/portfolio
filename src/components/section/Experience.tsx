"use client";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "../ui/Button";
import { experience } from "@/data/experience";
import { motion } from "motion/react";
import {
  ANIMATION_CONFIG,
  fadeInUpInitial,
  fadeInUpAnimate,
  getFadeInUpTransition,
  getSectionItemTransition,
  DEFAULT_VIEWPORT,
} from "@/lib/animations";

export const Experience = () => {
  return (
    <section
      id="experience-section"
      className="mt-12 w-full"
      aria-labelledby="experience-heading"
      tabIndex={-1}
    >
      <motion.h2
        id="experience-heading"
        className="text-foreground text-2xl font-semibold"
        tabIndex={0}
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.04)}
      >
        Experience
      </motion.h2>
      <motion.ul
        className="mt-6 grid grid-cols-1 gap-4 space-y-2"
        aria-label="Experience list"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.08)}
      >
        {experience.map((exp, idx) => (
          <motion.li
            key={exp.companyName}
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={DEFAULT_VIEWPORT}
            transition={getSectionItemTransition(idx, 0.12)}
          >
            <ExperienceCard {...exp} />
          </motion.li>
        ))}
      </motion.ul>
      {experience.length > 2 && (
        <motion.div
          className="my-8 grid w-full place-content-center"
          initial={fadeInUpInitial}
          whileInView={fadeInUpAnimate}
          viewport={DEFAULT_VIEWPORT}
          transition={getFadeInUpTransition(
            0.12 + experience.length * ANIMATION_CONFIG.staggerStep
          )}
        >
          <Button
            variant="ghost"
            className="max-w-2xs hover:underline"
            aria-label="See more experience"
          >
            See More <span aria-hidden="true">&#8594;</span>
          </Button>
        </motion.div>
      )}
    </section>
  );
};

