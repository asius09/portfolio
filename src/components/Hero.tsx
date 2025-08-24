"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { socials } from "@/data/social";
import { keyPoints } from "@/data/keyPoints";
import { motion, Transition } from "motion/react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Button } from "./ui/Button";
import { IconCopy } from "@tabler/icons-react";

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
  type: "spring" as any, // 'spring' is not in the type, so we cast
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
  type: "spring" as any,
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
              type: "spring" as any,
              stiffness: 100,
            }}
            className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full"
            aria-label="Profile picture"
          >
            <Image
              src="/profile.png"
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
              className={cn("w-full", "text-base font-normal text-white/60")}
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
                className={`group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] duration-100 hover:scale-105`}
                aria-label={ariaLabel}
                title={title}
              >
                <Icon className={cn(iconClass, "size-5")} />
                <span className="pointer-event-none absolute -top-6 left-1/2 -translate-x-1/2 rounded-sm bg-zinc-800 px-1 text-right text-[10px] opacity-0 transition-opacity duration-75 group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-b-0 after:border-x-transparent after:border-t-zinc-800 after:content-['']">
                  {ariaLabel}
                </span>
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
                  className="flex items-center gap-2 text-sm text-white/80"
                  variants={itemVariants}
                >
                  <motion.span
                    initial={iconInitial}
                    whileInView={iconAnimate}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={iconTransition(idx)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs"
                    aria-hidden="true"
                  >
                    <Icon className={iconClass} />
                  </motion.span>
                  <motion.span
                    initial={false}
                    animate={false}
                    className="group flex items-center justify-start gap-1"
                  >
                    <Link
                      href={item.href}
                      className="underline-offset-2 transition-colors hover:text-white hover:underline"
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
                      className="relative size-5 rounded-full text-xs font-medium text-zinc-500 opacity-0 transition-colors group-hover:opacity-100 hover:text-white"
                      variant="ghost"
                      onClick={() => handleCopy?.(item.text)}
                      aria-label={`Copy ${item.text} to clipboard`}
                      title="Copy to clipboard"
                    >
                      <IconCopy stroke={2} className="size-4" />
                      <span className="pointer-event-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-zinc-800 px-1 text-right text-[10px] opacity-0 transition-opacity duration-75 group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-b-0 after:border-x-transparent after:border-t-zinc-800 after:content-['']">
                        {copied ? "Copied!" : "Copy"}
                      </span>
                    </Button>
                  </motion.span>
                </motion.li>
              );
            } else {
              return (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-white/80"
                  variants={itemVariants}
                >
                  <motion.span
                    initial={iconInitial}
                    whileInView={iconAnimate}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={iconTransition(idx)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs"
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
  // Tooltip state: visible on initial load, then only on hover/focus
  const [showTooltip, setShowTooltip] = React.useState(true);

  // Hide tooltip after initial animation (e.g., 2s)
  React.useEffect(() => {
    const timeout = setTimeout(() => setShowTooltip(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <header
      className="relative flex h-56 w-full items-center justify-center [mask-image:radial-gradient(circle_at_center,white_85%,transparent_100%)]"
      aria-label="Hero name"
    >
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full bg-neutral-950 [background-image:linear-gradient(to_right,#27272a_0.5px,transparent_0.5px),linear-gradient(to_bottom,#27272a_0.5px,transparent_0.5px)] bg-[size:16px_16px]"
        aria-hidden="true"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.4,
          ease: [0.22, 0.68, 0.36, 1],
        }}
      />
      <motion.h1
        className="group relative z-10 cursor-pointer p-1 text-8xl font-extrabold tracking-tighter text-white uppercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.18)] transition-colors duration-200 focus:outline-none md:text-9xl"
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
          letterSpacing: "-0.08em",
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.1,
          duration: 1.2,
          filter: { duration: 0.7, ease: [0.22, 0.68, 0.36, 1] },
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-describedby="brand-tooltip"
        style={{
          letterSpacing: "-0.08em",
          textShadow: "0 2px 24px rgba(0,0,0,0.18)",
        }}
      >
        asius
        {/* Tooltip */}
        <motion.span
          id="brand-tooltip"
          className={cn(
            "text-nowrap",
            "pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-2 py-1 text-center text-[11px] font-light tracking-normal capitalize opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100 after:absolute after:top-full after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-b-0 after:border-x-transparent after:border-t-zinc-800 after:content-['']",
            showTooltip ? "opacity-100" : "opacity-0",
          )}
          role="tooltip"
          aria-live="polite"
          aria-hidden={!showTooltip}
          style={{
            pointerEvents: "none",
            transitionDelay: showTooltip ? "0s" : "0.1s",
          }}
          initial={{ filter: "blur(8px)", opacity: 0 }}
          animate={{
            filter: showTooltip ? "blur(0px)" : "blur(8px)",
            opacity: showTooltip ? 1 : 0,
          }}
          transition={{
            duration: 0.32,
            ease: [0.22, 0.68, 0.36, 1],
            filter: { duration: 0.32, ease: [0.22, 0.68, 0.36, 1] },
          }}
        >
          A future brand name I intend to build showcasing my vision
        </motion.span>
      </motion.h1>
    </header>
  );
}
