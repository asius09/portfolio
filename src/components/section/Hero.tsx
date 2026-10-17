"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/social";
import { keyPoints } from "@/data/keyPoints";
import { motion } from "motion/react";
import { CopyButton } from "../ui/CopyButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/Tooltip";
import { Button } from "../ui/Button";

import {
  ANIMATION_CONFIG,
  fadeInUpInitial,
  fadeInUpAnimate,
  getFadeInUpTransition,
  microInitial,
  microAnimate,
  getMicroTransition,
  DEFAULT_VIEWPORT,
} from "@/lib/animations";

export const Hero = () => {
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
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={DEFAULT_VIEWPORT}
            transition={getFadeInUpTransition(ANIMATION_CONFIG.hero.profile)}
            className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full shadow-xl drop-shadow-[0_6px_24px_rgba(0,0,0,0.18)]"
          >
            <Image
              src="/profile.webp"
              alt="Bobby profile picture"
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
              viewport={DEFAULT_VIEWPORT}
              transition={getFadeInUpTransition(
                ANIMATION_CONFIG.hero.profile + 0.04
              )}
            >
              Bobby
            </motion.h2>
            <motion.span
              initial={fadeInUpInitial}
              whileInView={fadeInUpAnimate}
              viewport={DEFAULT_VIEWPORT}
              transition={getFadeInUpTransition(
                ANIMATION_CONFIG.hero.profile + 0.08
              )}
              className={cn(
                "w-full",
                "text-foreground/60 text-base font-normal",
              )}
            >
              Full Stack Developer
            </motion.span>
          </div>
        </div>

        <motion.nav
          id="social-links"
          className="flex items-center gap-2"
          aria-label="Social links"
          initial={fadeInUpInitial}
          whileInView={fadeInUpAnimate}
          viewport={DEFAULT_VIEWPORT}
          transition={getFadeInUpTransition(ANIMATION_CONFIG.hero.socials)}
        >
          {socials.map(({ href, ariaLabel, Icon }, idx) => (
            <motion.div
              key={href}
              initial={microInitial}
              whileInView={microAnimate}
              viewport={DEFAULT_VIEWPORT}
              transition={getMicroTransition(
                ANIMATION_CONFIG.hero.socials +
                  idx * ANIMATION_CONFIG.microStaggerStep
              )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="social" size="icon-sm" className="group" asChild>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                    >
                      <Icon className="size-4.5 text-foreground transition-transform duration-200 group-hover:scale-110" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">{ariaLabel}</TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.nav>
      </header>

      {/* Key Points */}
      <section aria-label="Key information" className="w-full">
        <ul className="flex w-full flex-col items-start justify-center gap-1">
          {keyPoints.map((item, idx) => {
            const Icon = item.icon;
            const iconClass = item.iconClass;

            return (
              <motion.li
                key={idx}
                className="flex items-center gap-2 text-sm text-foreground"
                initial={fadeInUpInitial}
                whileInView={fadeInUpAnimate}
                viewport={DEFAULT_VIEWPORT}
                transition={getFadeInUpTransition(
                  ANIMATION_CONFIG.hero.keyPoints +
                    idx * ANIMATION_CONFIG.microStaggerStep
                )}
              >
                <span
                  className="border-border/70 text-foreground flex size-8 items-center justify-center rounded-lg border bg-neutral-100 shadow-xs dark:border-white/10 dark:bg-neutral-800"
                  aria-hidden="true"
                >
                  <Icon className={cn(iconClass, "size-4.5")} />
                </span>

                {item.href ? (
                  <span className="group flex items-center justify-start gap-1">
                    <Link
                      href={item.href}
                      className="hover:text-foreground text-foreground underline-offset-2 transition-colors hover:underline"
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
                    {item.copyValue && <CopyButton value={item.copyValue} />}
                  </span>
                ) : (
                  <span>{item.text}</span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

function AnimateName() {
  return (
    <header
      className="relative flex h-40 w-full items-center justify-center mask-[radial-gradient(circle_at_center,white_85%,transparent_100%)] md:h-56"
      aria-label="Hero name"
    >
      {/* Animated background grid */}
      <motion.div
        className="bg-background bg-grid bg-size[16px_16px] absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
        tabIndex={-1}
        initial={{
          opacity: 0,
          scale: 1.04,
          filter: `blur(${ANIMATION_CONFIG.blur})`,
        }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={getFadeInUpTransition(ANIMATION_CONFIG.hero.title)}
      />
      <motion.h1
        className="group font-asius text-foreground selection:text-foreground relative z-10 w-full cursor-pointer text-center text-9xl font-bold tracking-wide lowercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.18)] transition-colors duration-200 select-none selection:bg-none focus:outline-none md:text-[8rem]"
        tabIndex={0}
        initial={{
          opacity: 0,
          y: ANIMATION_CONFIG.y,
          scale: 0.96,
          filter: `blur(${ANIMATION_CONFIG.blur})`,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={getFadeInUpTransition(
          ANIMATION_CONFIG.hero.title + 0.04,
          ANIMATION_CONFIG.duration
        )}
        aria-describedby="brand-tooltip"
      >
        asius
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="sr-only">asius information</span>
          </TooltipTrigger>
          <TooltipContent
            className="w-full max-w-xs text-center text-xs tracking-normal normal-case"
            side="top"
          >
            A future brand name I intend to build showcasing my vision
          </TooltipContent>
        </Tooltip>
      </motion.h1>
    </header>
  );
}
