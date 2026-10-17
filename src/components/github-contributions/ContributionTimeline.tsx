import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "cn";
import { itemVariants, MAX_STAGGER_DELAY } from "./constants";
import { weeklyLevelIndex } from "./utils";
import { ContributionWeekDetail } from "./ContributionWeekDetail";
import type {
  WeekData,
  ThemeConfig,
  ContributionTheme,
  ShowTooltipFn,
} from "./types";

interface ContributionTimelineProps {
  weeksData: WeekData[];
  themeConfig: ThemeConfig;
  activeTheme: ContributionTheme;
  waveKey: number;
  waveInitialState: "themeShift" | "hidden";
  viewAnimState: "animate" | "hidden";
  shouldAnimate: boolean;
  activeWeekNumber: number | null;
  onSelectWeek: (weekNumber: number) => void;
  onCloseWeek: () => void;
  totalCount: number;
  username: string;
  onShowTooltip: ShowTooltipFn;
}

export const ContributionTimeline: React.FC<ContributionTimelineProps> =
  React.memo(
    ({
      weeksData,
      themeConfig,
      activeTheme,
      waveKey,
      waveInitialState,
      viewAnimState,
      shouldAnimate,
      activeWeekNumber,
      onSelectWeek,
      onCloseWeek,
      totalCount,
      username,
      onShowTooltip,
    }) => {
      const activeWeek = useMemo(
        () =>
          activeWeekNumber === null
            ? null
            : (weeksData.find((w) => w.weekNumber === activeWeekNumber) ?? null),
        [activeWeekNumber, weeksData]
      );

      const getTickGlow = (commits: number, index: number) => {
        if (!shouldAnimate || commits < 2) return undefined;
        const resting =
          themeConfig.glowRestingShadow === "none"
            ? "0 0 0px rgba(0, 0, 0, 0)"
            : themeConfig.glowRestingShadow;
        const isMax = commits >= 10;
        return {
          animate: {
            boxShadow: isMax
              ? [
                  "0 0 0px rgba(0, 0, 0, 0)",
                  themeConfig.glowBoxShadow,
                  resting,
                ]
              : [
                  "0 0 0px rgba(0, 0, 0, 0)",
                  resting,
                  "0 0 0px rgba(0, 0, 0, 0)",
                ],
            opacity: [0.8, 1, 1],
          },
          transition: {
            delay: Math.min(index * 0.008, MAX_STAGGER_DELAY),
            duration: 0.35,
            times: [0, 0.45, 1],
            ease: "easeOut" as const,
          },
        };
      };

      return (
        <div className="w-full min-w-0 select-none">
          <motion.div
            key={`timeline-${activeTheme}-${waveKey}`}
            initial={waveInitialState}
            animate={viewAnimState}
            className="flex w-full items-stretch justify-between gap-px sm:gap-0.5"
          >
            {weeksData.map((week, idx) => {
              const isActive = activeWeekNumber === week.weekNumber;
              const dimmed = activeWeekNumber !== null && !isActive;
              const glow = getTickGlow(week.commits, idx);

              return (
                <motion.button
                  key={week.weekNumber}
                  custom={idx}
                  variants={itemVariants}
                  type="button"
                  tabIndex={week.isFuture ? -1 : 0}
                  onClick={() => onSelectWeek(week.weekNumber)}
                  onMouseEnter={(e) =>
                    onShowTooltip(
                      e.currentTarget,
                      week.rangeShort,
                      week.commits,
                      week.activeDays
                    )
                  }
                  onFocus={(e) =>
                    onShowTooltip(
                      e.currentTarget,
                      week.rangeShort,
                      week.commits,
                      week.activeDays
                    )
                  }
                  aria-label={`${week.rangeShort}: ${week.commits} commits`}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative flex min-w-0 flex-1 cursor-pointer items-center justify-center focus-visible:outline-none",
                    week.isFuture && "pointer-events-none opacity-20"
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -inset-y-3.5 z-10 block"
                  />
                  <motion.span
                    aria-hidden
                    animate={glow?.animate}
                    transition={glow?.transition}
                    style={{
                      transform: `rotate(${week.rotation}deg)`,
                    }}
                    className={cn(
                      "block h-9 w-full max-w-1 rounded-full transition-[opacity,scale,filter] duration-150 ease-out",
                      week.commits === 0
                        ? "bg-neutral-200 dark:bg-neutral-800"
                        : themeConfig.levels[
                            weeklyLevelIndex(week.commits, week.heat)
                          ],
                      "group-hover:scale-y-110 group-hover:brightness-125",
                      isActive
                        ? "scale-y-125 opacity-100 ring-1 ring-blue-400"
                        : dimmed
                          ? "opacity-35"
                          : "opacity-100"
                    )}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          <AnimatePresence initial={false}>
            {activeWeek && (
              <ContributionWeekDetail
                week={activeWeek}
                totalCount={totalCount}
                username={username}
                onClose={onCloseWeek}
              />
            )}
          </AnimatePresence>
        </div>
      );
    }
  );

ContributionTimeline.displayName = "ContributionTimeline";
