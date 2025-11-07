"use client";
import React, { useRef, useEffect, useState } from "react";
import { education } from "@/data/education";
import { motion, useAnimation, Transition } from "motion/react";

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
const fadeInUpSpring: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
  type: "spring",
  stiffness: 80,
};

function isElementInViewport(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export const Education = () => {
  const baseDelay = 0.18;
  const step = 0.13;

  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!hasAnimated && isElementInViewport(sectionRef.current)) {
        controls.start(fadeInUpAnimate);
        setHasAnimated(true);
      }
    }
    handleScroll();
    if (!hasAnimated) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hasAnimated, controls]);

  return (
    <motion.section
      ref={sectionRef}
      id="education-section"
      className="mt-12 w-full"
      initial={fadeInUpInitial}
      animate={controls}
      transition={{
        ...fadeInUpSpring,
        delay: baseDelay,
      }}
    >
      <motion.h2
        className="text-foreground text-2xl font-semibold"
        initial={fadeInUpInitial}
        animate={controls}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 1,
        }}
      >
        Education
      </motion.h2>
      <motion.div
        className="mt-6 w-full space-y-4"
        initial={fadeInUpInitial}
        animate={controls}
        transition={{
          ...fadeInUpSpring,
          delay: baseDelay + step * 2,
        }}
      >
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            className="flex items-start gap-2"
            initial={{
              y: 16,
              opacity: 0,
              filter: "blur(8px)",
            }}
            animate={controls}
            transition={{
              ...fadeInUpSpring,
              delay: baseDelay + step * (3 + idx),
            }}
          >
            {/* Pointer/Arrow Icon */}
            <motion.span
              className="text-foreground mt-1 flex h-6 w-6 items-center justify-center"
              aria-hidden="true"
              initial={fadeInUpInitial}
              animate={controls}
              transition={{
                ...fadeInUpSpring,
                delay: baseDelay + step * (3 + idx) + 0.04,
              }}
            >
              <span className="text-xl select-none">➤</span>
            </motion.span>
            <div className="flex w-full flex-col md:flex-row md:justify-between">
              <div>
                <motion.h3
                  className="text-foreground text-base font-bold"
                  initial={fadeInUpInitial}
                  animate={controls}
                  transition={{
                    ...fadeInUpSpring,
                    delay: baseDelay + step * (3 + idx) + 0.08,
                  }}
                >
                  {edu.institution}
                </motion.h3>
                <motion.p
                  className="text-foreground/80 mt-1 text-sm font-medium"
                  initial={fadeInUpInitial}
                  animate={controls}
                  transition={{
                    ...fadeInUpSpring,
                    delay: baseDelay + step * (3 + idx) + 0.12,
                  }}
                >
                  {edu.qualification}
                </motion.p>
              </div>
              <motion.span
                className="text-accent text-sm font-normal md:text-right"
                initial={fadeInUpInitial}
                animate={controls}
                transition={{
                  ...fadeInUpSpring,
                  delay: baseDelay + step * (3 + idx) + 0.16,
                }}
              >
                {edu.details}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
