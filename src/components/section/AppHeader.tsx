"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/Tooltip";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/Button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { IconBrandGithubFilled } from "@tabler/icons-react";
import { FontSwitcher } from "../ui/FontSwitcher";
import { ThemeToggle } from "../ui/ThemeToggle";

export const AppHeader = () => {
  const [mounted, setMounted] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const heroHeaderRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    heroHeaderRef.current = document.querySelector(
      'h1[aria-describedby="brand-tooltip"]',
    ) as HTMLElement | null;
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    if (!heroHeaderRef.current) return;
    const rect = heroHeaderRef.current.getBoundingClientRect();
    setShowLogo(rect.bottom <= 82);
  });
  useEffect(() => {
    if (!mounted) return;
    function handleResize() {
      if (!heroHeaderRef.current) return;
      const rect = heroHeaderRef.current.getBoundingClientRect();
      setShowLogo(rect.bottom <= 82);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <header
      className="bg-background border-border/30 fixed top-0 left-0 z-50 flex min-h-12 w-full items-center justify-center border-b"
      role="banner"
    >
      <div className="flex w-full max-w-3xl items-center justify-between px-6">
        <div className="flex min-w-0 items-center overflow-hidden">
          <AnimatePresence>
            {showLogo && (
              <motion.span
                key="asius-header"
                className="font-asius text-foreground text-3xl font-bold tracking-tight lowercase select-none"
                initial={{
                  y: 20,
                  opacity: 0,
                  filter: "blur(8px)",
                  scale: 0.92,
                }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ y: 20, opacity: 0, filter: "blur(8px)", scale: 0.92 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                  duration: 0.48,
                  filter: { duration: 0.42, ease: [0.22, 0.68, 0.36, 1] },
                  scale: { duration: 0.42, ease: [0.22, 0.68, 0.36, 1] },
                }}
              >
                asius
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="group relative"
                variant="ghost"
                size="icon-sm"
                asChild
              >
                <Link
                  href="https://github.com/asius09/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Portfolio"
                >
                  <IconBrandGithubFilled className="size-5 text-foreground" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">GitHub Portfolio</TooltipContent>
          </Tooltip>

          <FontSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
