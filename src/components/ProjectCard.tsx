import { IconBrandGithubFilled, IconLink } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { stackItems } from "@/data/techStack";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project.type";

export const ProjectCard = (project: Project) => {
  // Map stack names to stackItems for icon and color
  const stackIcons = project.stacks.map((stackName) => {
    // Try to find by label (case-insensitive)
    const found =
      stackItems.find(
        (item) => item.label.toLowerCase() === stackName.toLowerCase(),
      ) ||
      // Or by key (case-insensitive)
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
    <section
      className="w-full max-w-sm p-3 md:p-4"
      aria-labelledby="project-title"
      tabIndex={-1}
      role="region"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-solid border-zinc-600">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 384px"
          priority
        />
      </div>
      <div id="project-content" className="w-full px-1 pt-4">
        <h4
          id="project-title"
          className="text-base font-semibold text-white md:text-lg"
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
          {/* Stacks shown as horizontal stack with shadow and overlap */}
          <div className="relative mb-3 flex h-10 items-center">
            {stackIcons.map(({ key, label, Icon, className }, idx) => (
              <span
                key={key}
                className={cn(
                  "flex aspect-square size-10 items-center justify-center rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ring-1 ring-zinc-700",
                  "absolute top-1/2 -translate-y-1/2",
                  `z-[${20 - idx}]`,
                )}
                style={{ left: `${idx * 1.05}rem` }}
                title={label}
                aria-label={label}
              >
                {Icon ? (
                  <Icon
                    className={`size-6 ${className}`}
                    aria-hidden="true"
                    focusable="false"
                  />
                ) : (
                  <span className="text-xs text-white">{label[0]}</span>
                )}
              </span>
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
                <span>Live Demo</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
