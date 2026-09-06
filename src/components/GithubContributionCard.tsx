"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";

interface ContributionDay {
  date: string;
  count: number;
}

export const GithubContributionCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
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
    const fetchContributions = async () => {
      try {
        const res = await fetch("/api/github/contributions");
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
  }, []);

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

  const getLevelClass = (count: number) => {
    if (count >= 10) return "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]";
    if (count >= 5) return "bg-blue-500/80";
    if (count >= 2) return "bg-blue-500/50";
    if (count >= 1) return "bg-blue-500/30";
    return "bg-blue-500/10";
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
      className="animate-in fade-in slide-in-from-bottom-2 mt-12 w-full duration-700"
    >
      <div className="bg-background/40 w-full rounded-lg backdrop-blur-sm">
        <div className="flex w-full flex-col gap-2">
          {/* Month Labels Container */}
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
                  <span className="font-semibold text-blue-500">
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

            {/* Grid */}
            <div className="flex flex-1 justify-between gap-px sm:gap-0.5">
              {weeks.map((_, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-1 flex-col gap-px sm:gap-0.5"
                >
                  {days.map((_, dayIndex) => {
                    const dayData = getDayData(weekIndex, dayIndex);
                    return (
                      <div
                        key={dayIndex}
                        onMouseEnter={(e) => handleCellEnter(e, dayData)}
                        className={cn(
                          "aspect-square w-full origin-center cursor-pointer rounded-xs shadow-xs transition-all duration-100 ease-out hover:z-10 hover:scale-110 hover:ring-1 hover:ring-blue-400/70",
                          getLevelClass(dayData.count),
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-row items-center justify-between px-1">
            <div className="text-muted-foreground flex items-center gap-2 text-[10px]">
              <span className="text-foreground/80 font-medium">
                {loading ? "..." : totalContributions.toLocaleString()}{" "}
                contributions
              </span>
              <span className="opacity-40 select-none">•</span>
              <Link
                href="https://github.com/asius09"
                target="_blank"
                className="flex items-center gap-1 transition-colors hover:text-blue-500 hover:underline underline-offset-2"
              >
                Github
              </Link>
            </div>

            <div className="text-muted-foreground flex items-center gap-1.5 text-[9px] select-none">
              <span className="opacity-50">Less</span>
              <div className="flex gap-0.5">
                {[0, 2, 5, 8, 12].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "size-2 rounded-[1px] sm:size-2.5",
                      getLevelClass(level),
                    )}
                  />
                ))}
              </div>
              <span className="opacity-50">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
