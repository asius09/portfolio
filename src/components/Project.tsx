"use client";
import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";
import { projects } from "@/data/project";
import { motion, type Transition } from "motion/react";

export const Project = () => {
  // Animation configs (matching About/Hero/Stack)
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
      aria-labelledby="projects-heading"
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
        id="projects-heading"
        className="text-2xl font-semibold text-foreground"
        tabIndex={0}
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 1,
        }}
      >
        Projects
      </motion.h2>
      <motion.ul
        className="mt-6 grid grid-cols-1 gap-4 space-y-4 md:grid-cols-2"
        aria-label="Project list"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 2,
        }}
      >
        {projects.map((project, idx) => (
          <motion.li
            key={project.name}
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
            <ProjectCard {...project} />
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        className="my-8 grid w-full place-content-center"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * (3 + projects.length),
        }}
      >
        <Button
          variant="ghost"
          className="max-w-2xs hover:underline"
          aria-label="See more projects"
        >
          See More <span aria-hidden="true">&#8594;</span>
        </Button>
      </motion.div>
    </motion.section>
  );
};
