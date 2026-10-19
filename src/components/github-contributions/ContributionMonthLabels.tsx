import React from "react";
import { cn } from "cn";

interface MonthLabelItem {
  name: string;
  col: number;
}

interface ContributionMonthLabelsProps {
  monthLabels: MonthLabelItem[];
}

export const ContributionMonthLabels: React.FC<ContributionMonthLabelsProps> =
  React.memo(({ monthLabels }) => {
    return (
      <div
        aria-hidden
        className="relative h-4 w-full overflow-hidden select-none"
      >
        {monthLabels.map((month, idx) => (
          <span
            key={`${month.name}-${month.col}-${idx}`}
            className={cn(
              "text-muted-foreground absolute top-0 max-w-16 truncate text-[10px] font-medium whitespace-nowrap sm:text-xs",
              idx % 2 === 1 && "hidden sm:inline"
            )}
            style={{ left: `${(month.col / 52) * 100}%` }}
          >
            {month.name}
          </span>
        ))}
      </div>
    );
  });

ContributionMonthLabels.displayName = "ContributionMonthLabels";
