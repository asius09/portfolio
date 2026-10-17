"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "cn";
import { THEMES } from "./constants";
import { useContributionData } from "./useContributionData";
import { ContributionHeader } from "./ContributionHeader";
import { ContributionMonthLabels } from "./ContributionMonthLabels";
import { ContributionTimeline } from "./ContributionTimeline";
import { ContributionGrid } from "./ContributionGrid";
import { ContributionThemePopover } from "./ContributionThemePopover";
import { ContributionTooltip } from "./ContributionTooltip";
import type {
  ContributionTheme,
  ContributionViewMode,
  GithubContributionCardProps,
  TooltipState,
} from "./types";

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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ContributionViewMode>(defaultView);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(
        "github-contributions-view"
      ) as ContributionViewMode | null;
      if (stored === "timeline" || stored === "grid") {
        setViewMode(stored);
      }
    } catch {}
  }, []);

  const [activeTheme, setActiveTheme] = useState<ContributionTheme>(theme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeWeekNumber, setActiveWeekNumber] = useState<number | null>(null);
  const [waveKey, setWaveKey] = useState(0);
  const propThemeRef = useRef(theme);

  const { totalCount, weeksData, monthLabels } = useContributionData({
    endpoint,
    initialData,
    initialTotal,
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

  const handleViewModeChange = useCallback(
    (mode: ContributionViewMode) => {
      if (mode === viewMode) return;
      setViewMode(mode);
      setWaveKey((k) => k + 1);
      onViewChange?.(mode);
      try {
        localStorage.setItem("github-contributions-view", mode);
      } catch {}
    },
    [onViewChange, viewMode]
  );

  const handleThemeChange = useCallback(
    (next: ContributionTheme) => {
      setActiveTheme(next);
      setWaveKey((k) => k + 1);
      onThemeChange?.(next);
      setIsPopoverOpen(false);
    },
    [onThemeChange]
  );

  useEffect(() => {
    if (propThemeRef.current === theme) return;
    propThemeRef.current = theme;
    setActiveTheme(theme);
    setWaveKey((k) => k + 1);
  }, [theme]);

  const showTooltip = useCallback(
    (
      target: HTMLElement,
      title: string,
      count: number,
      activeDays?: number
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
    []
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

  const handleSelectWeek = useCallback((weekNumber: number) => {
    setActiveWeekNumber((prev) => (prev === weekNumber ? null : weekNumber));
  }, []);

  const handleCloseWeek = useCallback(() => {
    setActiveWeekNumber(null);
  }, []);

  const handleTogglePopover = useCallback(() => {
    setIsPopoverOpen((prev) => !prev);
  }, []);

  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const waveInitialState = waveKey > 0 ? "themeShift" : "hidden";

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
        <ContributionTooltip
          tooltip={tooltip}
          accentText={themeConfig.accentText}
        />

        <div className="flex w-full min-w-0 flex-col gap-3">
          <ContributionHeader
            totalCount={totalCount}
            username={username}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          <div className="relative w-full min-w-0">
            <div className="w-full min-w-0">
              <ContributionMonthLabels monthLabels={monthLabels} />

              <div
                className="relative grid w-full min-w-0 overflow-y-clip"
                onMouseLeave={hideTooltip}
              >
                <div
                  className={cn(
                    "col-start-1 row-start-1 w-full min-w-0 pt-1.5 pb-1 select-none",
                    viewMode === "timeline"
                      ? "relative opacity-100"
                      : "invisible absolute inset-x-0 top-0 opacity-0"
                  )}
                  aria-hidden={viewMode !== "timeline"}
                >
                  <ContributionTimeline
                    weeksData={weeksData}
                    themeConfig={themeConfig}
                    activeTheme={activeTheme}
                    waveKey={waveKey}
                    waveInitialState={waveInitialState}
                    shouldAnimate={shouldAnimate}
                    activeWeekNumber={activeWeekNumber}
                    onSelectWeek={handleSelectWeek}
                    onCloseWeek={handleCloseWeek}
                    totalCount={totalCount}
                    username={username}
                    onShowTooltip={showTooltip}
                  />
                </div>

                <div
                  className={cn(
                    "col-start-1 row-start-1 w-full min-w-0 pt-1.5 pb-1 select-none",
                    viewMode === "grid"
                      ? "relative opacity-100"
                      : "invisible absolute inset-x-0 top-0 opacity-0"
                  )}
                  aria-hidden={viewMode !== "grid"}
                >
                  <ContributionGrid
                    weeksData={weeksData}
                    themeConfig={themeConfig}
                    activeTheme={activeTheme}
                    waveKey={waveKey}
                    waveInitialState={waveInitialState}
                    shouldAnimate={shouldAnimate}
                    onShowTooltip={showTooltip}
                  />
                </div>
              </div>
            </div>
          </div>

          <ContributionThemePopover
            activeTheme={activeTheme}
            themeConfig={themeConfig}
            allowThemeSelection={allowThemeSelection}
            onThemeChange={handleThemeChange}
            isPopoverOpen={isPopoverOpen}
            onTogglePopover={handleTogglePopover}
            onClosePopover={handleClosePopover}
          />
        </div>
      </div>
    </section>
  );
};
