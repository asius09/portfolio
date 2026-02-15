import { useState } from "react";
import { ExperienceCompany } from "@/data/experience";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Minimal date range formatter
function formatDateRange(start: string, end?: string) {
  if (!start) return "";
  const s = start.match(/^\d{4}-\d{2}$/) ? start.split("-").reverse().join("/") : start;
  let formattedEnd = "";
  if (end) {
    formattedEnd =
      end === "Present"
        ? "Present"
        : end.match(/^\d{4}-\d{2}$/)
          ? end.split("-").reverse().join("/")
          : end;
  }
  return formattedEnd ? `${s}-${formattedEnd}` : s;
}

export const ExperienceCard = (company: ExperienceCompany) => {
  const { companyName, companyDisplay, positions } = company;
  const logoUrl = companyDisplay.logoUrl || "/chatgpt.png";
  const companyUrl = companyDisplay.websiteUrl;

  // Dropdown collapsed/expand state
  const [open, setOpen] = useState(false);

  // For the minimal look, only show the first position summary on collapsed,
  // expand for all details & badges.
  const firstPosition = positions[0];

  return (
    <div className={cn('w-full', 'bg-background', 'rounded-md', 'mb-4', 'shadow', 'transition')}>
      <button
        className={cn('w-full', 'flex', 'items-center', 'gap-2', 'focus:outline-none', 'rounded-md', 'hover:bg-muted', 'transition', 'py-3')}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`exp-details-${companyName.replace(/\s+/g, "")}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
        type="button"
      >
        <span className="shrink-0">
          <Image
            src={logoUrl}
            alt={companyDisplay.displayName || companyName}
            width={24}
            height={24}
            className={cn('rounded-full', 'object-cover')}
          />
        </span>
        <span className={cn('flex-1', 'min-w-0 text-left')}>
          <a className={cn('block', 'text-base', 'font-semibold', 'text-foreground', 'truncate', 'hover:underline underline-offset-2', 'cursor-pointer')} href={companyUrl} target="_blank" rel="noopener noreferrer">{companyDisplay.displayName || companyName}</a>
        </span>
      </button >
      <div
      className={cn('w-full', 'flex', 'items-center', 'gap-2')}
      >

        <span className="from-gradient-from to-gradient-to text-foreground flex size-5 items-center shrink-0 justify-center rounded-md bg-linear-to-b shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs">
          <firstPosition.icon className="text-foreground/60 size-3" strokeWidth={0.25} />
        </span>
        <button
         className={cn('w-full', 'flex', 'items-start', 'gap-2' , 'focus:outline-none','justify-between', 'rounded-md', 'hover:bg-muted', 'transition', 'py-1.5', 'hover:bg-foreground/5')}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`exp-details-${companyName.replace(/\s+/g, "")}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
        type="button"
        >

        <span className="flex flex-col flex-start">

          <p className={cn('text-[12px]', 'text-foreground', 'text-left', 'font-medium')}>{firstPosition.role}</p>
          < span className={cn('text-xs', 'text-muted-foreground', 'text-left')}>
            {/* {firstPosition.role} */}
            {firstPosition.employmentType} |
            {
              firstPosition.start && (
                <span className="ml-2">{formatDateRange(firstPosition.start, firstPosition.end)}</span>
              )
            }
          </span>
        </span>
        <span aria-hidden="true" className="flex-start shrink-0">
          <svg width="18" height="18" className={`transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </span>
              </button>

      </div>

      {
        open && (
          <div id={`exp-details-${companyName.replace(/\s+/g, "")}`} className={cn('pl-6', 'pr-2', 'pt-1', 'pb-1', 'animate-fadein')}>
            {positions.map((position, idx) => (
              <section
                key={idx}
                className="mb-2"
                aria-label={position.role}
              >
                  {/* {position.status === "active" && (
                    <span className={cn('ml-1', 'inline-flex', 'items-center')} title="Currently active">
                      <span className={cn('relative', 'flex', 'h-2', 'w-2')}>
                        <span className={cn('animate-ping', 'absolute', 'inline-flex', 'h-full', 'w-full', 'rounded-full', 'bg-sky-400', 'opacity-50')}></span>
                        <span className={cn('relative', 'inline-flex', 'h-2', 'w-2', 'rounded-full', 'bg-sky-500')}></span>
                      </span>
                    </span>
                  )} */}
                

                {position.bulletPoints.length > 0 && (
                  <ul className={cn('mt-0.5', 'ml-4', 'list-disc', 'text-xs', 'space-y-0.5', 'text-muted-foreground')}>
                    {position.bulletPoints.map((bp, i) => (
                      <li key={i}>
                        {/* Simple markdown-style [label](url) links parsing */}
                        {bp.content.split(/\[(.+?)\]\((.+?)\)/g).map((part, j, arr) => {
                          if (j % 3 === 1 && arr[j + 1]) {
                            return (
                              <a
                                key={j}
                                href={arr[j + 1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn('font-semibold')}
                              >
                                {part}
                              </a>
                            );
                          }
                          return j % 3 === 0 ? part : null;
                        })}
                      </li>
                    ))}
                  </ul>
                )}

                {position.techBadges && position.techBadges.length > 0 && (
                  <div className={cn('flex', 'flex-wrap', 'gap-1', 'mt-1')}>
                    {position.techBadges.map((tech, i) => (
                      <span
                        key={tech + i}
                        className={cn('bg-background/50', 'text-foreground', 'rounded', 'px-1', 'py-0.5', 'text-[11px]', 'font-mono', 'dark:bg-mute', 'dark:text-card-foreground')}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ))}
            {/* Optional: Show company's website link */}
            {companyUrl && (
              <div className={cn('mt-2', 'text-xs')}>
                <Link href={companyUrl} target="_blank" rel="noopener noreferrer" className={cn('underline', 'text-sky-600')}>
                  Visit Website
                </Link>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
};
