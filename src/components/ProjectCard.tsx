import { IconBrandGithubFilled, IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Project } from "@/types/project.type";
import { AnimatedButton } from "./AnimatedButton";

const ProjectLinks = ({
  project,
  isList,
}: {
  project: Project;
  isList: boolean;
}) => (
  <div
    className={cn(
      "flex shrink-0 items-center",
      isList ? "gap-1.5 pt-0.5" : "gap-1",
    )}
  >
    {project.github && (
      <Link
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} source code on GitHub`}
        title="View on GitHub"
      >
        <Button
          variant="ghost"
          className={cn(
            "text-muted-foreground hover:bg-background-hover hover:text-foreground rounded-md p-0 transition-colors",
            isList ? "h-auto w-auto p-1" : "h-6 w-6",
          )}
          tabIndex={-1}
        >
          <IconBrandGithubFilled
            className={isList ? "size-4" : "size-3.5"}
            aria-hidden="true"
          />
        </Button>
      </Link>
    )}
    {project.live && (
      <Link
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name} live demo`}
        title="Visit live demo"
      >
        <Button
          variant="ghost"
          className={cn(
            "text-muted-foreground hover:bg-background-hover hover:text-foreground rounded-md p-0 transition-colors",
            isList ? "h-auto w-auto p-1" : "h-6 w-6",
          )}
          tabIndex={-1}
        >
          <IconArrowUpRight
            className={isList ? "size-4" : "size-3.5"}
            aria-hidden="true"
          />
        </Button>
      </Link>
    )}
  </div>
);

export const ProjectCard = (
  project: Project & { viewMode?: "grid" | "list" },
) => {
  const isList = project.viewMode === "list";
  // Critically-damped tween shared with the parent list: no spring overshoot,
  // no blur/scale (both forced repaints and read as "bouncy" on toggle).
  const transition = {
    type: "tween" as const,
    duration: 0.28,
    ease: [0.32, 0.72, 0, 1] as const,
  };

  return (
    <motion.article
      layout
      transition={transition}
      className={cn(
        "group relative flex overflow-hidden transition-colors duration-300",
        isList
          ? "hover:bg-background-hover/50 flex-col gap-1 rounded-lg border border-transparent p-2.5"
          : "border-border/80 bg-card/60 hover:border-border hover:bg-card h-full flex-col rounded-xl border p-2.5 shadow-xs",
      )}
      aria-labelledby={`project-title-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.figure
        layout
        transition={transition}
        initial={false}
        animate={{
          height: isList ? 0 : "auto",
          opacity: isList ? 0 : 1,
          marginBottom: isList ? 0 : 12,
        }}
        className={cn(
          "border-border/50 bg-background-hover/30 relative w-full shrink-0 overflow-hidden border",
          !isList && "aspect-16/10 rounded-lg",
          isList && "border-transparent",
        )}
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </motion.figure>

      <motion.div
        layout
        transition={transition}
        className={cn(
          "flex flex-1 flex-col justify-between",
          isList ? "w-full" : "px-0.5",
        )}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <h3
              id={`project-title-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "text-foreground font-semibold tracking-tight transition-colors",
                isList
                  ? "group-hover:text-accent truncate text-base group-hover:underline group-hover:underline-offset-4"
                  : "text-sm",
              )}
            >
              {project.name}
            </h3>

            <p
              className={cn(
                "text-muted-foreground leading-relaxed tracking-tight",
                isList
                  ? "mt-0.5 line-clamp-1 text-sm"
                  : "mt-1 line-clamp-2 text-xs",
              )}
            >
              {project.description}
            </p>
          </div>

          <ProjectLinks project={project} isList={isList} />
        </div>

        <div
          className={cn(
            "flex items-center overflow-hidden",
            isList
              ? "mt-1 flex-wrap"
              : "border-border/50 mt-3 flex-wrap border-t pt-3",
          )}
        >
          {project.stacks.map(({ buttonKey, label, Icon, className }, idx) => (
            <AnimatedButton
              key={buttonKey}
              buttonKey={buttonKey}
              Icon={Icon}
              label={label}
              className={className}
              idx={idx}
            />
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
};
