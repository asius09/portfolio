"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "motion/react";
import { cn } from "cn";
import { formatDate } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
import {
  IconX,
  IconExternalLink,
  IconLayoutGrid,
  IconChartBar,
} from "@tabler/icons-react";

export type ContributionTheme =
  | "blue"
  | "green"
  | "violet"
  | "amber"
  | "rose"
  | "monochrome";

export type ContributionViewMode = "timeline" | "grid";

export interface ThemeConfig {
  name: ContributionTheme;
  label: string;
  levels: [string, string, string, string, string];
  glowBoxShadow: string;
  glowRestingShadow: string;
  accentText: string;
  activeRing: string;
}

export const THEMES: Record<ContributionTheme, ThemeConfig> = {
  blue: {
    name: "blue",
    label: "Blue",
    levels: [
      "bg-blue-950/5 dark:bg-blue-500/10",
      "bg-blue-500/25 dark:bg-blue-500/30",
      "bg-blue-500/50 dark:bg-blue-500/55",
      "bg-blue-500/75 dark:bg-blue-500/85",
      "bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.35)] dark:bg-blue-500 dark:shadow-[0_0_6px_rgba(59,130,246,0.5)]",
    ],
    glowBoxShadow: "0 0 5px 1.5px rgba(96, 165, 250, 0.85)",
    glowRestingShadow: "0 0 3px 0px rgba(37, 99, 235, 0.35)",
    accentText: "text-blue-600 dark:text-blue-400",
    activeRing: "hover:ring-blue-400/70 dark:hover:ring-blue-400/70",
  },
  green: {
    name: "green",
    label: "Green",
    levels: [
      "bg-emerald-950/5 dark:bg-emerald-500/10",
      "bg-emerald-500/25 dark:bg-emerald-500/30",
      "bg-emerald-500/50 dark:bg-emerald-500/55",
      "bg-emerald-500/75 dark:bg-emerald-500/85",
      "bg-emerald-600 shadow-[0_0_6px_rgba(16,185,129,0.35)] dark:bg-emerald-500 dark:shadow-[0_0_6px_rgba(16,185,129,0.5)]",
    ],
    glowBoxShadow: "0 0 5px 1.5px rgba(52, 211, 153, 0.85)",
    glowRestingShadow: "0 0 3px 0px rgba(16, 185, 129, 0.35)",
    accentText: "text-emerald-600 dark:text-emerald-400",
    activeRing: "hover:ring-emerald-400/70 dark:hover:ring-emerald-400/70",
  },
  violet: {
    name: "violet",
    label: "Violet",
    levels: [
      "bg-purple-950/5 dark:bg-violet-500/10",
      "bg-violet-500/25 dark:bg-violet-500/30",
      "bg-violet-500/50 dark:bg-violet-500/55",
      "bg-violet-500/75 dark:bg-violet-500/85",
      "bg-violet-600 shadow-[0_0_6px_rgba(147,51,234,0.35)] dark:bg-violet-500 dark:shadow-[0_0_6px_rgba(168,85,247,0.5)]",
    ],
    glowBoxShadow: "0 0 5px 1.5px rgba(192, 132, 252, 0.85)",
    glowRestingShadow: "0 0 3px 0px rgba(147, 51, 234, 0.35)",
    accentText: "text-violet-600 dark:text-violet-400",
    activeRing: "hover:ring-violet-400/70 dark:hover:ring-violet-400/70",
  },
  amber: {
    name: "amber",
    label: "Amber",
    levels: [
      "bg-amber-950/5 dark:bg-amber-500/10",
      "bg-amber-500/25 dark:bg-amber-500/30",
      "bg-amber-500/50 dark:bg-amber-500/55",
      "bg-amber-500/75 dark:bg-amber-500/85",
      "bg-amber-600 shadow-[0_0_6px_rgba(217,119,6,0.35)] dark:bg-amber-500 dark:shadow-[0_0_6px_rgba(245,158,11,0.5)]",
    ],
    glowBoxShadow: "0 0 5px 1.5px rgba(251, 191, 36, 0.85)",
    glowRestingShadow: "0 0 3px 0px rgba(245, 158, 11, 0.35)",
    accentText: "text-amber-600 dark:text-amber-400",
    activeRing: "hover:ring-amber-400/70 dark:hover:ring-amber-400/70",
  },
  rose: {
    name: "rose",
    label: "Rose",
    levels: [
      "bg-rose-950/5 dark:bg-rose-500/10",
      "bg-rose-500/25 dark:bg-rose-500/30",
      "bg-rose-500/50 dark:bg-rose-500/55",
      "bg-rose-500/75 dark:bg-rose-500/85",
      "bg-rose-600 shadow-[0_0_6px_rgba(225,29,72,0.35)] dark:bg-rose-500 dark:shadow-[0_0_6px_rgba(244,63,94,0.5)]",
    ],
    glowBoxShadow: "0 0 5px 1.5px rgba(251, 113, 133, 0.85)",
    glowRestingShadow: "0 0 3px 0px rgba(225, 29, 72, 0.35)",
    accentText: "text-rose-600 dark:text-rose-400",
    activeRing: "hover:ring-rose-400/70 dark:hover:ring-rose-400/70",
  },
  monochrome: {
    name: "monochrome",
    label: "Mono",
    levels: [
      "bg-zinc-950/5 dark:bg-white/5",
      "bg-zinc-400/35 dark:bg-zinc-600/40",
      "bg-zinc-500/60 dark:bg-zinc-400/60",
      "bg-zinc-700/80 dark:bg-zinc-200/85",
      "bg-zinc-900 shadow-[0_0_6px_rgba(24,24,27,0.25)] dark:bg-white dark:shadow-[0_0_6px_rgba(255,255,255,0.45)]",
    ],
    glowBoxShadow: "0 0 5px 1.5px rgba(115, 115, 115, 0.85)",
    glowRestingShadow: "0 0 3px 0px rgba(115, 115, 115, 0.35)",
    accentText: "text-neutral-900 dark:text-zinc-100",
    activeRing: "hover:ring-neutral-400/70 dark:hover:ring-zinc-400/70",
  },
};

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
  animate?: boolean;
  theme?: ContributionTheme;
  defaultView?: ContributionViewMode;
  allowThemeSelection?: boolean;
  onThemeChange?: (theme: ContributionTheme) => void;
  onViewChange?: (view: ContributionViewMode) => void;
}

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

// Section-level translate & blur animation matching Hero, About, and Experience
const sectionFadeInUpInitial = {
  y: 12,
  opacity: 0,
  filter: "blur(8px)",
};

const sectionFadeInUpAnimate = {
  y: 0,
  opacity: 1,
  filter: "blur(0px)",
};

const sectionSpringTransition: Transition = {
  duration: 0.18,
  ease: [0.4, 0, 0.2, 1],
  type: "spring",
  stiffness: 160,
  damping: 16,
};

// View switch transition: smooth blur, translate, and opacity
const viewSwitchTransition: Transition = {
  duration: 0.22,
  ease: [0.25, 0.1, 0.25, 1],
  type: "spring",
  stiffness: 190,
  damping: 19,
};

const columnVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.08,
      delay: i * 0.012,
      ease: "linear",
    },
  }),
};

const VIEW_MODES = [
  { id: "timeline", label: "Timeline", Icon: IconChartBar },
  { id: "grid", label: "Grid", Icon: IconLayoutGrid },
] as const;

const COMPACT_QUERY = "(max-width: 639px)";
const SCROLL_GRAPH_WIDTH = 640;

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
  return `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} - ${end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

export const GithubContributionCard: React.FC<GithubContributionCardProps> = ({
  username = "asius09",
  endpoint = "/api/github/contributions",
  data: initialData,
  totalContributions: initialTotal,
  className,
  animate = true,
  theme = "blue",
  defaultView = "timeline",
  allowThemeSelection = true,
  onThemeChange,
  onViewChange,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const isCompact = useMediaQuery(COMPACT_QUERY);

  const [viewMode, setViewMode] = useState<ContributionViewMode>(defaultView);
  const [activeTheme, setActiveTheme] = useState<ContributionTheme>(theme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [contributions, setContributions] = useState<ContributionDay[]>(
    initialData || [],
  );
  const [totalCount, setTotalCount] = useState<number>(initialTotal || 0);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(false);

  // Active week in Timeline view
  const [activeWeekNumber, setActiveWeekNumber] = useState<number | null>(null);

  // Restore stored view mode if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem("github-contributions-view") as ContributionViewMode;
      if (stored === "timeline" || stored === "grid") {
        setViewMode(stored);
      }
    } catch {}
  }, []);

  const handleViewModeChange = (mode: ContributionViewMode) => {
    setViewMode(mode);
    onViewChange?.(mode);
    try {
      localStorage.setItem("github-contributions-view", mode);
    } catch {}
  };

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  // Click outside to close theme popover
  useEffect(() => {
    if (!isPopoverOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPopoverOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopoverOpen]);

  // Fetch contributions
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

  // Compute 52 weeks for Timeline view
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

  // Compute month labels for Grid view
  const monthLabels = useMemo(() => {
    if (contributions.length === 0) return [];
    const totalSlots = 52 * 7;
    const startIndex = Math.max(0, contributions.length - totalSlots);
    const visibleData = contributions.slice(startIndex);

    const labels: { name: string; col: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < 52; w++) {
      const dayData = visibleData[w * 7];
      if (dayData) {
        const date = new Date(dayData.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            name: date.toLocaleString("default", { month: "short" }),
            col: w,
          });
          lastMonth = month;
        }
      }
    }

    return labels.filter((label, idx, arr) => {
      if (idx === 0) {
        const next = arr[1];
        if (next && next.col - label.col < 3) return false;
        return true;
      }
      return true;
    });
  }, [contributions]);

  const weeks = Array.from({ length: 52 });
  const days = Array.from({ length: 7 });

  const currentThemeConfig = THEMES[activeTheme] || THEMES.blue;

  const getLevelIndex = (count: number): number => {
    if (count >= 10) return 4;
    if (count >= 6) return 3;
    if (count >= 3) return 2;
    if (count >= 1) return 1;
    return 0;
  };

  const getLevelClass = (count: number, themeKey: ContributionTheme) => {
    const activeCfg = THEMES[themeKey] || THEMES.blue;
    return activeCfg.levels[getLevelIndex(count)];
  };

  const getGlowAnimation = (count: number, weekIndex: number) => {
    if (!animate || count < 10) return undefined;
    return {
      animate: {
        boxShadow: [
          "0 0 0px rgba(0, 0, 0, 0)",
          currentThemeConfig.glowBoxShadow,
          currentThemeConfig.glowRestingShadow,
        ],
        filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"],
      },
      transition: {
        delay: weekIndex * 0.012 + 0.01,
        duration: 0.14,
        times: [0, 0.35, 1],
        ease: "easeOut" as const,
      },
    };
  };

  const getDayData = (weekIndex: number, dayIndex: number) => {
    const totalSlots = 52 * 7;
    const startIndex = contributions.length - totalSlots;
    const currentIdx = startIndex + (weekIndex * 7 + dayIndex);

    if (currentIdx < 0 || !contributions[currentIdx]) {
      return { date: "No data", count: 0 };
    }
    return contributions[currentIdx];
  };

  if (error) return null;

  return (
    <motion.section
      id="github-contributions-section"
      className={cn("mt-12 w-full", className)}
      aria-label="GitHub Contributions"
      tabIndex={-1}
      initial={sectionFadeInUpInitial}
      whileInView={sectionFadeInUpAnimate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        ...sectionSpringTransition,
        delay: 0.02,
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setActiveWeekNumber(null);
        }
      }}
    >
      <div className="bg-background/40 w-full rounded-lg backdrop-blur-xs">
        <div className="flex w-full flex-col gap-3">
          {/* Header Bar with View Switcher styled matching Project section */}
          <div className="flex items-center justify-between px-1">
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="text-foreground font-semibold">
                {loading ? "..." : totalCount.toLocaleString()} contributions
              </span>
              <span className="opacity-40 select-none">•</span>
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1 transition-colors hover:underline"
              >
                <span>GitHub</span>
                <IconExternalLink className="size-3" />
              </Link>
            </div>

            {/* View Mode Switcher Toggle matching Project section */}
            <div className="relative flex items-center gap-0.5 rounded-md border border-border/50 bg-card p-0.5 shadow-xs dark:border-white/10 dark:bg-neutral-900">
              {VIEW_MODES.map(({ id, label, Icon }) => {
                const isSelected = viewMode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleViewModeChange(id as ContributionViewMode)}
                    aria-label={`${label} view`}
                    className={cn(
                      "relative z-10 flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground select-none",
                      isSelected && "text-foreground font-medium",
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-contribution-view-tab"
                        className="absolute inset-0 z-[-1] rounded bg-neutral-200/60 dark:bg-neutral-800"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <Icon className="size-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Smooth animated view transition with blur, translate, relative layout */}
          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {viewMode === "timeline" ? (
                <motion.div
                  key="timeline-view"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={viewSwitchTransition}
                  className="relative w-full"
                >
                  <div className="relative py-4 select-none">
                    {/* 52 Tally Bars with native Tooltip component */}
                    <div className="flex w-full items-center justify-between gap-[2px] sm:gap-1">
                      {weeksData.map((week) => {
                        const isActive = activeWeekNumber === week.weekNumber;
                        const hasActive = activeWeekNumber !== null;
                        const hasActivity = week.commits > 0;

                        return (
                          <Tooltip
                            key={week.weekNumber}
                            delayDuration={50}
                            disabled={week.isFuture}
                          >
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                tabIndex={week.isFuture ? -1 : 0}
                                onClick={() =>
                                  setActiveWeekNumber((prev) =>
                                    prev === week.weekNumber ? null : week.weekNumber,
                                  )
                                }
                                aria-label={`${week.rangeShort}: ${week.commits} commits`}
                                className={cn(
                                  "group relative flex cursor-pointer items-center justify-center focus-visible:outline-none",
                                  week.isFuture && "pointer-events-none opacity-20",
                                )}
                              >
                                {/* Invisible hit target for smooth hover tracking */}
                                <span className="absolute -top-3 -bottom-3 -left-1 -right-1 z-10 block" />

                                {/* Vertical Tally Line */}
                                <span
                                  style={{
                                    transform: `rotate(${week.rotation}deg)`,
                                  }}
                                  className={cn(
                                    "block h-9 sm:h-9.5 w-0.5 lg:w-0.75 rounded-full transition-all duration-150 ease-out",
                                    hasActivity
                                      ? "bg-blue-600 dark:bg-blue-500 shadow-[0_0_2px_rgba(59,130,246,0.25)]"
                                      : "bg-neutral-200 dark:bg-neutral-800",
                                    "group-hover:scale-y-115 group-hover:brightness-125",
                                    isActive
                                      ? "!bg-blue-500 !opacity-100 !scale-y-120 ring-1 ring-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                      : hasActive
                                        ? "opacity-35"
                                        : "opacity-100",
                                  )}
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="px-2.5 py-1.5 shadow-xl">
                              <div className="flex flex-col gap-0.5 text-left">
                                <span className="font-semibold text-[11px] text-zinc-100 dark:text-zinc-900 leading-tight">
                                  {week.rangeShort}
                                </span>
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                                  {week.commits} {week.commits === 1 ? "commit" : "commits"}
                                  {week.activeDays > 0 ? ` • ${week.activeDays}d active` : ""}
                                </span>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>

                    {/* Expandable Details Drawer */}
                    <AnimatePresence>
                      {activeWeek && (
                        <motion.div
                          key="active-week-details"
                          initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                          animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                          exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-border/50 bg-card/60 mt-3 rounded-lg border p-4 shadow-xs backdrop-blur-xs dark:border-white/10 dark:bg-neutral-900/60">
                            <div className="border-border/40 flex items-center justify-between border-b pb-3">
                              <span className="text-foreground text-sm font-medium">
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

                            <div className="grid grid-cols-1 gap-4 pt-3.5 text-xs sm:grid-cols-2">
                              <div className="space-y-1.5">
                                <p className="text-foreground text-[11px] font-semibold tracking-wider uppercase">
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

                              <div className="space-y-1.5 sm:border-border/40 sm:border-l sm:pl-4">
                                <p className="text-foreground text-[11px] font-semibold tracking-wider uppercase">
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
                                    className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:underline dark:text-blue-400"
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
                </motion.div>
              ) : (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={viewSwitchTransition}
                  className="relative w-full"
                >
                  <div className="w-full">
                    <div
                      className={cn(
                        "text-muted-foreground flex items-center gap-1.5 pb-0.5 text-[10px] sm:hidden",
                        isCompact ? "opacity-100" : "hidden",
                      )}
                    >
                      <span className="opacity-60 select-none">&#8596;</span>
                      Swipe to see the full year
                    </div>

                    <div
                      className={cn(
                        "-mx-1 overflow-x-auto px-1",
                        "[-webkit-overflow-scrolling:touch] [scrollbar-width:thin]",
                        isCompact && "snap-x",
                      )}
                    >
                      <div
                        className="w-full"
                        style={isCompact ? { minWidth: SCROLL_GRAPH_WIDTH } : undefined}
                      >
                        <div className="relative h-4 w-full">
                          {monthLabels.map((month, idx) => (
                            <span
                              key={`${month.name}-${idx}`}
                              className="text-muted-foreground absolute text-xs font-medium whitespace-nowrap"
                              style={{ left: `${(month.col / 52) * 100}%` }}
                            >
                              {month.name}
                            </span>
                          ))}
                        </div>

                        <div className="relative flex gap-1">
                          <div className="flex flex-1 justify-between gap-px sm:gap-0.5">
                            {weeks.map((_, weekIndex) => (
                              <motion.div
                                key={weekIndex}
                                custom={weekIndex}
                                initial={animate ? "hidden" : false}
                                animate="visible"
                                variants={columnVariants}
                                className="flex flex-1 flex-col gap-px sm:gap-0.5"
                              >
                                {days.map((_, dayIndex) => {
                                  const dayData = getDayData(weekIndex, dayIndex);
                                  const glow = getGlowAnimation(dayData.count, weekIndex);
                                  const isTop = dayData.count >= 10;
                                  const formattedDate =
                                    dayData.date !== "No data"
                                      ? formatDate(dayData.date)
                                      : "No data";

                                  return (
                                    <Tooltip key={dayIndex} delayDuration={50}>
                                      <TooltipTrigger asChild>
                                        <motion.div
                                          animate={glow?.animate}
                                          transition={glow?.transition}
                                          aria-label={`${dayData.count} contributions on ${dayData.date}`}
                                          className={cn(
                                            "aspect-square w-full origin-center cursor-pointer rounded-xs shadow-xs transition-[transform,background-color,box-shadow] duration-150 ease-out hover:z-20 hover:scale-110 hover:ring-1 active:z-20 active:scale-110 active:ring-1",
                                            currentThemeConfig.activeRing,
                                            isTop && "z-10",
                                            getLevelClass(dayData.count, activeTheme),
                                          )}
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        <span className="font-semibold">{dayData.count}</span>{" "}
                                        {dayData.count === 1 ? "contribution" : "contributions"} on{" "}
                                        {formattedDate}
                                      </TooltipContent>
                                    </Tooltip>
                                  );
                                })}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid Bottom Bar: Palette Picker & Level Legend */}
                    <div className="mt-3 flex flex-row items-center justify-end px-1">
                      <div className="relative flex items-center" ref={popoverRef}>
                        <button
                          type="button"
                          onClick={() =>
                            allowThemeSelection && setIsPopoverOpen((prev) => !prev)
                          }
                          className={cn(
                            "text-muted-foreground flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[9px] transition-colors select-none",
                            allowThemeSelection &&
                              "hover:text-foreground cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800/80",
                          )}
                          title={
                            allowThemeSelection
                              ? "Change contribution color theme"
                              : undefined
                          }
                        >
                          <span className="opacity-50">Less</span>
                          <div className="flex gap-0.5">
                            {[0, 1, 3, 6, 10].map((level) => (
                              <div
                                key={level}
                                className={cn(
                                  "size-2 rounded-[1px] transition-colors duration-200 sm:size-2.5",
                                  getLevelClass(level, activeTheme),
                                )}
                              />
                            ))}
                          </div>
                          <span className="opacity-50">More</span>
                        </button>

                        <AnimatePresence>
                          {allowThemeSelection && isPopoverOpen && (
                            <motion.div
                              key="theme-popover"
                              initial={{ opacity: 0, scale: 0.94, y: 6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.94, y: 6 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              className="border-border bg-card/95 text-foreground absolute right-0 bottom-full z-50 mb-2 w-48 origin-bottom-right rounded-lg border p-2 shadow-lg backdrop-blur-md"
                            >
                              <div className="text-muted-foreground mb-1.5 flex items-center justify-between px-1 text-[10px] font-medium">
                                <span>Palette</span>
                                <span className="text-foreground font-semibold capitalize">
                                  {THEMES[activeTheme]?.label}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-1">
                                {Object.entries(THEMES).map(([key, cfg]) => {
                                  const isSelected = activeTheme === key;
                                  return (
                                    <button
                                      key={key}
                                      type="button"
                                      onClick={() => {
                                        setActiveTheme(key as ContributionTheme);
                                        onThemeChange?.(key as ContributionTheme);
                                        setIsPopoverOpen(false);
                                      }}
                                      className={cn(
                                        "flex cursor-pointer flex-col items-center gap-1 rounded-md p-1.5 text-[9px] font-medium transition-all",
                                        isSelected
                                          ? "text-foreground bg-neutral-100 shadow-xs ring-1 ring-neutral-300 dark:bg-neutral-800 dark:ring-neutral-700"
                                          : "text-muted-foreground hover:text-foreground hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60",
                                      )}
                                    >
                                      <div className="flex gap-0.5">
                                        {cfg.levels.map((lvlClass, idx) => (
                                          <div
                                            key={idx}
                                            className={cn(
                                              "size-1.5 rounded-[1px]",
                                              lvlClass,
                                            )}
                                          />
                                        ))}
                                      </div>
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
