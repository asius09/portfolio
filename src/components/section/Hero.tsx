"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/social";
import { keyPoints } from "@/data/keyPoints";
import { motion, Transition } from "motion/react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Button } from "../ui/Button";
import { IconCopy } from "@tabler/icons-react";
import { Tooltip } from "../ui/Tooltip";

// Types for motion configs
type FadeInUp = {
  y: number;
  opacity: number;
  filter: string;
};
type IconAnim = {
  scale: number;
  opacity: number;
  rotate: number;
};

// Common motion configs with types
const fadeInUpInitial: FadeInUp = {
  y: 12,
  opacity: 0,
  filter: "blur(8px)",
};
const fadeInUpAnimate: FadeInUp = {
  y: 0,
  opacity: 1,
  filter: "blur(0px)",
};
const fadeInUpTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for "easeOut"
};

const fadeInUpSpring: Transition = {
  ...fadeInUpTransition,
  type: "spring", // 'spring' is not in the type, so we cast
  stiffness: 80,
};

const iconInitial: IconAnim = {
  scale: 0.92,
  opacity: 0,
  rotate: -13,
};
const iconAnimate: IconAnim = {
  scale: 1,
  opacity: 1,
  rotate: 0,
};
const iconTransition = (idx: number): Transition => ({
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
  delay: (idx + 1) * 0.175,
  type: "spring",
  stiffness: 80,
});

// Orchestration variants for ul and li
const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.18,
      staggerChildren: 0.13,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ...fadeInUpSpring,
    },
  },
  hidden: {
    y: 12,
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      ...fadeInUpSpring,
    },
  },
};

export const Hero = () => {
  const { copied, handleCopy } = useCopyToClipboard();
  return (
    <section
      className="flex flex-col items-center justify-start"
      aria-labelledby="hero-heading"
      role="region"
    >
      <AnimateName />
      <header
        className="flex h-full w-full flex-col justify-between gap-6 py-4 md:flex-row"
        id="personal-details"
        aria-label="Personal details"
      >
        <div className="flex items-start justify-start gap-4">
          <motion.figure
            initial={{
              scale: 0.75,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full shadow-xl drop-shadow-[0_6px_24px_rgba(0,0,0,0.18)]"
          >
            <Image
              src="/profile.webp"
              alt="Bobby Tiwari profile picture"
              className="object-cover"
              width={64}
              height={64}
            />
          </motion.figure>
          <div
            className="flex flex-col items-start justify-center"
            id="name-and-role"
          >
            <motion.h2
              id="hero-heading"
              className="text-2xl font-bold"
              initial={fadeInUpInitial}
              whileInView={fadeInUpAnimate}
              viewport={{ once: true, amount: 0.6 }}
              transition={fadeInUpTransition}
            >
              Bobby Tiwari
            </motion.h2>
            <motion.span
              initial={fadeInUpInitial}
              whileInView={fadeInUpAnimate}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                ...fadeInUpSpring,
                delay: 0.125,
              }}
              className={cn(
                "w-full",
                "text-foreground/60 text-base font-normal",
              )}
            >
              Frontend Developer
            </motion.span>
          </div>
        </div>

        <motion.nav
          id="social-links"
          className="flex items-center gap-2"
          aria-label="Social links"
          initial={fadeInUpInitial}
          whileInView={fadeInUpAnimate}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            ...fadeInUpSpring,
            delay: 0.18,
          }}
        >
          {socials.map(({ href, ariaLabel, title, Icon, iconClass }, idx) => (
            <motion.div
              key={href}
              initial={iconInitial}
              whileInView={iconAnimate}
              viewport={{ once: true, amount: 0.6 }}
              transition={iconTransition(idx)}
            >
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group from-gradient-from to-gradient-to relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-b shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] duration-100 hover:scale-105`}
                aria-label={ariaLabel}
                title={title}
              >
                <Icon className={cn(iconClass, "size-5")} />
                <Tooltip className="-top-6 after:top-full">{ariaLabel}</Tooltip>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </header>

      {/* Key Points */}
      <section aria-label="Key information" className="w-full">
        <motion.ul
          className="flex w-full flex-col items-start justify-center gap-1"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {keyPoints.map((item, idx) => {
            const Icon = item.icon;
            const iconClass = item.iconClass;
            if (item.href) {
              return (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2 text-sm"
                  variants={itemVariants}
                >
                  <motion.span
                    initial={iconInitial}
                    whileInView={iconAnimate}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={iconTransition(idx)}
                    className="from-gradient-from to-gradient-to text-foreground flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs"
                    aria-hidden="true"
                  >
                    <Icon className={iconClass} />
                  </motion.span>

                  <motion.span
                    initial={false}
                    animate={false}
                    className="group text-foreground flex items-center justify-start gap-1"
                  >
                    <Link
                      href={item.href}
                      className="hover:text-foreground underline-offset-2 transition-colors hover:underline"
                      tabIndex={0}
                      aria-label={
                        item.type === "email"
                          ? `Send email to ${item.text}`
                          : item.type === "phone"
                            ? `Call ${item.text}`
                            : `Visit ${item.text}`
                      }
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.text}
                    </Link>
                    <Button
                      className="hover:text-foreground text-mute-foreground relative size-5 rounded-full text-xs font-medium transition-colors group-hover:opacity-100 md:opacity-0"
                      variant="ghost"
                      onClick={() => handleCopy?.(item.text)}
                      aria-label={`Copy ${item.text} to clipboard`}
                      title="Copy to clipboard"
                    >
                      <IconCopy stroke={2} className="size-4" />
                      <Tooltip className="-top-4 after:-bottom-1">
                        {copied ? "Copied!" : "Copy"}
                      </Tooltip>
                    </Button>
                  </motion.span>
                </motion.li>
              );
            } else {
              return (
                <motion.li
                  key={idx}
                  className="text-foreground/80 flex items-center gap-2 text-sm"
                  variants={itemVariants}
                >
                  <motion.span
                    initial={iconInitial}
                    whileInView={iconAnimate}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={iconTransition(idx)}
                    className="from-gradient-from to-gradient-to text-foreground flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs"
                    aria-hidden="true"
                  >
                    <Icon className={cn(iconClass, "size-5")} />
                  </motion.span>
                  <motion.span initial={false} animate={false}>
                    {item.text}
                  </motion.span>
                </motion.li>
              );
            }
          })}
        </motion.ul>
      </section>
    </section>
  );
};

function AnimateName() {
  return (
    <header
      className="relative flex h-40 w-full items-center justify-center [mask-image:radial-gradient(circle_at_center,white_85%,transparent_100%)] md:h-56"
      aria-label="Hero name"
    >
      {/* Animated background grid */}
      <motion.div
        className="bg-background bg-grid absolute inset-0 z-0 h-full w-full bg-[size:16px_16px]"
        aria-hidden="true"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 0.68, 0.36, 1],
        }}
      />
      <motion.h1
        className="group font-asius text-foreground selection:text-foreground relative z-10 w-full cursor-pointer text-center text-9xl font-bold tracking-wide lowercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.18)] transition-colors duration-200 select-none selection:bg-none focus:outline-none md:text-[8rem]"
        tabIndex={0}
        initial={{
          opacity: 0,
          y: 56,
          letterSpacing: "-0.22em",
          scale: 0.92,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          letterSpacing: "-0.2rem",
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.9,
          duration: 0.6,
          filter: { duration: 0.4, ease: [0.22, 0.68, 0.36, 1] },
        }}
        aria-describedby="brand-tooltip"
      >
        asius
        <Tooltip
          className="-top-1 w-full tracking-wider capitalize after:-bottom-1.5 after:left-[50.6%] md:-top-2 md:text-xs"
          id="brand-tooltip"
          aria-live="polite"
        >
          A future brand name I intend to build showcasing my vision
        </Tooltip>
      </motion.h1>
    </header>
  );
}
