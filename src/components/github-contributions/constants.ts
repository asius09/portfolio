import type { Variants } from "motion/react";
import { IconChartBar, IconLayoutGrid } from "@tabler/icons-react";
import type { ContributionTheme, ThemeConfig } from "./types";

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

export const VIEW_MODES = [
  { id: "timeline", label: "Timeline", Icon: IconChartBar },
  { id: "grid", label: "Grid", Icon: IconLayoutGrid },
] as const;

export const MONTH_SHORT = [
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

export const TOTAL_SLOTS = 52 * 7;

export const MAX_STAGGER_DELAY = 0.28;

export const itemVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0.7 },
  themeShift: { opacity: 0.45, scaleY: 0.9 },
  animate: (i: number) => ({
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.25,
      delay: Math.min(i * 0.008, MAX_STAGGER_DELAY),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
