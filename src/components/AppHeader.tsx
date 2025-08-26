"use client";
import Link from "next/link";
import { IconBrandGithubFilled, IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Tooltip } from "./ui/Tooltip";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "./ui/Button";
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

  // Use framer-motion's scrollY to determine if hero header is out of view
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    if (!heroHeaderRef.current) return;
    const rect = heroHeaderRef.current.getBoundingClientRect();
    setShowLogo(rect.bottom <= 70);
  });
  useEffect(() => {
    if (!mounted) return;
    function handleResize() {
      if (!heroHeaderRef.current) return;
      const rect = heroHeaderRef.current.getBoundingClientRect();
      setShowLogo(rect.bottom <= 70);
    }
    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  // Animate icon on theme toggle
  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <header
      className="bg-background border-border fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b-[1px] px-4 py-2"
      role="banner"
    >
      <div className="flex w-full max-w-3xl items-center justify-between px-4">
        <div className="flex min-w-0 items-center overflow-hidden">
          <AnimatePresence>
            {showLogo && (
              <motion.span
                key="asius-header"
                className="text-foreground text-2xl font-bold tracking-tight uppercase select-none"
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
          <Button
            className="group relative flex size-8 cursor-pointer items-center justify-center rounded-lg p-2"
            variant="ghost"
          >
            <Link
              href="https://github.com/asius09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <IconBrandGithubFilled
                className="size-5"
                style={{ color: "var(--color-foreground)" }}
              />
              <Tooltip className="-bottom-6 after:-top-1" arrowDir="upward">
                GitHub
              </Tooltip>
            </Link>
          </Button>

          <Button
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            className="group relative flex size-8 cursor-pointer items-center justify-center rounded-lg p-2"
            type="button"
            variant="ghost"
          >
            <IconMoon
              className={cn(
                "absolute size-4.5 text-blue-400 transition-transform duration-300",
                resolvedTheme === "light"
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-75 rotate-90 opacity-0",
              )}
              aria-hidden={resolvedTheme !== "light"}
            />
            <IconSun
              className={cn(
                "absolute size-5 text-yellow-400 transition-transform duration-300",
                resolvedTheme === "dark"
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-75 -rotate-90 opacity-0",
              )}
              aria-hidden={resolvedTheme !== "dark"}
            />
            <Tooltip
              className="-bottom-9 text-wrap after:-top-1 md:-bottom-5 md:text-nowrap"
              arrowDir="upward"
            >
              Toggle theme
            </Tooltip>
          </Button>
        </div>
      </div>
    </header>
  );
};
