"use client";
import React from "react";
import { education } from "@/data/education";
import { motion } from "motion/react";
import {
  fadeInUpInitial,
  fadeInUpAnimate,
  getFadeInUpTransition,
  getSectionItemTransition,
  DEFAULT_VIEWPORT,
} from "@/lib/animations";

export const Education = () => {
  return (
    <section
      id="education-section"
      className="mt-12 w-full"
    >
      <motion.h2
        className="text-foreground text-2xl font-semibold"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.04)}
      >
        Education
      </motion.h2>
      <motion.div
        className="mt-6 w-full space-y-4"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.08)}
      >
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            className="flex items-start gap-2"
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={DEFAULT_VIEWPORT}
            transition={getSectionItemTransition(idx, 0.12)}
          >
            {/* Pointer/Arrow Icon */}
            <span
              className="text-foreground mt-1 flex h-6 w-6 items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-xl select-none">➤</span>
            </span>
            <div className="flex w-full flex-col md:flex-row md:justify-between">
              <div>
                <h3 className="text-foreground text-base font-bold">
                  {edu.institution}
                </h3>
                <p className="text-foreground/80 mt-1 text-sm font-medium">
                  {edu.qualification}
                </p>
              </div>
              <span className="text-accent text-sm font-normal md:text-right">
                {edu.details}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

