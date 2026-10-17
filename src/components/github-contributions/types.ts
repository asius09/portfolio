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

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  targetH: number;
  title: string;
  count: number;
  activeDays?: number;
}

export type ShowTooltipFn = (
  target: HTMLElement,
  title: string,
  count: number,
  activeDays?: number
) => void;

export type HideTooltipFn = () => void;
