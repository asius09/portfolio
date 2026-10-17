"use client";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "../ui/Button";
import { experience } from "@/data/experience";
import { motion, type Transition } from "motion/react";

export const Experience = () => {
  const fadeInUpInitial = {
    y: 14,
    opacity: 0,
    filter: "blur(6px)",
  };
  const fadeInUpAnimate = {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  };
  const fadeInUpTransition: Transition = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  };
  const baseDelay = 0.01;
  const step = 0.03;

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
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 1,
        }}
      >
        Experience
      </motion.h2>
      <motion.ul
        className="mt-6 grid grid-cols-1 gap-4 space-y-2"
        aria-label="Experience list"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 2,
        }}
      >
        {experience.map((experience, idx) => (
          <motion.li
            key={experience.companyName}
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              ...fadeInUpTransition,
              delay: baseDelay + step * (3 + idx),
            }}
          >
            <ExperienceCard {...experience} />
          </motion.li>
        ))}
      </motion.ul>
      {experience.length > 2 && (
        <motion.div
          className="my-8 grid w-full place-content-center"
          initial={fadeInUpInitial}
          whileInView={fadeInUpAnimate}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            ...fadeInUpTransition,
            delay: baseDelay + step * (3 + experience.length),
          }}
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
