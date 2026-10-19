import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "cn";
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

      return (
        <div className="w-full min-w-0 select-none">
          <div
            key={`timeline-${activeTheme}-${waveKey}`}
            className="flex w-full items-stretch justify-between gap-px sm:gap-0.5"
          >
            {weeksData.map((week, idx) => {
              const isActive = activeWeekNumber === week.weekNumber;
              const dimmed = activeWeekNumber !== null && !isActive;
              const lvl = weeklyLevelIndex(week.commits, week.heat);
              const isMax = week.commits >= 10;
              const peakGlow = themeConfig.timelineGlows[lvl];
              const restingGlow =
                isMax && themeConfig.glowRestingShadow !== "none"
                  ? themeConfig.glowRestingShadow
                  : "none";

              const barAnimation = shouldAnimate
                ? {
                    opacity: [0, 1, 1],
                    scaleY: [0.6, 1.22, 1],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                    boxShadow:
                      week.commits === 0 || peakGlow === "none"
                        ? ["none", "none", "none"]
                        : ["none", peakGlow, restingGlow],
                  }
                : undefined;

              const barTransition = shouldAnimate
                ? {
                    duration: 0.28,
                    delay: idx * 0.012,
                    times: [0, 0.45, 1],
                    ease: "easeOut" as const,
                  }
                : undefined;

              return (
                <button
                  key={week.weekNumber}
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
                    initial={
                      shouldAnimate
                        ? waveInitialState === "themeShift"
                          ? { opacity: 0.4, scaleY: 0.85 }
                          : { opacity: 0, scaleY: 0.6 }
                        : { opacity: 1, scaleY: 1 }
                    }
                    animate={barAnimation}
                    transition={barTransition}
                    style={{
                      transformOrigin: "center",
                      rotate: `${week.rotation}deg`,
                    }}
                    className={cn(
                      "block h-9 w-full max-w-1 rounded-full transition-[opacity,scale] duration-150 ease-out",
                      week.commits === 0
                        ? "bg-neutral-200 dark:bg-neutral-800"
                        : themeConfig.levels[lvl],
                      "group-hover:scale-y-110 group-hover:brightness-125",
                      isActive
                        ? "scale-y-125 opacity-100 ring-1 ring-blue-400"
                        : dimmed
                          ? "opacity-35"
                          : "opacity-100"
                    )}
                  />
                </button>
              );
            })}
          </div>

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
