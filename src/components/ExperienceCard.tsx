import { useState } from "react";
import { ExperienceCompany } from "@/data/experience";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);
  const firstPosition = positions[0];

  return (
    <div className={cn('w-full', 'bg-background', 'rounded-md', 'mb-2', 'shadow', 'transition')}>
      <button
        className={cn('w-full', 'flex', 'items-center', 'gap-2', 'focus:outline-none', 'rounded-md', 'hover:bg-muted', 'transition', 'py-3')}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`exp-details-${companyName.replace(/\s+/g, "")}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
        type="button"
      >
        <span className="shrink-0 size-8 overflow-hidden relative rounded-full">
          <Image
            src={logoUrl}
            alt={companyDisplay.displayName || companyName}
            fill
            sizes="32px"
            className={cn('rounded-full', 'object-contain w-full h-full')}
          />
        </span>
        <span className={cn('flex-1', 'min-w-0 text-left', 'flex flex-row')}>
          <Link className={cn('block', 'text-lg', 'font-semibold', 'text-foreground', 'truncate', 'hover:underline underline-offset-2', 'cursor-pointer')} href={companyUrl} target="_blank" rel="noopener noreferrer">{companyDisplay.displayName || companyName}</Link>
          {company.status === "active" && (
            <span className={cn('ml-3', 'inline-flex', 'items-center')} title="Currently active">
              <span className={cn('relative', 'flex', 'size-1.5')}>
                <span className={cn('animate-ping', 'absolute', 'inline-flex', 'h-full', 'w-full', 'rounded-full', 'bg-sky-400', 'opacity-50')}></span>
                <span className={cn('relative', 'inline-flex', 'size-1.5', 'rounded-full', 'bg-sky-400')}></span>
              </span>
            </span>
          )}
        </span>
      </button >
      <div
        className={cn('w-full', 'flex', 'items-start', 'gap-1')}
      >
        <span className="from-gradient-from to-gradient-to text-foreground flex size-6 items-center shrink-0 justify-center rounded-md bg-linear-to-b shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] mt-2">
          {typeof firstPosition.icon === 'function' ? (
            <firstPosition.icon className="text-foreground/60 size-3" strokeWidth={0.25} />
          ) : (
            firstPosition.icon
          )}
        </span>
        <button
          className={cn('w-full', 'flex', 'items-start', 'gap-2', 'focus:outline-none', 'justify-between', 'rounded-md', 'hover:bg-muted', 'transition', 'p-2', 'hover:bg-foreground/5 h-full min-h-0')}
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={`exp-details-${companyName.replace(/\s+/g, "")}`}
          style={{ WebkitTapHighlightColor: "transparent" }}
          type="button"
        >

          <span className="flex flex-col flex-start">
            <p className={cn('text-base', 'text-foreground', 'text-left', 'font-medium')}>{firstPosition.role}</p>
            <span className={cn('text-sm', 'text-foreground/60', 'text-left')}>
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
                {position.bulletPoints.length > 0 && (
                  <ul className={cn('mt-0.5', 'ml-4', 'list-disc marker:text-foreground/50', 'text-sm', 'space-y-2', 'text-muted-foreground', 'tracking-wide')}>
                    {position.bulletPoints.map((bp, i) => (
                      <li key={i}>
                        {bp.content
                          .split(/(\[.+?\]\(.+?\))|(\*\*.+?\*\*)/g)
                          .map((part, j) => {
                            if (!part) return null;
                            const linkMatch = part.match(/\[(.+?)\]\((.+?)\)/);
                            if (linkMatch) {
                              return (
                                <Link
                                  key={j}
                                  href={linkMatch[2]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    "font-semibold hover:underline hover:underline-offset-2 transition-all duration-200"
                                  )}
                                >
                                  {linkMatch[1]}
                                </Link>
                              );
                            }

                            // Handle Bold: **text**
                            const boldMatch = part.match(/\*\*(.+?)\*\*/);
                            if (boldMatch) {
                              return (
                                <strong key={j} className="font-bold text-foreground">
                                  {boldMatch[1]}
                                </strong>
                              );
                            }

                            return part;
                          })}
                      </li>
                    ))}
                  </ul>
                )}


              </section>
            ))}
          </div>
        )
      }
      {company.techBadges && company.techBadges.length > 0 && (
        <div className={cn('flex', 'flex-wrap', 'gap-1', 'mt-1', 'pl-6.5')}>
          {company.techBadges.map((tech, i) => (
            <span
              key={tech + i}
              className={cn('bg-background/50', 'text-muted-foreground', 'rounded-lg', 'px-1.5', 'py-1', 'text-[11px]', 'font-mono', 'dark:bg-mute', 'dark:text-card-foreground')}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div >
  );
};
