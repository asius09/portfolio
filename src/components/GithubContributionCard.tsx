"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "cn";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { IconX, IconPointer, IconExternalLink } from "@tabler/icons-react";

export interface ContributionDay {
  date: string;
  count: number;
}

export interface WeekData {
  weekNumber: number;
  startDate: string;
  endDate: string;
  rangeShort: string;
  rangeLong: string;
  commits: number;
  activeDays: number;
  maxDayCount: number;
  isFuture: boolean;
  isCurrent: boolean;
  heat: number;
  rotation: number;
  days: ContributionDay[];
}

export interface GithubContributionCardProps {
  username?: string;
  endpoint?: string;
  data?: ContributionDay[];
  totalContributions?: number;
  className?: string;
}

// Organic rotation map matching handwritten tally styling
const ROTATIONS: Record<number, number> = {
  1: 5,
  3: -5,
  5: 5,
  8: -5,
  11: 5,
  14: -5,
  18: 5,
  21: -5,
  25: 5,
  28: -5,
  32: 5,
  35: -5,
  38: 5,
  42: -5,
  46: 5,
  49: -5,
};

function formatRangeShort(startStr: string, endStr: string): string {
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return `${startStr} - ${endStr}`;
  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}`;
  }
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
}

function formatRangeLong(startStr: string, endStr: string): string {
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return `${startStr} - ${endStr}`;
  const startFormatted = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const endFormatted = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${startFormatted} - ${endFormatted}`;
}

export const GithubContributionCard: React.FC<GithubContributionCardProps> = ({
  username = "asius09",
  endpoint = "/api/github/contributions",
  data: initialData,
  totalContributions: initialTotal,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>(
    initialData || [],
  );
  const [totalCount, setTotalCount] = useState<number>(initialTotal || 0);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(false);
  const [activeWeekNumber, setActiveWeekNumber] = useState<number | null>(null);
  const [hoveredWeek, setHoveredWeek] = useState<{
    week: WeekData;
    x: number;
  } | null>(null);

  useEffect(() => {
    if (initialData) {
      setContributions(initialData);
      setTotalCount(
        initialTotal ?? initialData.reduce((acc, c) => acc + c.count, 0),
      );
      setLoading(false);
      return;
    }

    const fetchContributions = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setContributions(data.contributions || []);
        setTotalCount(data.totalContributions || 0);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, [endpoint, initialData, initialTotal]);

  const weeksData = useMemo<WeekData[]>(() => {
    const totalSlots = 52 * 7;
    let daysSlice = contributions;

    if (daysSlice.length > totalSlots) {
      daysSlice = daysSlice.slice(daysSlice.length - totalSlots);
    } else if (daysSlice.length < totalSlots) {
      const padding = totalSlots - daysSlice.length;
      const emptyDays: ContributionDay[] = Array.from({ length: padding }, () => ({
        date: "",
        count: 0,
      }));
      daysSlice = [...emptyDays, ...daysSlice];
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const calculatedWeeks: WeekData[] = [];
    let maxWeeklyCommits = 1;

    for (let w = 0; w < 52; w++) {
      const weekDays = daysSlice.slice(w * 7, (w + 1) * 7);
      const commits = weekDays.reduce((acc, d) => acc + d.count, 0);
      if (commits > maxWeeklyCommits) maxWeeklyCommits = commits;

      const firstDate = weekDays.find((d) => d.date)?.date || "";
      const lastDate = [...weekDays].reverse().find((d) => d.date)?.date || firstDate;

      const startDate = firstDate ? new Date(firstDate) : new Date();
      const endDate = lastDate ? new Date(lastDate) : startDate;
      endDate.setHours(23, 59, 59, 999);

      const isCurrent = today >= startDate && today <= endDate;
      const isFuture = startDate > today;
      const activeDays = weekDays.filter((d) => d.count > 0).length;
      const maxDayCount = Math.max(0, ...weekDays.map((d) => d.count));

      calculatedWeeks.push({
        weekNumber: w + 1,
        startDate: firstDate,
        endDate: lastDate,
        rangeShort: firstDate ? formatRangeShort(firstDate, lastDate) : `Week ${w + 1}`,
        rangeLong: firstDate ? formatRangeLong(firstDate, lastDate) : `Week ${w + 1}`,
        commits,
        activeDays,
        maxDayCount,
        isFuture,
        isCurrent,
        heat: commits,
        rotation: ROTATIONS[w + 1] ?? 0,
        days: weekDays,
      });
    }

    return calculatedWeeks.map((week) => ({
      ...week,
      heat: Math.round((week.commits / maxWeeklyCommits) * 100),
    }));
  }, [contributions]);

  const activeWeek = useMemo(() => {
    if (activeWeekNumber === null) return null;
    return weeksData.find((w) => w.weekNumber === activeWeekNumber) ?? null;
  }, [activeWeekNumber, weeksData]);

  const handleBarEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    week: WeekData,
  ) => {
    const container = containerRef.current;
    if (!container) return;
    const targetRect = e.currentTarget.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const x = targetRect.left - containerRect.left + targetRect.width / 2;
    setHoveredWeek({ week, x });
  };

  const handleBarClick = (week: WeekData) => {
    setActiveWeekNumber((prev) => (prev === week.weekNumber ? null : week.weekNumber));
  };

  if (error) return null;

  return (
    <section
      id="github-contributions-section"
      className={cn("mt-12 w-full", className)}
      aria-label="GitHub Contributions"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setActiveWeekNumber(null);
          setHoveredWeek(null);
        }
      }}
    >
      <div className="w-full">
        {/* Tally Bar Strip Container */}
        <div
          ref={containerRef}
          className="relative py-4 select-none"
          onMouseLeave={() => setHoveredWeek(null)}
        >
          {/* Floating Hover Tooltip */}
          <AnimatePresence>
            {hoveredWeek && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                style={{
                  left: `${hoveredWeek.x}px`,
                  transform: "translate(-50%, -100%)",
                }}
                className="pointer-events-none absolute -top-3 z-50"
              >
                <div className="relative flex w-36 flex-col rounded-lg border border-border/80 bg-background/95 p-2 shadow-xl backdrop-blur-md">
                  <div className="space-y-0.5">
                    <p className="text-foreground text-xs font-semibold">
                      {hoveredWeek.week.rangeShort}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {hoveredWeek.week.commits}{" "}
                      {hoveredWeek.week.commits === 1 ? "commit" : "commits"}
                    </p>
                    <p className="text-muted-foreground/80 text-[11px]">
                      {hoveredWeek.week.activeDays}{" "}
                      {hoveredWeek.week.activeDays === 1 ? "active day" : "active days"}
                    </p>
                  </div>

                  <div className="my-1.5 h-px w-full bg-border/60" />

                  <div className="text-muted-foreground flex items-center justify-between text-[11px]">
                    <span>Click me!</span>
                    <IconPointer className="size-3 text-muted-foreground" />
                  </div>

                  {/* Tooltip bottom pointer arrow */}
                  <div className="border-border/80 bg-background/95 absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-r border-b backdrop-blur-md" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 52 Tally Bars */}
          <div className="flex w-full items-center justify-between gap-[2px] sm:gap-1">
            {weeksData.map((week) => {
              const isActive = activeWeekNumber === week.weekNumber;
              const hasActive = activeWeekNumber !== null;
              const hasActivity = week.commits > 0;

              return (
                <button
                  key={week.weekNumber}
                  type="button"
                  tabIndex={week.isFuture ? -1 : 0}
                  onClick={() => handleBarClick(week)}
                  onMouseEnter={(e) => handleBarEnter(e, week)}
                  aria-label={`${week.rangeShort}: ${week.commits} commits`}
                  className={cn(
                    "group relative flex cursor-pointer items-center justify-center focus-visible:outline-none",
                    week.isFuture && "pointer-events-none opacity-20",
                  )}
                >
                  {/* Invisible expanded hit target (12px wide x 48px tall) for effortless hovering */}
                  <span className="absolute -top-3 -bottom-3 -left-1 -right-1 z-10 block" />

                  {/* Vertical Tally Line */}
                  <span
                    style={{
                      transform: `rotate(${week.rotation}deg)`,
                    }}
                    className={cn(
                      "block h-9 sm:h-9.5 w-0.5 lg:w-0.75 rounded-full transition-all duration-150 ease-out",
                      // Color and Activity
                      hasActivity
                        ? "bg-blue-600 dark:bg-blue-500 shadow-[0_0_2px_rgba(59,130,246,0.25)]"
                        : "bg-neutral-200 dark:bg-neutral-800",
                      // Hover state
                      "group-hover:scale-y-115 group-hover:brightness-125",
                      // Active Selection
                      isActive
                        ? "!bg-blue-500 !opacity-100 !scale-y-120 shadow-[0_0_8px_rgba(59,130,246,0.6)] ring-1 ring-blue-400"
                        : hasActive
                          ? "opacity-35"
                          : "opacity-100",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Expandable Details Drawer */}
        <AnimatePresence>
          {activeWeek && (
            <motion.div
              key="active-week-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="border-border/60 bg-card/40 mt-3 rounded-lg border p-4 backdrop-blur-xs">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/40">
                  <span className="text-sm font-medium text-foreground">
                    {activeWeek.rangeLong}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveWeekNumber(null)}
                    aria-label="Close details"
                    className="text-muted-foreground hover:text-foreground cursor-pointer rounded-sm p-1 transition-colors"
                  >
                    <IconX className="size-4" />
                  </button>
                </div>

                {/* Drawer Body Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 text-xs">
                  {/* Left Column: Code Activity */}
                  <div className="space-y-1.5">
                    <p className="font-semibold text-foreground text-[11px] uppercase tracking-wider">
                      Code Activity
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        {activeWeek.commits}
                      </span>{" "}
                      {activeWeek.commits === 1 ? "commit" : "commits"} across repositories
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        {activeWeek.activeDays}
                      </span>{" "}
                      out of 7 active days this week
                    </p>
                    {activeWeek.maxDayCount > 0 && (
                      <p className="text-muted-foreground">
                        Peak:{" "}
                        <span className="text-foreground font-medium">
                          {activeWeek.maxDayCount}
                        </span>{" "}
                        contributions in a single day
                      </p>
                    )}
                  </div>

                  {/* Right Column: GitHub Link & Year Overview */}
                  <div className="space-y-1.5 sm:border-l sm:border-border/40 sm:pl-4">
                    <p className="font-semibold text-foreground text-[11px] uppercase tracking-wider">
                      GitHub Profile
                    </p>
                    <p className="text-muted-foreground">
                      Total yearly activity:{" "}
                      <span className="text-foreground font-medium">
                        {loading ? "..." : totalCount.toLocaleString()}
                      </span>{" "}
                      contributions
                    </p>
                    <div className="pt-1">
                      <Link
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        <span>View profile on GitHub</span>
                        <IconExternalLink className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
