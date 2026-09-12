"use client";

import React, { useRef } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "./Button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio("/switch-on.mp3");
    audioRef.current.volume = 0.4;
  }, []);

  const playThemeSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } else {
        const audio = new Audio("/switch-on.mp3");
        audio.volume = 0.4;
        audio.play().catch(() => {});
      }
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleToggleTheme}
          aria-label="Toggle theme"
          className="group relative"
          type="button"
          variant="ghost"
          size="icon-sm"
        >
          <IconMoon
            className={cn(
              "absolute size-4.5 text-indigo-600 transition-all duration-300 group-hover:scale-110 dark:text-indigo-400",
              resolvedTheme === "light"
                ? "rotate-0 opacity-100"
                : "rotate-90 opacity-0",
            )}
            aria-hidden={resolvedTheme !== "light"}
          />
          <IconSun
            className={cn(
              "absolute size-5 text-amber-600 transition-all duration-300 group-hover:scale-110 dark:text-amber-400",
              resolvedTheme === "dark"
                ? "rotate-0 opacity-100"
                : "-rotate-90 opacity-0",
            )}
            aria-hidden={resolvedTheme !== "dark"}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Toggle theme</TooltipContent>
    </Tooltip>
  );
};
