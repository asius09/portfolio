import { IconBrandGithubFilled, IconLink } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { stackItems } from "@/data/techStack";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { AnimatePresence, motion } from "motion/react";

type AnimatedButtonProps = {
  Icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
    focusable?: boolean;
  }> | null;
  label: string;
  idx: number;
  className?: string;
  buttonKey: string;
};

function AnimatedButton({
  Icon,
  label,
  idx,
  className,
  buttonKey,
}: AnimatedButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Determine if the button is "active" (hovered or focused)
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
        "group from-gradient-from to-gradient-to ring-border flex items-center justify-center rounded-full bg-gradient-to-b px-1 text-right shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ring-1 outline-none",
        "h-8 min-w-[2rem] cursor-pointer gap-2 p-2 transition-all duration-300 ease-in-out",
        idx !== 0 && "-ml-3",
        buttonKey === "nextjs" ? "text-gradient-foreground" : className,
        "relative",
      )}
      style={{
        zIndex: isActive ? 999 : 20 + idx,
      }}
      animate={{
        zIndex: isActive ? 999 : 20 + idx,
      }}
    >
      {Icon ? (
        <Icon className={cn(className, "size-4 shrink-0")} aria-hidden={true} />
      ) : (
        <span className="text-gradient-foreground size-4 shrink-0 font-bold">
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
}

export const ProjectCard = (project: Project) => {
  const stackIcons = project.stacks.map((stackName) => {
    const found =
      stackItems.find(
        (item) => item.label.toLowerCase() === stackName.toLowerCase(),
      ) ||
      stackItems.find(
        (item) => item.key.toLowerCase() === stackName.toLowerCase(),
      );
    return found
      ? {
          key: found.key,
          label: found.label,
          Icon: found.icon,
          className:
            found.key === "nextjs"
              ? "text-gradient-foreground"
              : found.className,
        }
      : {
          key: stackName,
          label: stackName,
          Icon: null,
          className: "text-gradient-foreground",
        };
  });

  return (
    <div
      className="w-full p-3 md:max-w-sm md:p-4"
      aria-labelledby="project-title"
      tabIndex={-1}
      role="region"
    >
      <motion.div
        whileHover={{
          scale: 1.01,
          boxShadow: "0 4px 32px 0 rgba(0,0,0,0.18)",
          borderColor: "#a1a1aa",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        className="relative aspect-video w-full overflow-hidden rounded-lg border border-solid border-zinc-600"
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1152px"
          priority
        />
      </motion.div>
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
          <div
            className="relative mb-3 flex h-10 items-center"
            tabIndex={-1}
            style={{ overflow: "visible", justifyContent: "flex-start" }}
          >
            {stackIcons.map(({ key, label, Icon, className }, idx) => (
              <AnimatedButton
                key={key}
                buttonKey={key}
                Icon={Icon}
                label={label}
                idx={idx}
                className={className}
              />
            ))}
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
                className="flex w-full items-center justify-center gap-2"
                variant="default"
                tabIndex={-1}
                aria-label="View project on GitHub"
              >
                <IconBrandGithubFilled
                  className="size-5"
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
                className="flex w-full items-center justify-center gap-2"
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
