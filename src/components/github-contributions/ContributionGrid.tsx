import React from "react";
import { motion } from "motion/react";
import { cn } from "cn";
import { itemVariants } from "./constants";
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
  viewAnimState: "animate" | "hidden";
  onShowTooltip: ShowTooltipFn;
}

export const ContributionGrid: React.FC<ContributionGridProps> = React.memo(
  ({
    weeksData,
    themeConfig,
    activeTheme,
    waveKey,
    waveInitialState,
    viewAnimState,
    onShowTooltip,
  }) => {
    return (
      <div className="w-full min-w-0 select-none">
        <motion.div
          key={`grid-${activeTheme}-${waveKey}`}
          initial={waveInitialState}
          animate={viewAnimState}
          className="flex w-full justify-between gap-px sm:gap-0.5"
        >
          {weeksData.map((week, weekIndex) => (
            <motion.div
              key={week.weekNumber}
              custom={weekIndex}
              variants={itemVariants}
              className="flex min-w-0 flex-1 flex-col gap-px sm:gap-0.5"
            >
              {week.days.map((day, dayIndex) => {
                const label = day.date ? formatDayLabel(day.date) : "No data";
                const count = day.count || 0;

                return (
                  <div
                    key={dayIndex}
                    role="img"
                    aria-label={`${count} contributions on ${label}`}
                    onMouseEnter={(e) =>
                      showTooltipIfValid(e.currentTarget, label, count, day.date)
                    }
                    onClick={(e) =>
                      showTooltipIfValid(e.currentTarget, label, count, day.date)
                    }
                    className={cn(
                      "aspect-square w-full origin-center cursor-pointer touch-manipulation rounded-xs shadow-xs transition-[scale] duration-150 ease-out sm:hover:z-20 sm:hover:scale-125 sm:hover:ring-1",
                      themeConfig.activeRing,
                      themeConfig.levels[levelIndex(count)],
                      (!day || !day.date) && "pointer-events-none opacity-20"
                    )}
                  />
                );

                function showTooltipIfValid(
                  target: HTMLElement,
                  dayLabel: string,
                  dayCount: number,
                  dateStr: string
                ) {
                  if (!dateStr) return;
                  onShowTooltip(target, dayLabel, dayCount);
                }
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

ContributionGrid.displayName = "ContributionGrid";
