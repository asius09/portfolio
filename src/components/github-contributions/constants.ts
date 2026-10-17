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
      "bg-blue-600 shadow-[0_0_4px_rgba(37,99,235,0.4)] dark:bg-blue-500 dark:shadow-[0_0_5px_rgba(59,130,246,0.5)]",
    ],
    timelineGlows: [
      "none",
      "0 0 2px 0.5px rgba(59, 130, 246, 0.4)",
      "0 0 2.5px 0.5px rgba(59, 130, 246, 0.6)",
      "0 0 3px 0.5px rgba(96, 165, 250, 0.8)",
      "0 0 3.5px 0.5px rgba(96, 165, 250, 0.95), 0 0 1px rgba(255, 255, 255, 0.8)",
    ],
    gridGlows: [
      "none",
      "0 0 3px 0.5px rgba(59, 130, 246, 0.5)",
      "0 0 5px 1px rgba(59, 130, 246, 0.7)",
      "0 0 7px 1.5px rgba(96, 165, 250, 0.85)",
      "0 0 9px 2px rgba(96, 165, 250, 0.95)",
    ],
    glowBoxShadow: "0 0 3.5px 0.5px rgba(96, 165, 250, 0.95)",
    glowRestingShadow: "0 0 2px 0.5px rgba(37, 99, 235, 0.35)",
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
      "bg-emerald-600 shadow-[0_0_4px_rgba(16,185,129,0.4)] dark:bg-emerald-500 dark:shadow-[0_0_5px_rgba(16,185,129,0.5)]",
    ],
    timelineGlows: [
      "none",
      "0 0 2px 0.5px rgba(16, 185, 129, 0.4)",
      "0 0 2.5px 0.5px rgba(16, 185, 129, 0.6)",
      "0 0 3px 0.5px rgba(52, 211, 153, 0.8)",
      "0 0 3.5px 0.5px rgba(52, 211, 153, 0.95), 0 0 1px rgba(255, 255, 255, 0.8)",
    ],
    gridGlows: [
      "none",
      "0 0 3px 0.5px rgba(16, 185, 129, 0.5)",
      "0 0 5px 1px rgba(16, 185, 129, 0.7)",
      "0 0 7px 1.5px rgba(52, 211, 153, 0.85)",
      "0 0 9px 2px rgba(52, 211, 153, 0.95)",
    ],
    glowBoxShadow: "0 0 3.5px 0.5px rgba(52, 211, 153, 0.95)",
    glowRestingShadow: "0 0 2px 0.5px rgba(16, 185, 129, 0.35)",
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
      "bg-violet-600 shadow-[0_0_4px_rgba(147,51,234,0.4)] dark:bg-violet-500 dark:shadow-[0_0_5px_rgba(168,85,247,0.5)]",
    ],
    timelineGlows: [
      "none",
      "0 0 2px 0.5px rgba(168, 85, 247, 0.4)",
      "0 0 2.5px 0.5px rgba(168, 85, 247, 0.6)",
      "0 0 3px 0.5px rgba(192, 132, 252, 0.8)",
      "0 0 3.5px 0.5px rgba(192, 132, 252, 0.95), 0 0 1px rgba(255, 255, 255, 0.8)",
    ],
    gridGlows: [
      "none",
      "0 0 3px 0.5px rgba(168, 85, 247, 0.5)",
      "0 0 5px 1px rgba(168, 85, 247, 0.7)",
      "0 0 7px 1.5px rgba(192, 132, 252, 0.85)",
      "0 0 9px 2px rgba(192, 132, 252, 0.95)",
    ],
    glowBoxShadow: "0 0 3.5px 0.5px rgba(192, 132, 252, 0.95)",
    glowRestingShadow: "0 0 2px 0.5px rgba(147, 51, 234, 0.35)",
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
      "bg-amber-600 shadow-[0_0_4px_rgba(217,119,6,0.4)] dark:bg-amber-500 dark:shadow-[0_0_5px_rgba(245,158,11,0.5)]",
    ],
    timelineGlows: [
      "none",
      "0 0 2px 0.5px rgba(245, 158, 11, 0.4)",
      "0 0 2.5px 0.5px rgba(245, 158, 11, 0.6)",
      "0 0 3px 0.5px rgba(251, 191, 36, 0.8)",
      "0 0 3.5px 0.5px rgba(251, 191, 36, 0.95), 0 0 1px rgba(255, 255, 255, 0.8)",
    ],
    gridGlows: [
      "none",
      "0 0 3px 0.5px rgba(245, 158, 11, 0.5)",
      "0 0 5px 1px rgba(245, 158, 11, 0.7)",
      "0 0 7px 1.5px rgba(251, 191, 36, 0.85)",
      "0 0 9px 2px rgba(251, 191, 36, 0.95)",
    ],
    glowBoxShadow: "0 0 3.5px 0.5px rgba(251, 191, 36, 0.95)",
    glowRestingShadow: "0 0 2px 0.5px rgba(245, 158, 11, 0.35)",
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
      "bg-rose-600 shadow-[0_0_4px_rgba(225,29,72,0.4)] dark:bg-rose-500 dark:shadow-[0_0_5px_rgba(244,63,94,0.5)]",
    ],
    timelineGlows: [
      "none",
      "0 0 2px 0.5px rgba(244, 63, 94, 0.4)",
      "0 0 2.5px 0.5px rgba(244, 63, 94, 0.6)",
      "0 0 3px 0.5px rgba(251, 113, 133, 0.8)",
      "0 0 3.5px 0.5px rgba(251, 113, 133, 0.95), 0 0 1px rgba(255, 255, 255, 0.8)",
    ],
    gridGlows: [
      "none",
      "0 0 3px 0.5px rgba(244, 63, 94, 0.5)",
      "0 0 5px 1px rgba(244, 63, 94, 0.7)",
      "0 0 7px 1.5px rgba(251, 113, 133, 0.85)",
      "0 0 9px 2px rgba(251, 113, 133, 0.95)",
    ],
    glowBoxShadow: "0 0 3.5px 0.5px rgba(251, 113, 133, 0.95)",
    glowRestingShadow: "0 0 2px 0.5px rgba(225, 29, 72, 0.35)",
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
      "bg-neutral-900 dark:bg-neutral-100 dark:shadow-[0_0_3px_rgba(255,255,255,0.3)]",
    ],
    timelineGlows: [
      "none",
      "0 0 1.5px 0.5px rgba(255, 255, 255, 0.3)",
      "0 0 2px 0.5px rgba(255, 255, 255, 0.5)",
      "0 0 2.5px 0.5px rgba(255, 255, 255, 0.7)",
      "0 0 3px 0.5px rgba(255, 255, 255, 0.9)",
    ],
    gridGlows: [
      "none",
      "0 0 2px 0.5px rgba(255, 255, 255, 0.35)",
      "0 0 4px 1px rgba(255, 255, 255, 0.55)",
      "0 0 6px 1.5px rgba(255, 255, 255, 0.75)",
      "0 0 8px 2px rgba(255, 255, 255, 0.9)",
    ],
    glowBoxShadow: "0 0 3px 0.5px rgba(255, 255, 255, 0.9)",
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

export const MAX_STAGGER_DELAY = 0.52;

export const itemVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0.6 },
  themeShift: { opacity: 0.4, scaleY: 0.85 },
  animate: (i: number) => ({
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.25,
      delay: i * 0.012,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
