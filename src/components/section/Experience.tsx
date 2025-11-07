"use client";
import React from "react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "../ui/Button";
import { experience } from "@/data/experience";
import { motion, type Transition } from "motion/react";

export const Experience = () => {
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
  // Make animation even snappier and faster
  const fadeInUpSpring: Transition = {
    duration: 0.18,
    ease: [0.4, 0, 0.2, 1],
    type: "spring",
    stiffness: 160,
    damping: 16,
  };

  // Reduce delays for much faster stagger
  const baseDelay = 0.01;
  const step = 0.03;

  return (
    <motion.section
      id="project-section"
      className="mt-12 w-full"
      aria-labelledby="experience-heading"
      tabIndex={-1}
      initial={fadeInUpInitial}
      whileInView={fadeInUpAnimate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        ...fadeInUpSpring,
        delay: baseDelay,
      }}
    >
      <motion.h2
        id="experience-heading"
        className="text-foreground text-2xl font-semibold"
        tabIndex={0}
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 1,
        }}
      >
        Experience
      </motion.h2>
      <motion.ul
        className="mt-6 grid grid-cols-1 gap-4 space-y-4"
        aria-label="Project list"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 2,
        }}
      >
        {experience.map((experience, idx) => (
          <motion.li
            key={experience.companyName}
            initial={{
              y: 16,
              opacity: 0,
              filter: "blur(8px)",
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              ...fadeInUpSpring,
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            ...fadeInUpSpring,
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
    </motion.section>
  );
};
