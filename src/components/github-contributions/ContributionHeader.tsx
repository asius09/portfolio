import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "cn";
import { VIEW_MODES } from "./constants";
import { formatCount } from "./utils";
import type { ContributionViewMode } from "./types";

interface ContributionHeaderProps {
  totalCount: number;
  username: string;
  viewMode: ContributionViewMode;
  onViewModeChange: (mode: ContributionViewMode) => void;
}

export const ContributionHeader: React.FC<ContributionHeaderProps> = React.memo(
  ({ totalCount, username, viewMode, onViewModeChange }) => {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="text-muted-foreground flex min-w-0 items-center gap-2 text-xs">
          <span className="text-foreground font-semibold whitespace-nowrap">
            {formatCount(totalCount)} contributions
          </span>
          <span className="opacity-40 select-none" aria-hidden>
            •
          </span>
          <Link
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1 transition-colors hover:underline"
          >
            <span>GitHub</span>
            <IconExternalLink className="size-3" aria-hidden />
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Contribution view"
          className="border-border/50 bg-card relative flex shrink-0 items-center gap-0.5 rounded-md border p-0.5 shadow-xs dark:border-white/10 dark:bg-neutral-900"
        >
          {VIEW_MODES.map(({ id, label, Icon }) => {
            const selected = viewMode === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={selected}
                type="button"
                onClick={() => onViewModeChange(id)}
                className={cn(
                  "relative z-10 flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-colors select-none",
                  selected
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="active-contribution-view-tab"
                    className="absolute inset-0 -z-10 rounded bg-neutral-200/60 dark:bg-neutral-800"
                    transition={{
                      type: "tween",
                      duration: 0.2,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  />
                )}
                <Icon className="size-3.5" aria-hidden />
                <span className="hidden min-[400px]:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

ContributionHeader.displayName = "ContributionHeader";
