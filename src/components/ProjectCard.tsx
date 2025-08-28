import { IconBrandGithubFilled, IconLink } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Project, ProjectStack } from "@/types/project.type";

type AnimatedButtonProps = ProjectStack & {
  idx: number;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
  const { buttonKey, label, Icon, className, idx } = props;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isActive = hovered || focused;

  return (
    <motion.button
      layout
      key={buttonKey}
      type="button"
      aria-label={label}
      title={label}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "group from-gradient-from to-gradient-to ring-border flex items-center justify-center rounded-full bg-gradient-to-b px-1 text-right ring-1 outline-none",
        "cursor-pointer gap-2 p-2 transition-all duration-300 ease-in-out",
        idx !== 0 && "-ml-2 md:-ml-3",
        buttonKey === "nextjs" ? "text-gradient-foreground" : className,
        "relative",
        "h-8 min-w-8 md:h-10 md:min-w-10",
        isActive ? "z-[999]" : `z-[${20 + idx}]`,
        "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
      )}
      animate={{
        zIndex: isActive ? 999 : 20 + idx,
      }}
    >
      {Icon ? (
        <Icon
          className={cn(className, "size-3 shrink-0 md:size-5")}
          aria-hidden={true}
        />
      ) : (
        <span className="text-gradient-foreground flex size-3 shrink-0 items-center justify-center text-sm font-bold md:size-5 md:text-base">
          {label?.[0]}
        </span>
      )}
      <AnimatePresence>
        {isActive && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            style={{
              overflow: "hidden",
              display: "inline-block",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
            }}
            className={cn("pr-1 text-xs", className)}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const ProjectCard = (project: Project) => {
  return (
    <div
      className="w-full p-3"
      aria-labelledby="project-title"
      tabIndex={-1}
      role="region"
    >
      <motion.figure
        whileHover={{
          scale: 1.015,
          boxShadow:
            "0 8px 32px 0 rgba(36,37,46,0.22), 0 1.5px 8px 0 rgba(0,0,0,0.10)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        className="border-border relative aspect-video w-full overflow-hidden rounded-lg border border-solid"
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1152px"
          priority
        />
      </motion.figure>
      <div id="project-content" className="w-full px-1 pt-4">
        <h4
          id="project-title"
          className="text-foreground text-base font-semibold"
          tabIndex={0}
        >
          {project.name}
        </h4>
        <p
          className="text-foreground/80 mt-1 line-clamp-3 overflow-hidden text-sm"
          aria-label="Project description"
        >
          {project.description}
        </p>
        <ul
          className="text-foreground/80 mt-3 flex list-disc flex-col gap-1 px-4"
          aria-label="Project features"
        >
          {project.features.map((feature, idx) => (
            <li key={idx} className="min-h-[1.5rem] text-sm" tabIndex={0}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          id="project-card-footer"
          className="mt-6 flex flex-col items-start justify-center gap-3"
        >
          <div className="relative mb-3 flex h-10 flex-wrap items-center justify-start overflow-visible">
            {project.stacks.map(
              ({ buttonKey, label, Icon, className }, idx) => {
                return (
                  <AnimatedButton
                    key={buttonKey}
                    buttonKey={buttonKey}
                    Icon={Icon}
                    label={label}
                    className={className}
                    idx={idx}
                  />
                );
              },
            )}
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full"
              aria-label="View project on GitHub"
              tabIndex={0}
              title="View project on GitHub"
            >
              <Button
                className="w-full md:py-5"
                variant="default"
                tabIndex={-1}
                aria-label="View project on GitHub"
              >
                <IconBrandGithubFilled
                  className="size-4"
                  aria-hidden="true"
                  focusable="false"
                />
                <span>GitHub</span>
              </Button>
            </Link>
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full"
              aria-label="Visit live demo"
              tabIndex={0}
              title="Visit live demo"
            >
              <Button
                className="w-full md:py-5"
                variant="outline"
                tabIndex={-1}
                aria-label="Visit live demo"
              >
                <IconLink
                  className="size-5"
                  aria-hidden="true"
                  focusable="false"
                />
                <span>Live</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
