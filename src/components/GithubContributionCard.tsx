"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "motion/react";
import { cn } from "cn";
import { createPortal } from "react-dom";
import fallbackContributions from "@/data/contributionsFallback.json";
import Link from "next/link";
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
      "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.45)] dark:bg-blue-500 dark:shadow-[0_0_10px_rgba(59,130,246,0.6)]",
    ],
    glowBoxShadow:
      "0 0 10px 2.5px rgba(96, 165, 250, 0.95), 0 0 18px 5px rgba(59, 130, 246, 0.45)",
    glowRestingShadow: "0 0 4px 1px rgba(37, 99, 235, 0.45)",
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
      "bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.45)] dark:bg-emerald-500 dark:shadow-[0_0_10px_rgba(16,185,129,0.6)]",
    ],
    glowBoxShadow:
      "0 0 10px 2.5px rgba(52, 211, 153, 0.95), 0 0 18px 5px rgba(16, 185, 129, 0.45)",
    glowRestingShadow: "0 0 4px 1px rgba(16, 185, 129, 0.45)",
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
      "bg-violet-600 shadow-[0_0_8px_rgba(147,51,234,0.45)] dark:bg-violet-500 dark:shadow-[0_0_10px_rgba(168,85,247,0.6)]",
    ],
    glowBoxShadow:
      "0 0 10px 2.5px rgba(192, 132, 252, 0.95), 0 0 18px 5px rgba(147, 51, 234, 0.45)",
    glowRestingShadow: "0 0 4px 1px rgba(147, 51, 234, 0.45)",
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
      "bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.45)] dark:bg-amber-500 dark:shadow-[0_0_10px_rgba(245,158,11,0.6)]",
    ],
    glowBoxShadow:
      "0 0 10px 2.5px rgba(251, 191, 36, 0.95), 0 0 18px 5px rgba(245, 158, 11, 0.45)",
    glowRestingShadow: "0 0 4px 1px rgba(245, 158, 11, 0.45)",
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
      "bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.45)] dark:bg-rose-500 dark:shadow-[0_0_10px_rgba(244,63,94,0.6)]",
    ],
    glowBoxShadow:
      "0 0 10px 2.5px rgba(251, 113, 133, 0.95), 0 0 18px 5px rgba(225, 29, 72, 0.45)",
    glowRestingShadow: "0 0 4px 1px rgba(225, 29, 72, 0.45)",
    accentText: "text-rose-600 dark:text-rose-400",
    activeRing: "hover:ring-rose-400/70 dark:hover:ring-rose-400/70",
  },
  monochrome: {
    name: "monochrome",
    label: "Mono",
    levels: [
      "bg-neutral-950/5 dark:bg-white/[0.04]",
      "bg-neutral-400/30 dark:bg-neutral-800",
      "bg-neutral-500/55 dark:bg-neutral-600",
      "bg-neutral-700/80 dark:bg-neutral-400",
      "bg-neutral-900 dark:bg-neutral-100 dark:shadow-[0_0_6px_rgba(255,255,255,0.3)]",
    ],
    glowBoxShadow: "0 0 6px 1px rgba(255, 255, 255, 0.25)",
    glowRestingShadow: "none",
    accentText: "text-neutral-900 dark:text-neutral-100",
    activeRing: "hover:ring-neutral-400/60 dark:hover:ring-neutral-400/60",
  },
};

export interface ContributionDay {
  date: string;
  count: number;
}

export interface WeekData {
  weekNumber: number;
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

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parseUTC(dateStr: string): Date | null {
  if (!dateStr) return null;
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? `${dateStr}T00:00:00Z`
    : dateStr;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

/** "14 Oct 2025" — deterministic, locale/timezone independent. */
function formatDayLabel(dateStr: string): string {
  const d = parseUTC(dateStr);
  if (!d) return "No data";
  return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function formatRangeShort(startStr: string, endStr: string): string {
  const start = parseUTC(startStr);
  const end = parseUTC(endStr);
  if (!start || !end) return `${startStr} – ${endStr}`;
  const sm = MONTH_SHORT[start.getUTCMonth()];
  const em = MONTH_SHORT[end.getUTCMonth()];
  const sd = start.getUTCDate();
  const ed = end.getUTCDate();
  return sm === em ? `${sm} ${sd} – ${ed}` : `${sm} ${sd} – ${em} ${ed}`;
}

function formatRangeLong(startStr: string, endStr: string): string {
  const start = parseUTC(startStr);
  const end = parseUTC(endStr);
  if (!start || !end) return `${startStr} – ${endStr}`;
  const s = `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()}, ${start.getUTCFullYear()}`;
  const e = `${MONTH_SHORT[end.getUTCMonth()]} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  return `${s} – ${e}`;
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

const TOTAL_SLOTS = 52 * 7;

function rotationForWeek(weekNumber: number): number {
  const tilted = new Set([
    1, 3, 5, 8, 11, 14, 18, 21, 25, 28, 32, 35, 38, 42, 46, 49,
  ]);
  if (!tilted.has(weekNumber)) return 0;
  return weekNumber % 2 === 1 ? 5 : -5;
}

function levelIndex(count: number): number {
  if (count >= 10) return 4;
  if (count >= 6) return 3;
  if (count >= 3) return 2;
  if (count >= 1) return 1;
  return 0;
}

function weeklyLevelIndex(commits: number, heat: number): number {
  if (commits === 0) return 0;
  if (heat >= 75 || commits >= 100) return 4;
  if (heat >= 50 || commits >= 50) return 3;
  if (heat >= 25 || commits >= 20) return 2;
  return 1;
}

const MAX_STAGGER_DELAY = 0.28;

// Entrance is opacity + vertical scale + a brightness sweep, so the wave
// reads as an intense glow rolling across the chart. `themeShift` is the
// replay start state for theme/view switches (no full flash, just the wave).
const itemVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0.7 },
  themeShift: { opacity: 0.45, scaleY: 0.9, filter: "brightness(1.5)" },
  animate: (i: number) => ({
    opacity: 1,
    scaleY: 1,
    filter: ["brightness(1.6)", "brightness(1)"],
    transition: {
      duration: 0.25,
      delay: Math.min(i * 0.008, MAX_STAGGER_DELAY),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const VIEW_MODES = [
  { id: "timeline", label: "Timeline", Icon: IconChartBar },
  { id: "grid", label: "Grid", Icon: IconLayoutGrid },
] as const;

interface TooltipState {
  visible: boolean;
  /** Target center x, in viewport coordinates. */
  x: number;
  /** Target top y, in viewport coordinates. */
  y: number;
  /** Target height, used to flip the bubble below when needed. */
  targetH: number;
  title: string;
  count: number;
  activeDays?: number;
}

function Tooltip({
  tooltip,
  accentText,
}: {
  tooltip: TooltipState;
  accentText: string;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
  }, [tooltip.visible, tooltip.title, tooltip.count, tooltip.activeDays]);

  const MARGIN = 8;
  const GAP = 8;
  const vw = typeof window === "undefined" ? 0 : window.innerWidth;
  const measured = size.w > 0 && size.h > 0 && vw > 0;

  const bubbleLeft = measured
    ? Math.min(
        Math.max(tooltip.x - size.w / 2, MARGIN),
        Math.max(vw - size.w - MARGIN, MARGIN),
      )
    : tooltip.x;
  const flip = measured && tooltip.y - GAP - size.h < 0;
  const bubbleTop = measured
    ? flip
      ? tooltip.y + tooltip.targetH + GAP
      : tooltip.y - GAP - size.h
    : tooltip.y;
  const arrowLeft = measured
    ? Math.min(Math.max(tooltip.x - bubbleLeft, 14), Math.max(size.w - 14, 14))
    : 14;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 select-none"
      style={{
        transform: `translate3d(${bubbleLeft}px, ${bubbleTop}px, 0)`,
      }}
    >
      <div
        className={cn(
          "relative transition-[opacity,transform] duration-150 ease-out",
          flip ? "origin-top" : "origin-bottom",
          tooltip.visible
            ? "translate-y-0 scale-100 opacity-100"
            : cn(
                "scale-95 opacity-0",
                flip ? "-translate-y-1" : "translate-y-1",
              ),
        )}
      >
        <div
          ref={bubbleRef}
          className="border-border/70 bg-background/95 text-foreground flex max-w-[70vw] items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap shadow-md backdrop-blur-md"
        >
          <span className="text-foreground truncate font-semibold">
            {tooltip.title}
          </span>
          <span className="text-muted-foreground opacity-40">•</span>
          <span className={cn("font-semibold", accentText)}>
            {tooltip.count}{" "}
            {tooltip.count === 1 ? "contribution" : "contributions"}
          </span>
          {typeof tooltip.activeDays === "number" && tooltip.activeDays > 0 && (
            <span className="text-muted-foreground text-[10px]">
              ({tooltip.activeDays}d active)
            </span>
          )}
          <div
            className={cn(
              "border-border/70 bg-background/95 absolute size-1.5 -translate-x-1/2 rotate-45 backdrop-blur-md",
              flip ? "-top-1 border-t border-l" : "-bottom-1 border-r border-b",
            )}
            style={{ left: arrowLeft }}
          />
        </div>
      </div>
    </div>
  );
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
  const sectionRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [viewMode, setViewMode] = useState<ContributionViewMode>(defaultView);
  const [activeTheme, setActiveTheme] = useState<ContributionTheme>(theme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeWeekNumber, setActiveWeekNumber] = useState<number | null>(null);
  // Bumped on theme/view switches to remount the wave and replay the glow.
  const [waveKey, setWaveKey] = useState(0);
  const propThemeRef = useRef(theme);
  const [contributions, setContributions] = useState<ContributionDay[]>(() => {
    if (initialData && initialData.length > 0) return initialData;
    return (fallbackContributions.contributions || []) as ContributionDay[];
  });
  const [totalCount, setTotalCount] = useState<number>(() => {
    if (initialTotal !== undefined) return initialTotal;
    return fallbackContributions.totalContributions || 0;
  });
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    targetH: 0,
    title: "",
    count: 0,
  });

  const themeConfig = THEMES[activeTheme] ?? THEMES.blue;
  const shouldAnimate = animate && mounted && isInView;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        "github-contributions-view",
      ) as ContributionViewMode | null;
      if (stored === "timeline" || stored === "grid") setViewMode(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const handleViewModeChange = useCallback(
    (mode: ContributionViewMode) => {
      if (mode === viewMode) return;
      setViewMode(mode);
      setWaveKey((k) => k + 1);
      onViewChange?.(mode);
      try {
        localStorage.setItem("github-contributions-view", mode);
      } catch {
        /* ignore */
      }
    },
    [onViewChange, viewMode],
  );

  const handleThemeChange = useCallback(
    (next: ContributionTheme) => {
      setActiveTheme(next);
      setWaveKey((k) => k + 1);
      onThemeChange?.(next);
      setIsPopoverOpen(false);
    },
    [onThemeChange],
  );

  useEffect(() => {
    if (propThemeRef.current === theme) return;
    propThemeRef.current = theme;
    setActiveTheme(theme);
    setWaveKey((k) => k + 1);
  }, [theme]);

  useEffect(() => {
    if (!isPopoverOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPopoverOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isPopoverOpen]);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setContributions(initialData);
      setTotalCount(
        initialTotal ?? initialData.reduce((acc, c) => acc + c.count, 0),
      );
      return;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    (async () => {
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        if (json.contributions?.length > 0) {
          setContributions(json.contributions);
          setTotalCount(json.totalContributions ?? 0);
        }
      } catch {
        /* keep fallback data */
      } finally {
        clearTimeout(timeoutId);
      }
    })();
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [endpoint, initialData, initialTotal]);

  const weeksData = useMemo<WeekData[]>(() => {
    let slice = contributions;
    if (slice.length > TOTAL_SLOTS) {
      slice = slice.slice(slice.length - TOTAL_SLOTS);
    } else if (slice.length < TOTAL_SLOTS) {
      const pad: ContributionDay[] = Array.from(
        { length: TOTAL_SLOTS - slice.length },
        () => ({ date: "", count: 0 }),
      );
      slice = [...pad, ...slice];
    }

    const today = mounted ? new Date() : null;
    if (today) today.setHours(23, 59, 59, 999);

    const weeks: WeekData[] = [];
    let maxWeeklyCommits = 1;

    for (let w = 0; w < 52; w++) {
      const weekDays = slice.slice(w * 7, (w + 1) * 7);
      const commits = weekDays.reduce((acc, d) => acc + d.count, 0);
      if (commits > maxWeeklyCommits) maxWeeklyCommits = commits;

      const firstDate = weekDays.find((d) => d.date)?.date ?? "";
      const lastDate =
        [...weekDays].reverse().find((d) => d.date)?.date ?? firstDate;

      const start = firstDate ? parseUTC(firstDate) : null;
      const end = lastDate ? parseUTC(lastDate) : null;
      if (end) end.setHours(23, 59, 59, 999);

      weeks.push({
        weekNumber: w + 1,
        rangeShort: firstDate
          ? formatRangeShort(firstDate, lastDate)
          : `Week ${w + 1}`,
        rangeLong: firstDate
          ? formatRangeLong(firstDate, lastDate)
          : `Week ${w + 1}`,
        commits,
        activeDays: weekDays.filter((d) => d.count > 0).length,
        maxDayCount: Math.max(0, ...weekDays.map((d) => d.count)),
        isFuture: today && start ? start > today : false,
        isCurrent:
          today && start && end ? today >= start && today <= end : false,
        heat: commits,
        rotation: rotationForWeek(w + 1),
        days: weekDays,
      });
    }

    return weeks.map((week) => ({
      ...week,
      heat: Math.round((week.commits / maxWeeklyCommits) * 100),
    }));
  }, [contributions, mounted]);

  const activeWeek = useMemo(
    () =>
      activeWeekNumber === null
        ? null
        : (weeksData.find((w) => w.weekNumber === activeWeekNumber) ?? null),
    [activeWeekNumber, weeksData],
  );

  const monthLabels = useMemo(() => {
    if (contributions.length === 0) return [];
    const visible = contributions.slice(-TOTAL_SLOTS);
    const labels: { name: string; col: number }[] = [];
    let lastMonth = -1;
    for (let w = 0; w < 52; w++) {
      const day = visible[w * 7];
      const d = day?.date ? parseUTC(day.date) : null;
      if (!d) continue;
      const month = d.getUTCMonth();
      if (month !== lastMonth) {
        labels.push({ name: MONTH_SHORT[month], col: w });
        lastMonth = month;
      }
    }
    return labels.filter((label, idx, arr) => {
      if (idx === 0) {
        const next = arr[1];
        if (next && next.col - label.col < 3) return false;
      }
      return true;
    });
  }, [contributions]);

  const getDayData = useCallback(
    (weekIndex: number, dayIndex: number): ContributionDay => {
      const idx =
        contributions.length - TOTAL_SLOTS + (weekIndex * 7 + dayIndex);
      if (idx < 0 || !contributions[idx]) return { date: "", count: 0 };
      return contributions[idx];
    },
    [contributions],
  );

  const showTooltip = useCallback(
    (
      target: HTMLElement,
      title: string,
      count: number,
      activeDays?: number,
    ) => {
      const targetRect = target.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top,
        targetH: targetRect.height,
        title,
        count,
        activeDays,
      });
    },
    [],
  );

  const hideTooltip = useCallback(() => {
    setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
  }, []);

  useEffect(() => {
    const dismiss = () => hideTooltip();
    window.addEventListener("scroll", dismiss, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("scroll", dismiss, { capture: true });
      window.removeEventListener("resize", dismiss);
    };
  }, [hideTooltip]);

  const viewAnimState = shouldAnimate ? "animate" : "hidden";
  // First mount plays the full entrance; theme/view switches remount the
  // wave from `themeShift` for the glow replay without a full flash.
  const waveInitialState = waveKey > 0 ? "themeShift" : "hidden";

  // Intense-cell glow pulse for timeline ticks. Rides the same capped wave
  // timing as the entrance (no trailing after-pulse), and only runs while
  // the entrance itself runs.
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
          ? ["0 0 0px rgba(0, 0, 0, 0)", themeConfig.glowBoxShadow, resting]
          : ["0 0 0px rgba(0, 0, 0, 0)", resting, "0 0 0px rgba(0, 0, 0, 0)"],
        filter: isMax
          ? ["brightness(1)", "brightness(1.65)", "brightness(1)"]
          : ["brightness(1)", "brightness(1.3)", "brightness(1)"],
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
    <section
      ref={sectionRef}
      id="github-contributions-section"
      aria-label="GitHub Contributions"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") setActiveWeekNumber(null);
      }}
      className={cn("mt-12 w-full", className)}
    >
      <div className="bg-background/40 relative w-full rounded-lg backdrop-blur-xs">
        {mounted &&
          createPortal(
            <Tooltip tooltip={tooltip} accentText={themeConfig.accentText} />,
            document.body,
          )}

        <div className="flex w-full min-w-0 flex-col gap-3">
          {/* header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="text-muted-foreground flex min-w-0 items-center gap-2 text-xs">
              <span className="text-foreground font-semibold whitespace-nowrap">
                {formatCount(totalCount)} contributions
              </span>
              <span className="opacity-40 select-none" aria-hidden>
                •
              </span>
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1 transition-colors hover:underline"
              >
                <span>GitHub</span>
                <IconExternalLink className="size-3" aria-hidden />
              </Link>
            </div>

            <div
              role="tablist"
              aria-label="Contribution view"
              className="border-border/50 bg-card relative flex shrink-0 items-center gap-0.5 rounded-md border p-0.5 shadow-xs dark:border-white/10 dark:bg-neutral-900"
            >
              {VIEW_MODES.map(({ id, label, Icon }) => {
                const selected = viewMode === id;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={selected}
                    type="button"
                    onClick={() => handleViewModeChange(id)}
                    className={cn(
                      "relative z-10 flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-colors select-none",
                      selected
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="active-contribution-view-tab"
                        className="absolute inset-0 -z-10 rounded bg-neutral-200/60 dark:bg-neutral-800"
                        transition={{
                          type: "tween",
                          duration: 0.2,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                      />
                    )}
                    <Icon className="size-3.5" aria-hidden />
                    <span className="hidden min-[400px]:inline">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* chart: fluid full-width at every breakpoint, no scrolling.
              52 columns share the row; hit areas span the full column so
              timeline weeks stay tappable on phones. */}
          <div className="relative w-full min-w-0">
            <div className="w-full min-w-0">
              <div
                aria-hidden
                className="relative h-4 w-full overflow-hidden select-none"
              >
                {monthLabels.map((month, idx) => (
                  <span
                    key={`${month.name}-${month.col}-${idx}`}
                    className={cn(
                      "text-muted-foreground absolute top-0 max-w-[64px] truncate text-[10px] font-medium whitespace-nowrap sm:text-xs",
                      // Thin labels out on phones so neighbours never collide.
                      idx % 2 === 1 && "hidden sm:inline",
                    )}
                    style={{ left: `${(month.col / 52) * 100}%` }}
                  >
                    {month.name}
                  </span>
                ))}
              </div>
              <div
                className="relative grid w-full min-w-0 overflow-y-clip"
                onMouseLeave={hideTooltip}
              >
                {/* timeline */}
                <div
                  className={cn(
                    "col-start-1 row-start-1 w-full min-w-0 pt-1.5 pb-1 select-none",
                    viewMode === "timeline"
                      ? "relative opacity-100"
                      : "invisible absolute inset-x-0 top-0 opacity-0",
                  )}
                  aria-hidden={viewMode !== "timeline"}
                >
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
                          onClick={() =>
                            setActiveWeekNumber((prev) =>
                              prev === week.weekNumber ? null : week.weekNumber,
                            )
                          }
                          onMouseEnter={(e) =>
                            showTooltip(
                              e.currentTarget,
                              week.rangeShort,
                              week.commits,
                              week.activeDays,
                            )
                          }
                          onFocus={(e) =>
                            showTooltip(
                              e.currentTarget,
                              week.rangeShort,
                              week.commits,
                              week.activeDays,
                            )
                          }
                          aria-label={`${week.rangeShort}: ${week.commits} commits`}
                          aria-pressed={isActive}
                          className={cn(
                            "group relative flex min-w-0 flex-1 cursor-pointer items-center justify-center focus-visible:outline-none",
                            week.isFuture && "pointer-events-none opacity-20",
                          )}
                        >
                          {/* Full-column touch target: tall enough for fingers,
                            never wider than its own column so neighbours keep
                            their own hit spots. */}
                          <span
                            aria-hidden
                            className="absolute inset-x-0 inset-y-[-14px] z-10 block"
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
                                  : "opacity-100",
                            )}
                          ></motion.span>
                        </motion.button>
                      );
                    })}
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {activeWeek && (
                      <motion.div
                        key="active-week-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3">
                          <div className="border-border/50 bg-card/60 rounded-lg border p-4 shadow-xs backdrop-blur-xs dark:border-white/10 dark:bg-neutral-900/60">
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
                                  {activeWeek.commits === 1
                                    ? "commit"
                                    : "commits"}{" "}
                                  across repositories
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

                              <div className="sm:border-border/40 space-y-1.5 sm:border-l sm:pl-4">
                                <p className="text-foreground text-[11px] font-semibold tracking-wider uppercase">
                                  GitHub Profile
                                </p>
                                <p className="text-muted-foreground">
                                  Total yearly activity:{" "}
                                  <span className="text-foreground font-medium">
                                    {formatCount(totalCount)}
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* grid */}
                <div
                  className={cn(
                    "col-start-1 row-start-1 w-full min-w-0 pt-1.5 pb-1 select-none",
                    viewMode === "grid"
                      ? "relative opacity-100"
                      : "invisible absolute inset-x-0 top-0 opacity-0",
                  )}
                  aria-hidden={viewMode !== "grid"}
                >
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
                          const dayData = getDayData(weekIndex, dayIndex);
                          const label = dayData.date
                            ? formatDayLabel(dayData.date)
                            : "No data";
                          return (
                            <div
                              key={dayIndex}
                              role="img"
                              aria-label={`${dayData.count} contributions on ${label}`}
                              onMouseEnter={(e) =>
                                showTooltip(
                                  e.currentTarget,
                                  label,
                                  dayData.count,
                                )
                              }
                              onClick={(e) =>
                                showTooltip(
                                  e.currentTarget,
                                  label,
                                  dayData.count,
                                )
                              }
                              className={cn(
                                "aspect-square w-full origin-center cursor-pointer touch-manipulation rounded-[2px] shadow-xs transition-[scale] duration-150 ease-out sm:hover:z-20 sm:hover:scale-125 sm:hover:ring-1",
                                themeConfig.activeRing,
                                themeConfig.levels[levelIndex(dayData.count)],
                                // Keep the padded (out-of-range) cells inert.
                                (!day || !day.date) && "pointer-events-none",
                              )}
                            />
                          );
                        })}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* legend + theme picker */}
          <div className="mt-1 flex flex-row items-center justify-end px-1 pb-1">
            <div className="relative flex items-center" ref={popoverRef}>
              <button
                type="button"
                onClick={() =>
                  allowThemeSelection && setIsPopoverOpen((prev) => !prev)
                }
                aria-haspopup={allowThemeSelection ? "dialog" : undefined}
                aria-expanded={allowThemeSelection ? isPopoverOpen : undefined}
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
                <span className="flex gap-0.5" aria-hidden>
                  {[0, 1, 3, 6, 10].map((level) => (
                    <span
                      key={level}
                      className={cn(
                        "size-2 rounded-[1px] transition-colors duration-200 sm:size-2.5",
                        themeConfig.levels[levelIndex(level)],
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
                            onClick={() => handleThemeChange(key)}
                            aria-pressed={selected}
                            className={cn(
                              "flex cursor-pointer flex-col items-center gap-1 rounded-md p-1.5 text-[9px] font-medium transition-colors",
                              selected
                                ? "text-foreground bg-neutral-100 shadow-xs ring-1 ring-neutral-300 dark:bg-neutral-800 dark:ring-neutral-700"
                                : "text-muted-foreground hover:text-foreground hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60",
                            )}
                          >
                            <span className="flex gap-0.5" aria-hidden>
                              {cfg.levels.map((lvlClass, idx) => (
                                <span
                                  key={idx}
                                  className={cn(
                                    "size-1.5 rounded-[1px]",
                                    lvlClass,
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
        </div>
      </div>
    </section>
  );
};
