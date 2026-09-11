"use client";
import Link from "next/link";
import { IconBrandGithubFilled, IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/Tooltip";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/Button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export const AppHeader = () => {
  const { resolvedTheme, setTheme } = useTheme();
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

  const playThemeSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      return;
    }
  };

  const handleToggleTheme = () => {
    playThemeSound();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

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
                className="group relative flex size-8 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
                variant="ghost"
              >
                <Link
                  href="https://github.com/asius09"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <IconBrandGithubFilled className="group-hover:text-foreground dark:group-hover:text-foreground size-5 text-neutral-700 transition-colors dark:text-neutral-300" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleToggleTheme}
                aria-label="Toggle theme"
                className="group relative flex size-8 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
                type="button"
                variant="ghost"
              >
                <IconMoon
                  className={cn(
                    "absolute size-4.5 text-indigo-600 transition-all duration-300 group-hover:scale-110 dark:text-indigo-400",
                    resolvedTheme === "light"
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-75 rotate-90 opacity-0",
                  )}
                  aria-hidden={resolvedTheme !== "light"}
                />
                <IconSun
                  className={cn(
                    "absolute size-5 text-amber-500 transition-all duration-300 group-hover:scale-110 dark:text-amber-400",
                    resolvedTheme === "dark"
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-75 -rotate-90 opacity-0",
                  )}
                  aria-hidden={resolvedTheme !== "dark"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Toggle theme</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
