"use client";
import { useState } from "react";
import Link from "next/link";
import { IconBrandGithubFilled, IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export const AppHeader = () => {
  // Simple theme toggle logic (for demonstration, not persistent)
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [iconAnimKey, setIconAnimKey] = useState(0);

  // Animate icon on theme toggle
  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    setIconAnimKey((k) => k + 1); // force icon animation
  };

  return (
    <header
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b border-solid border-zinc-800 bg-neutral-950 px-4 py-3"
      role="banner"
    >
      <div className="flex w-full max-w-3xl items-center justify-between">
        <span className="text-2xl font-bold text-white uppercase select-none">
          asius
        </span>

        {/* Right: Theme Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/asius09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group relative flex items-center justify-center rounded-lg p-1 transition hover:bg-zinc-800"
          >
            <IconBrandGithubFilled className="size-6 text-white" />
            <span className="pointer-event-none absolute -top-6 left-1/2 -translate-x-1/2 rounded-sm bg-zinc-800 px-1 text-right text-[10px] opacity-0 transition-opacity duration-75 group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-b-0 after:border-x-transparent after:border-t-zinc-800 after:content-['']">
              GitHub
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group relative flex cursor-pointer items-center justify-center rounded-lg p-1 transition hover:bg-zinc-800"
            type="button"
            style={{ minWidth: 40, minHeight: 40 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key={`sun-${iconAnimKey}`}
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                    rotate: -180,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    scale: [0.7, 1.18, 1],
                    opacity: [0, 1, 1],
                    rotate: [-180, 360, 0],
                    filter: ["blur(6px)", "blur(0px)", "blur(0px)"],
                  }}
                  exit={{
                    scale: 0.7,
                    opacity: 0,
                    rotate: 180,
                    filter: "blur(6px)",
                  }}
                  transition={{
                    scale: {
                      type: "spring",
                      stiffness: 420,
                      damping: 22,
                      duration: 0.6,
                    },
                    opacity: { duration: 0.22 },
                    rotate: {
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      duration: 0.6,
                    },
                    filter: { duration: 0.32 },
                  }}
                  style={{
                    display: "inline-flex",
                  }}
                >
                  <IconSun className="size-6 text-yellow-400" />
                </motion.span>
              ) : (
                <motion.span
                  key={`moon-${iconAnimKey}`}
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                    rotate: 180,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    scale: [0.7, 1.18, 1],
                    opacity: [0, 1, 1],
                    rotate: [180, -360, 0],
                    filter: ["blur(6px)", "blur(0px)", "blur(0px)"],
                  }}
                  exit={{
                    scale: 0.7,
                    opacity: 0,
                    rotate: -180,
                    filter: "blur(6px)",
                  }}
                  transition={{
                    scale: {
                      type: "spring",
                      stiffness: 420,
                      damping: 22,
                      duration: 0.6,
                    },
                    opacity: { duration: 0.22 },
                    rotate: {
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      duration: 0.6,
                    },
                    filter: { duration: 0.32 },
                  }}
                  style={{
                    display: "inline-flex",
                  }}
                >
                  <IconMoon className="size-6 text-blue-400" />
                </motion.span>
              )}
            </AnimatePresence>
            <span
              className={cn(
                "pointer-event-none absolute -bottom-6 left-1/2 shrink-0 -translate-x-1/2 rounded-sm bg-zinc-800 px-1 text-[10px] text-nowrap opacity-0 transition-opacity duration-75 group-hover:opacity-100",
                "after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:border-x-6 after:border-t-0 after:border-b-6 after:border-solid after:border-x-transparent after:border-b-zinc-800 after:content-['']",
                "sn-tooltip",
              )}
            >
              Toggle theme
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
