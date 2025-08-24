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
      layout="position"
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
        "group flex items-center justify-center rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 px-1 text-right shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ring-1 ring-zinc-500",
        "h-8 min-w-[2rem] cursor-pointer gap-2 p-1 transition-all duration-300 ease-in-out",
        idx !== 0 && "-ml-2",
        className,
        "relative",
        isActive && "ring-2 ring-zinc-400 outline-none",
      )}
      style={{
        transition:
          "box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1), margin 0.3s cubic-bezier(0.4,0,0.2,1), z-index 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: isActive
          ? "0 6px 20px 0 rgba(0,0,0,0.18)"
          : "0 1px 2px 0 rgba(0,0,0,0.05)",
        transform: isActive ? "scale(1.03)" : "scale(1)",
        borderColor: "transparent",
        zIndex: isActive ? 999 : 20 + idx,
      }}
      animate={{
        zIndex: isActive ? 999 : 20 + idx,
      }}
    >
      <motion.span
        layout
        animate={isActive ? { scale: 1.03 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-2"
      >
        {Icon ? (
          <Icon
            className={cn(className, "size-4 shrink-0")}
            aria-hidden={true}
          />
        ) : (
          <span className="shrink-0 text-sm text-white">{label[0]}</span>
        )}

        <AnimatePresence>
          {isActive && (
            <motion.span
              key="label"
              initial={{ scaleX: 0.7, opacity: 0, width: 0 }}
              animate={{
                scaleX: 1,
                opacity: 1,
                width: isActive ? "auto" : 0, // Only animate width when active
                transition: {
                  scaleX: { type: "spring", stiffness: 350, damping: 24 },
                  opacity: {
                    duration: 0.28,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.08,
                  },
                  // Only animate width when active
                  ...(isActive && {
                    width: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
                  }),
                },
              }}
              exit={{
                scaleX: 0.7,
                opacity: 0,
                width: 0,
                transition: {
                  scaleX: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.13 },
                  width: { duration: 0.18 },
                },
              }}
              style={{
                overflow: "hidden",
                display: "inline-block",
                whiteSpace: "nowrap",
                verticalAlign: "middle",
                originX: 0,
              }}
              className={cn("pr-1 text-xs", className)}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
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
          className: found.className,
        }
      : {
          key: stackName,
          label: stackName,
          Icon: null,
          className: "text-white",
        };
  });

  return (
    <div
      className="w-full  md:max-w-sm p-3 md:p-4"
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
          className="text-base font-semibold text-white"
          tabIndex={0}
        >
          {project.name}
        </h4>
        <p
          className="mt-1 line-clamp-3 overflow-hidden text-sm text-white/80"
          aria-label="Project description"
        >
          {project.description}
        </p>
        <ul
          className="mt-3 flex list-disc flex-col gap-1 px-4 text-white/80"
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
                variant="secondary"
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
