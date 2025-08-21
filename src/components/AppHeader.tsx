"use client";
import { useState } from "react";
import Link from "next/link";
import { IconBrandGithubFilled, IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const AppHeader = () => {
  // Simple theme toggle logic (for demonstration, not persistent)
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b border-solid border-zinc-800 bg-neutral-950 px-4 py-3"
      role="banner"
    >
      <div className="flex w-full max-w-3xl items-center justify-between">
        <div className="flex flex-1 justify-center">
          <span className="text-2xl font-bold text-white select-none">
            asius
          </span>
        </div>

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
          >
            {theme === "dark" ? (
              <IconSun className="size-6 text-yellow-400" />
            ) : (
              <IconMoon className="size-6 text-blue-400" />
            )}
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
