import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { IconX, IconExternalLink } from "@tabler/icons-react";
import { formatCount } from "./utils";
import type { WeekData } from "./types";

interface ContributionWeekDetailProps {
  week: WeekData;
  totalCount: number;
  username: string;
  onClose: () => void;
}

export const ContributionWeekDetail: React.FC<ContributionWeekDetailProps> =
  React.memo(({ week, totalCount, username, onClose }) => {
    return (
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
                {week.rangeLong}
              </span>
              <button
                type="button"
                onClick={onClose}
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
                    {week.commits}
                  </span>{" "}
                  {week.commits === 1 ? "commit" : "commits"} across repositories
                </p>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">
                    {week.activeDays}
                  </span>{" "}
                  out of 7 active days this week
                </p>
                {week.maxDayCount > 0 && (
                  <p className="text-muted-foreground">
                    Peak:{" "}
                    <span className="text-foreground font-medium">
                      {week.maxDayCount}
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
    );
  });

ContributionWeekDetail.displayName = "ContributionWeekDetail";
