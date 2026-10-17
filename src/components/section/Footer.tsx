"use client";

import React from "react";
import Link from "next/link";
import { motion, type Transition } from "motion/react";
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

const fadeInUpInitial = {
  y: 12,
  opacity: 0,
};

const fadeInUpAnimate = {
  y: 0,
  opacity: 1,
};

const fadeInUpTransition: Transition = {
  duration: 0.45,
  ease: [0.32, 0.72, 0, 1],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      id="footer-section"
      className="mt-16 w-full border-t border-border/40 pt-12 pb-16 sm:mt-24 sm:pt-14"
      aria-label="Footer"
      initial={fadeInUpInitial}
      whileInView={fadeInUpAnimate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        ...fadeInUpTransition,
        delay: 0.04,
      }}
    >
      {/* Top Section: Asius heading, description, and social icons */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="font-caveat text-4xl sm:text-5xl font-medium tracking-wide text-foreground select-none">
            Asius
          </h2>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
            Open to building useful, well-made software with thoughtful people
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-muted-foreground">
          {footerSocials.map(({ href, ariaLabel, title, Icon }) => (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={ariaLabel}
                  className="group rounded-md p-1.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                >
                  <Icon
                    className="size-5 transition-colors group-hover:text-foreground"
                    stroke={1.75}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">{title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Bottom Sub-bar: Copyright & Location */}
      <div className="mt-12 flex items-center justify-between text-xs sm:text-sm text-muted-foreground sm:mt-16">
        <p className="select-none">
          &copy; {currentYear}{" "}
          <Link
            href="https://x.com/_asius"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground hover:underline"
          >
            Bobby
          </Link>
        </p>
        <p className="select-none">New Delhi, India</p>
      </div>
    </motion.footer>
  );
};
