"use client";
import React, { useState } from "react";
import { ProjectCard } from "../ProjectCard";
import { Button } from "../ui/Button";
import { projects } from "@/data/project";
import { motion } from "motion/react";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// One calm tween shared by every animation on this section. No springs, no
// blur filters: both caused the bouncy overshoot + repaint jank when toggling
// grid/list. `layout` transitions reuse the same curve via `layoutTransition`.
const EASE = [0.32, 0.72, 0, 1] as const;
const LAYOUT_TRANSITION = {
  type: "tween" as const,
  duration: 0.28,
  ease: EASE,
};

type ViewMode = "grid" | "list";

export const Project = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <motion.section
      id="project-section"
      aria-labelledby="projects-heading"
      tabIndex={-1}
      initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 w-full overflow-x-clip"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="projects-heading"
          tabIndex={0}
          className="text-foreground text-2xl font-semibold"
        >
          Projects
        </h2>

        <div
          role="tablist"
          aria-label="Project view"
          className="border-border/50 bg-card relative flex shrink-0 items-center gap-0.5 rounded-md border p-0.5 shadow-xs dark:border-white/10 dark:bg-neutral-900"
        >
          {(["grid", "list"] as const).map((mode) => {
            const selected = viewMode === mode;
            return (
              <button
                key={mode}
                role="tab"
                aria-selected={selected}
                onClick={() => setViewMode(mode)}
                aria-label={`${mode === "grid" ? "Grid" : "List"} view`}
                className={cn(
                  "relative z-10 cursor-pointer rounded p-1.5 transition-colors",
                  selected
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="active-view-tab"
                    transition={LAYOUT_TRANSITION}
                    className="absolute inset-0 -z-10 rounded bg-neutral-200/60 dark:bg-neutral-800"
                  />
                )}
                {mode === "grid" ? (
                  <IconLayoutGrid className="size-3.5" aria-hidden />
                ) : (
                  <IconList className="size-3.5" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/*
        `layout` on the list + items animates grid<->list reorder with the
        same critically-damped tween (no spring bounce). The list clips
        horizontally so mid-transition frames never cause page overflow.
      */}
      <motion.ul
        layout
        layoutRoot
        transition={LAYOUT_TRANSITION}
        aria-label="Project list"
        className={cn(
          "mt-6 min-w-0 overflow-x-clip",
          viewMode === "grid"
            ? "grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2"
            : "flex flex-col gap-1",
        )}
      >
        {projects.map((project, idx) => (
          <motion.li
            layout
            key={project.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              ...LAYOUT_TRANSITION,
              delay: Math.min(idx * 0.03, 0.15),
            }}
            // Capped stagger: cards fade in promptly instead of cascading.
            style={{ overflowAnchor: "none" }}
            className="min-w-0"
          >
            <ProjectCard {...project} viewMode={viewMode} />
          </motion.li>
        ))}
      </motion.ul>

      {projects.length > 4 && (
        <div className="my-8 grid w-full place-content-center">
          <Button
            variant="ghost"
            className="max-w-2xs hover:underline"
            aria-label="See more projects"
          >
            See More <span aria-hidden="true">&#8594;</span>
          </Button>
        </div>
      )}
    </motion.section>
  );
};
