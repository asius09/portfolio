"use client";
import React from "react";
import { education } from "@/data/education";
import { motion, type Transition } from "motion/react";

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

export const Education = () => {
  const baseDelay = 0.02;
  const step = 0.035;

  return (
    <section
      id="education-section"
      className="mt-12 w-full"
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
        Education
      </motion.h2>
      <motion.div
        className="mt-6 w-full space-y-4"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 2,
        }}
      >
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            className="flex items-start gap-2"
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              ...fadeInUpTransition,
              delay: baseDelay + step * (3 + idx),
            }}
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
