"use client";
import React, { useState } from "react";
import { ProjectCard } from "../ProjectCard";
import { Button } from "../ui/Button";
import { projects } from "@/data/project";
import { motion, type Transition } from "motion/react";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const Project = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
      <div className="flex items-center justify-between">
        <motion.h2
          id="projects-heading"
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
          Projects
        </motion.h2>
        
        <motion.div 
          className="relative flex items-center gap-0.5 rounded-md border border-border/50 bg-card p-0.5 shadow-xs dark:border-white/10 dark:bg-neutral-900"
          initial={fadeInUpInitial}
          whileInView={fadeInUpAnimate}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...fadeInUpSpring, delay: baseDelay + step * 1 }}
        >
          {(["grid", "list"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              aria-label={`${mode === "grid" ? "Grid" : "List"} view`}
              className={cn(
                "relative z-10 rounded p-1.5 text-muted-foreground transition-colors hover:text-foreground",
                viewMode === mode && "text-foreground"
              )}
            >
              {viewMode === mode && (
                <motion.div
                  layoutId="active-view-tab"
                  className="absolute inset-0 z-[-1] rounded bg-neutral-200/60 dark:bg-neutral-800"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              {mode === "grid" ? <IconLayoutGrid className="size-3.5" /> : <IconList className="size-3.5" />}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.ul
        className={cn(
          "mt-6",
          viewMode === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "flex flex-col gap-1"
        )}
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
            layout
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
            <ProjectCard {...project} viewMode={viewMode} />
          </motion.li>
        ))}
      </motion.ul>
      {projects.length > 4 && (
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
      )}
    </motion.section>
  );
};
