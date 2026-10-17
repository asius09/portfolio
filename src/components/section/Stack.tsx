"use client";
import React from "react";
import { stackItems } from "@/data/techStack";
import { motion, type Transition } from "motion/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/Tooltip";

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

export const Stack = () => {
  const baseDelay = 0.02;
  const step = 0.025;

  return (
    <section
      id="stack-section"
      className="mt-12 w-full"
      aria-labelledby="stack-heading"
      tabIndex={-1}
      role="region"
    >
      <motion.h2
        id="stack-heading"
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
        Stacks
      </motion.h2>
      <motion.ul
        className="mt-4 flex flex-wrap gap-4"
        aria-label="Technology stack"
        role="list"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          ...fadeInUpTransition,
          delay: baseDelay + step * 2,
        }}
      >
        {stackItems.map(({ key, label, icon: Icon, className }, idx) => (
          <motion.li
            key={key}
            className="group relative flex cursor-pointer flex-col items-center justify-center hover:z-50"
            role="listitem"
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              ...fadeInUpTransition,
              delay: baseDelay + step * (3 + idx),
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  tabIndex={0}
                  aria-label={label}
                  className="flex cursor-pointer items-center justify-center rounded-full bg-transparent p-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  whileHover={{ scale: 1.18, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  style={{ willChange: "transform" }}
                >
                  <Icon
                    className={`size-8 transition-transform duration-200 ${className}`}
                    aria-hidden="true"
                    focusable="false"
                  />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-10000">
                {label}
              </TooltipContent>
            </Tooltip>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};
