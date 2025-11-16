import { useState } from "react";
import { ExperienceCompany } from "@/data/experience";
import Image from "next/image";
import Link from "next/link";

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
  return formattedEnd ? `${s} - ${formattedEnd}` : s;
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
    <article className="w-full bg-background p-2 rounded-md mb-4 border shadow transition">
      <button
        className="w-full flex items-center gap-3 focus:outline-none p-2 rounded-md hover:bg-muted transition"
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
            width={32}
            height={32}
            className="rounded-full object-cover border bg-white"
          />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-base font-medium text-foreground truncate">{companyDisplay.displayName || companyName}</span>
          {companyUrl && (
            <span className="block text-xs text-muted-foreground truncate">
              {companyUrl.replace(/^https?:\/\//, "")}
            </span>
          )}
        </span>
        <span className="text-xs text-muted-foreground text-right">
          {firstPosition.role}
          {firstPosition.start && (
            <span className="ml-2">{formatDateRange(firstPosition.start, firstPosition.end)}</span>
          )}
        </span>
        <span aria-hidden="true" className="ml-2">
          <svg width="18" height="18" className={`transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div id={`exp-details-${companyName.replace(/\s+/g, "")}`} className="pl-12 pr-2 pt-3 pb-1 animate-fadein">
          {positions.map((position, idx) => (
            <section
              key={idx}
              className="mb-2"
              aria-label={position.role}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{position.role}</span>
                <span className="text-xs text-muted-foreground px-1 rounded bg-slate-100 dark:bg-slate-800">
                  {position.employmentType}
                </span>
                {position.status === "active" && (
                  <span className="ml-1 inline-flex items-center" title="Currently active">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                    </span>
                  </span>
                )}
                {position.status === "ongoing" && (
                  <span className="ml-1 inline-flex items-center" title="Ongoing">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400"></span>
                    </span>
                  </span>
                )}
                <span className="ml-2 text-xs text-muted-foreground">
                  {formatDateRange(position.start, position.end)}
                </span>
              </div>

              {position.bulletPoints.length > 0 && (
                <ul className="mt-0.5 ml-4 list-disc text-xs space-y-0.5 text-muted-foreground">
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
                              className="text-sky-600 underline"
                            >
                              {part}
                            </a>
                          );
                        }
                        return j % 3 === 0 ? part : null;
                      })}
                      {bp.links &&
                        bp.links.map((link, k) => (
                          <span key={k} className="ml-2">
                            [
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-600 underline"
                            >
                              {link.label}
                            </a>
                            ]
                          </span>
                        ))}
                    </li>
                  ))}
                </ul>
              )}

              {position.techBadges && position.techBadges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {position.techBadges.map((tech, i) => (
                    <span
                      key={tech + i}
                      className="bg-sky-50 text-sky-700 rounded px-1 py-0.5 text-[11px] font-mono dark:bg-sky-950 dark:text-sky-200"
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
            <div className="mt-2 text-xs">
              <Link href={companyUrl} target="_blank" rel="noopener noreferrer" className="underline text-sky-600">
                Visit Website
              </Link>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
