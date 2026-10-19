import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "cn";
import { THEMES } from "./constants";
import { levelIndex } from "./utils";
import type { ContributionTheme, ThemeConfig } from "./types";

interface ContributionThemePopoverProps {
  activeTheme: ContributionTheme;
  themeConfig: ThemeConfig;
  allowThemeSelection: boolean;
  onThemeChange: (theme: ContributionTheme) => void;
  isPopoverOpen: boolean;
  onTogglePopover: () => void;
  onClosePopover: () => void;
}

export const ContributionThemePopover: React.FC<ContributionThemePopoverProps> =
  React.memo(
    ({
      activeTheme,
      themeConfig,
      allowThemeSelection,
      onThemeChange,
      isPopoverOpen,
      onTogglePopover,
      onClosePopover,
    }) => {
      const popoverRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (!isPopoverOpen) return;

        const onPointerDown = (e: MouseEvent) => {
          if (
            popoverRef.current &&
            !popoverRef.current.contains(e.target as Node)
          ) {
            onClosePopover();
          }
        };

        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") onClosePopover();
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
          document.removeEventListener("mousedown", onPointerDown);
          document.removeEventListener("keydown", onKeyDown);
        };
      }, [isPopoverOpen, onClosePopover]);

      return (
        <div className="mt-1 flex flex-row items-center justify-end px-1 pb-1">
          <div className="relative flex items-center" ref={popoverRef}>
            <button
              type="button"
              onClick={allowThemeSelection ? onTogglePopover : undefined}
              aria-haspopup={allowThemeSelection ? "dialog" : undefined}
              aria-expanded={allowThemeSelection ? isPopoverOpen : undefined}
              className={cn(
                "text-muted-foreground flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[9px] transition-colors select-none",
                allowThemeSelection &&
                  "hover:text-foreground cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
              )}
              title={
                allowThemeSelection
                  ? "Change contribution color theme"
                  : undefined
              }
            >
              <span className="opacity-50">Less</span>
              <span className="flex gap-0.5" aria-hidden>
                {[0, 1, 3, 6, 10].map((level) => (
                  <span
                    key={level}
                    className={cn(
                      "size-2 rounded-[1px] transition-colors duration-200 sm:size-2.5",
                      themeConfig.levels[levelIndex(level)]
                    )}
                  />
                ))}
              </span>
              <span className="opacity-50">More</span>
            </button>

            <AnimatePresence>
              {allowThemeSelection && isPopoverOpen && (
                <motion.div
                  key="theme-popover"
                  role="dialog"
                  aria-label="Contribution palette"
                  initial={{ opacity: 0, scale: 0.96, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="border-border bg-card/95 text-foreground absolute right-0 bottom-full z-50 mb-2 w-48 origin-bottom-right rounded-lg border p-2 shadow-lg backdrop-blur-md"
                >
                  <div className="text-muted-foreground mb-1.5 flex items-center justify-between px-1 text-[10px] font-medium">
                    <span>Palette</span>
                    <span className="text-foreground font-semibold capitalize">
                      {themeConfig.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(
                      Object.entries(THEMES) as [
                        ContributionTheme,
                        ThemeConfig,
                      ][]
                    ).map(([key, cfg]) => {
                      const selected = activeTheme === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => onThemeChange(key)}
                          aria-pressed={selected}
                          className={cn(
                            "flex cursor-pointer flex-col items-center gap-1 rounded-md p-1.5 text-[9px] font-medium transition-colors",
                            selected
                              ? "text-foreground bg-neutral-100 shadow-xs ring-1 ring-neutral-300 dark:bg-neutral-800 dark:ring-neutral-700"
                              : "text-muted-foreground hover:text-foreground hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60"
                          )}
                        >
                          <span className="flex gap-0.5" aria-hidden>
                            {cfg.levels.map((lvlClass, idx) => (
                              <span
                                key={idx}
                                className={cn(
                                  "size-1.5 rounded-[1px]",
                                  lvlClass
                                )}
                              />
                            ))}
                          </span>
                          <span>{cfg.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
  );

ContributionThemePopover.displayName = "ContributionThemePopover";
