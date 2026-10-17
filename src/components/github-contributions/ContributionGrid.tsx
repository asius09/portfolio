import React from "react";
import { motion } from "motion/react";
import { cn } from "cn";
import { formatDayLabel, levelIndex } from "./utils";
import type {
  WeekData,
  ThemeConfig,
  ContributionTheme,
  ShowTooltipFn,
} from "./types";

interface ContributionGridProps {
  weeksData: WeekData[];
  themeConfig: ThemeConfig;
  activeTheme: ContributionTheme;
  waveKey: number;
  waveInitialState: "themeShift" | "hidden";
  shouldAnimate: boolean;
  onShowTooltip: ShowTooltipFn;
}

export const ContributionGrid: React.FC<ContributionGridProps> = React.memo(
  ({
    weeksData,
    themeConfig,
    activeTheme,
    waveKey,
    waveInitialState,
    shouldAnimate,
    onShowTooltip,
  }) => {
    return (
      <div className="w-full min-w-0 select-none">
        <div
          key={`grid-${activeTheme}-${waveKey}`}
          className="flex w-full justify-between gap-px sm:gap-0.5"
        >
          {weeksData.map((week, weekIndex) => {
            const initialBlur = Number(
              (0.4 + (weekIndex / 51) * 1.6).toFixed(2)
            );

            return (
              <div
                key={week.weekNumber}
                className="flex min-w-0 flex-1 flex-col gap-px sm:gap-0.5"
              >
                {week.days.map((day, dayIndex) => {
                  const label = day.date ? formatDayLabel(day.date) : "No data";
                  const count = day.count || 0;
                  const lvl = levelIndex(count);
                  const glow = themeConfig.gridGlows[lvl];
                  const hasDate = Boolean(day && day.date);
                  const brightVal =
                    lvl === 4
                      ? 2.2
                      : lvl === 3
                        ? 1.85
                        : lvl === 2
                          ? 1.55
                          : 1.35;

                  const boxAnimation = shouldAnimate
                    ? {
                        opacity: [0, 1, 1],
                        filter:
                          lvl > 0
                            ? [
                                `blur(${initialBlur}px) brightness(1)`,
                                `blur(0px) brightness(${brightVal})`,
                                "blur(0px) brightness(1)",
                              ]
                            : [
                                `blur(${initialBlur}px)`,
                                "blur(0px)",
                                "blur(0px)",
                              ],
                        boxShadow:
                          lvl === 0 || glow === "none"
                            ? ["none", "none", "none"]
                            : ["none", glow, "none"],
                      }
                    : undefined;

                  const boxTransition = shouldAnimate
                    ? {
                        duration: 0.45,
                        delay: weekIndex * 0.02,
                        times: [0, 0.4, 1],
                        ease: [0.25, 1, 0.5, 1] as const,
                      }
                    : undefined;

                  return (
                    <motion.div
                      key={dayIndex}
                      role="img"
                      aria-label={`${count} contributions on ${label}`}
                      initial={
                        shouldAnimate
                          ? waveInitialState === "themeShift"
                            ? { opacity: 0.4, filter: "blur(1px)" }
                            : {
                                opacity: 0,
                                filter: `blur(${initialBlur}px)`,
                              }
                          : { opacity: 1, filter: "blur(0px)" }
                      }
                      animate={boxAnimation}
                      transition={boxTransition}
                      onMouseEnter={(e) => {
                        if (!hasDate) return;
                        onShowTooltip(e.currentTarget, label, count);
                      }}
                      onClick={(e) => {
                        if (!hasDate) return;
                        onShowTooltip(e.currentTarget, label, count);
                      }}
                      className={cn(
                        "aspect-square w-full origin-center cursor-pointer touch-manipulation rounded-[2px] shadow-xs transition-transform duration-150 ease-out sm:hover:z-20 sm:hover:scale-125 sm:hover:ring-1",
                        themeConfig.activeRing,
                        themeConfig.levels[lvl],
                        !hasDate && "pointer-events-none opacity-20"
                      )}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ContributionGrid.displayName = "ContributionGrid";
