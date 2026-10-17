import { useState, useEffect, useMemo } from "react";
import fallbackContributions from "@/data/contributionsFallback.json";
import type { ContributionDay, WeekData } from "./types";
import { TOTAL_SLOTS, MONTH_SHORT } from "./constants";
import {
  parseUTC,
  formatRangeShort,
  formatRangeLong,
  rotationForWeek,
} from "./utils";

interface UseContributionDataProps {
  endpoint?: string;
  initialData?: ContributionDay[];
  initialTotal?: number;
}

export function useContributionData({
  endpoint = "/api/github/contributions",
  initialData,
  initialTotal,
}: UseContributionDataProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>(() => {
    if (initialData && initialData.length > 0) return initialData;
    return (fallbackContributions.contributions || []) as ContributionDay[];
  });

  const [totalCount, setTotalCount] = useState<number>(() => {
    if (initialTotal !== undefined) return initialTotal;
    return fallbackContributions.totalContributions || 0;
  });

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setContributions(initialData);
      setTotalCount(
        initialTotal ?? initialData.reduce((acc, c) => acc + c.count, 0)
      );
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    async function loadData() {
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        if (json.contributions?.length > 0) {
          setContributions(json.contributions);
          setTotalCount(json.totalContributions ?? 0);
        }
      } catch {
      } finally {
        clearTimeout(timeoutId);
      }
    }

    loadData();

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
        () => ({ date: "", count: 0 })
      );
      slice = [...pad, ...slice];
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

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
        isFuture: Boolean(start && start > today),
        isCurrent: Boolean(start && end && today >= start && today <= end),
        heat: commits,
        rotation: rotationForWeek(w + 1),
        days: weekDays,
      });
    }

    return weeks.map((week) => ({
      ...week,
      heat: Math.round((week.commits / maxWeeklyCommits) * 100),
    }));
  }, [contributions]);

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

  return {
    contributions,
    totalCount,
    weeksData,
    monthLabels,
  };
}
