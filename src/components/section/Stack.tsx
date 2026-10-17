"use client";
import React from "react";
import { stackItems } from "@/data/techStack";
import { motion } from "motion/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/Tooltip";
import {
  fadeInUpInitial,
  fadeInUpAnimate,
  getFadeInUpTransition,
  microInitial,
  microAnimate,
  getSectionMicroTransition,
  DEFAULT_VIEWPORT,
} from "@/lib/animations";

export const Stack = () => {
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
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.04)}
      >
        Stacks
      </motion.h2>
      <motion.ul
        className="mt-4 flex flex-wrap gap-4"
        aria-label="Technology stack"
        role="list"
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.08)}
      >
        {stackItems.map(({ key, label, icon: Icon, className }, idx) => (
          <motion.li
            key={key}
            className="group relative flex cursor-pointer flex-col items-center justify-center hover:z-50"
            role="listitem"
            initial={microInitial}
            whileInView={microAnimate}
            viewport={DEFAULT_VIEWPORT}
            transition={getSectionMicroTransition(idx, 0.1)}
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

