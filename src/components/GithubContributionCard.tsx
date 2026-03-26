"use client";

import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/Tooltip";
import Link from "next/link";

interface ContributionDay {
  date: string;
  count: number;
}

export const GithubContributionCard = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  console.log(error);
  if (error) return null;
  return (
    <section id="working-idea-section" className="mt-12 w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="bg-background/40 backdrop-blur-sm rounded-lg w-full overflow-hidden">
        <div className="flex flex-col gap-2 w-full">
          {/* Month Labels Container */}
          <div className="relative h-4 w-full">
            {monthLabels.map((month, idx) => (
              <span
                key={`${month.name}-${idx}`}
                className="absolute text-xs text-muted-foreground font-medium whitespace-nowrap"
                style={{ left: `${(month.col / 52) * 100}%` }}
              >
                {month.name}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Grid */}
            <div className="flex flex-1 justify-between gap-px sm:gap-[2px]">
              {weeks.map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-px sm:gap-[2px] flex-1">
                  {days.map((_, dayIndex) => {
                    const dayData = getDayData(weekIndex, dayIndex);
                    return (
                      <Tooltip key={dayIndex} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "aspect-square w-full transition-all hover:scale-150 hover:z-999 cursor-pointer origin-center shadow-xs",
                              getLevelClass(dayData.count)
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-[10px] py-1.5 px-2 bg-background/95 border-border backdrop-blur-md">
                          <div className="flex flex-col gap-0.5">
                            {dayData.count} contributions on {dayData.date}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex flex-row items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="text-foreground/80 font-medium">
                {loading ? "..." : totalContributions.toLocaleString()} contributions
              </span>
              <span className="opacity-40 select-none">•</span>
              <Link
                href="https://github.com/asius09"
                target="_blank"
                className="hover:underline hover:text-blue-500 transition-colors flex items-center gap-1"
              >
                Github
              </Link>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground select-none">
              <span className="opacity-50">Less</span>
              <div className="flex gap-0.5">
                {[0, 2, 5, 8, 12].map((level) => (
                  <div key={level} className={cn("size-2 sm:size-2.5 rounded-[1px]", getLevelClass(level))} />
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





