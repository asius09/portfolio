"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";

const footerSocials = [
  {
    href: "https://github.com/asius09",
    ariaLabel: "GitHub",
    title: "GitHub",
    Icon: IconBrandGithub,
  },
  {
    href: "https://x.com/_asius",
    ariaLabel: "X (Twitter)",
    title: "X",
    Icon: IconBrandX,
  },
  {
    href: "https://www.linkedin.com/in/bobby09/",
    ariaLabel: "LinkedIn",
    title: "LinkedIn",
    Icon: IconBrandLinkedin,
  },
  {
    href: "mailto:itsmeasius@gmail.com",
    ariaLabel: "Email",
    title: "Email",
    Icon: IconMail,
  },
];

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

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer-section"
      className="mt-16 w-full border-t border-border/40 pt-12 pb-16 sm:mt-24 sm:pt-14"
      aria-label="Footer"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <motion.h2
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={DEFAULT_VIEWPORT}
            transition={getFadeInUpTransition(0.04)}
            className="font-caveat text-4xl sm:text-5xl font-medium tracking-wide text-foreground select-none"
          >
            Asius
          </motion.h2>

          <motion.p
            initial={fadeInUpInitial}
            whileInView={fadeInUpAnimate}
            viewport={DEFAULT_VIEWPORT}
            transition={getFadeInUpTransition(0.1)}
            className="max-w-md text-sm sm:text-base text-muted-foreground font-normal leading-relaxed"
          >
            Open to building useful, well-made software with thoughtful people
          </motion.p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2 text-muted-foreground">
          {footerSocials.map(({ href, ariaLabel, title, Icon }, idx) => (
            <motion.div
              key={href}
              initial={microInitial}
              whileInView={microAnimate}
              viewport={DEFAULT_VIEWPORT}
              transition={getMicroTransition(
                0.08 + idx * ANIMATION_CONFIG.microStaggerStep
              )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="social"
                    size="icon-sm"
                    className="group"
                    asChild
                  >
                    <Link
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={
                        href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      aria-label={ariaLabel}
                    >
                      <Icon className="size-4.5 text-foreground transition-transform duration-200 group-hover:scale-110" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">{title}</TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <motion.div
        initial={fadeInUpInitial}
        whileInView={fadeInUpAnimate}
        viewport={DEFAULT_VIEWPORT}
        transition={getFadeInUpTransition(0.18)}
        className="mt-12 flex flex-col gap-3 border-t border-border/40 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm text-muted-foreground sm:mt-16 sm:pt-8"
      >
        <p className="select-none">
          &copy; {currentYear}{" "}
          <Link
            href="https://x.com/_asius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium transition-colors hover:underline"
          >
            Bobby
          </Link>
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground select-none">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>New Delhi, India</span>
        </div>
      </motion.div>
    </footer>
  );
};
