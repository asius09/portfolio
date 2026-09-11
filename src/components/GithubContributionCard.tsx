"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { cn } from "cn";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export type ContributionTheme =
  | "blue"
  | "green"
  | "violet"
  | "amber"
  | "rose"
  | "monochrome";

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

export interface GithubContributionCardProps {
  username?: string;
  endpoint?: string;
  data?: ContributionDay[];
  totalContributions?: number;
  className?: string;
  animate?: boolean;
  theme?: ContributionTheme;
  allowThemeSelection?: boolean;
  onThemeChange?: (theme: ContributionTheme) => void;
}

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

export const GithubContributionCard: React.FC<GithubContributionCardProps> = ({
  username = "asius09",
  endpoint = "/api/github/contributions",
  data: initialData,
  totalContributions: initialTotal,
  className,
  animate = true,
  theme = "blue",
  allowThemeSelection = true,
  onThemeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<ContributionTheme>(theme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [contributions, setContributions] = useState<ContributionDay[]>(
    initialData || [],
  );
  const [totalContributions, setTotalContributions] = useState<number>(
    initialTotal || 0,
  );
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    isGliding: boolean;
    x: number;
    y: number;
    count: number;
    date: string;
  }>({
    visible: false,
    isGliding: false,
    x: 0,
    y: 0,
    count: 0,
    date: "",
  });

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

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

  useEffect(() => {
    if (initialData) {
      setContributions(initialData);
      setTotalContributions(
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
        setTotalContributions(data.totalContributions || 0);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, [endpoint, initialData, initialTotal]);

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

  const handleCellEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    dayData: ContributionDay,
  ) => {
    const target = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x = targetRect.left - containerRect.left + targetRect.width / 2;
    const y = targetRect.top - containerRect.top;

    setTooltip((prev) => ({
      visible: true,
      isGliding: prev.visible,
      x,
      y,
      count: dayData.count,
      date: dayData.date,
    }));
  };

  const handleContainerLeave = () => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
      isGliding: false,
    }));
  };

  if (error) return null;

  return (
    <section
      id="working-idea-section"
      className={cn("mt-12 w-full", className)}
    >
      <div className="bg-background/40 w-full rounded-lg backdrop-blur-sm">
        <div className="flex w-full flex-col gap-2">
          <motion.div
            initial={animate ? { opacity: 0, y: -4 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative h-4 w-full"
          >
            {monthLabels.map((month, idx) => (
              <span
                key={`${month.name}-${idx}`}
                className="text-muted-foreground absolute text-xs font-medium whitespace-nowrap"
                style={{ left: `${(month.col / 52) * 100}%` }}
              >
                {month.name}
              </span>
            ))}
          </motion.div>

          <div
            ref={containerRef}
            className="relative flex gap-1"
            onMouseLeave={handleContainerLeave}
          >
            <div
              className={cn(
                "pointer-events-none absolute top-0 left-0 z-50 select-none",
                tooltip.isGliding
                  ? "transition-transform duration-150 ease-out will-change-transform"
                  : "transition-none",
              )}
              style={{
                transform: `translate3d(${tooltip.x}px, ${tooltip.y - 8}px, 0) translate(-50%, -100%)`,
              }}
            >
              <div
                className={cn(
                  "relative flex origin-bottom flex-col items-center transition-[opacity,transform] duration-150 ease-out",
                  tooltip.visible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none translate-y-1 scale-95 opacity-0",
                )}
              >
                <div className="border-border/70 bg-background/95 text-foreground relative flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-medium whitespace-nowrap shadow-sm backdrop-blur-md">
                  <span
                    className={cn(
                      "font-semibold",
                      currentThemeConfig.accentText,
                    )}
                  >
                    {tooltip.count}
                  </span>
                  <span className="text-muted-foreground">
                    {tooltip.count === 1 ? "contribution" : "contributions"} on
                  </span>
                  <span className="text-foreground font-medium">
                    {tooltip.date !== "No data"
                      ? formatDate(tooltip.date)
                      : "No data"}
                  </span>

                  <div className="border-border/70 bg-background/95 absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rotate-45 border-r border-b backdrop-blur-md" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-between gap-px sm:gap-0.5">
              {weeks.map((_, weekIndex) => (
                <motion.div
                  key={weekIndex}
                  custom={weekIndex}
                  initial={animate ? "hidden" : false}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={columnVariants}
                  className="flex flex-1 flex-col gap-px sm:gap-0.5"
                >
                  {days.map((_, dayIndex) => {
                    const dayData = getDayData(weekIndex, dayIndex);
                    const glow = getGlowAnimation(dayData.count, weekIndex);
                    const isTop = dayData.count >= 10;
                    return (
                      <motion.div
                        key={dayIndex}
                        animate={glow?.animate}
                        transition={glow?.transition}
                        onMouseEnter={(e) => handleCellEnter(e, dayData)}
                        className={cn(
                          "aspect-square w-full origin-center cursor-pointer rounded-xs shadow-xs transition-[transform,background-color,box-shadow] duration-150 ease-out hover:z-20 hover:scale-110 hover:ring-1",
                          currentThemeConfig.activeRing,
                          isTop && "z-10",
                          getLevelClass(dayData.count, activeTheme),
                        )}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={animate ? { opacity: 0, y: 4 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="mt-3 flex flex-row items-center justify-between px-1"
          >
            <div className="text-muted-foreground flex items-center gap-2 text-[10px]">
              <span className="text-foreground/80 font-medium">
                {loading ? "..." : totalContributions.toLocaleString()}{" "}
                contributions
              </span>
              <span className="opacity-40 select-none">•</span>
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                className={cn(
                  "flex items-center gap-1 underline-offset-2 transition-colors hover:underline",
                  activeTheme === "blue" && "hover:text-blue-500",
                  activeTheme === "green" && "hover:text-emerald-500",
                  activeTheme === "violet" && "hover:text-violet-500",
                  activeTheme === "amber" && "hover:text-amber-500",
                  activeTheme === "rose" && "hover:text-rose-500",
                  activeTheme === "monochrome" && "hover:text-foreground",
                )}
              >
                Github
              </Link>
            </div>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
