import { ExperienceCompany } from "@/data/experience";
import Image from "next/image";
import Link from "next/link";

// Helper to format date ranges nicely
function formatDateRange(start: string, end?: string) {
  // If start or end look like YYYY-MM or YYYY, format MM/YYYY
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

  return (
    <article className="w-full bg-background p-4 rounded-lg border shadow-sm mb-6">
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          {companyUrl ? (
            <Link href={companyUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src={logoUrl}
                alt={companyDisplay.displayName || companyName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Link>
          ) : (
            <Image
              src={logoUrl}
              alt={companyDisplay.displayName || companyName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {companyDisplay.displayName || companyName}
          </h3>
          {companyUrl && (
            <Link
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-600 hover:underline"
            >
              {companyUrl.replace(/^https?:\/\//, "")}
            </Link>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {positions.map((position, idx) => (
          <section
            key={idx}
            className="bg-muted rounded-md p-3 border"
            aria-label={position.role}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{position.role}</span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border">
                  {position.employmentType}
                </span>
                {position.status === "active" && (
                  <span
                    className="ml-2 inline-flex items-center"
                    title="Currently active"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300/70 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_3px_rgba(56,189,248,0.65)]"></span>
                    </span>
                  </span>
                )}
                {position.status === "ongoing" && (
                  <span
                    className="ml-2 inline-flex items-center"
                    title="Ongoing"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400"></span>
                    </span>
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDateRange(position.start, position.end)}
              </span>
            </div>

            {position.bulletPoints.length > 0 && (
              <ul className="mt-2 ml-5 list-disc text-sm space-y-1">
                {position.bulletPoints.map((bp, i) => (
                  <li key={i}>
                    {bp.content.split(/\[(.+?)\]\((.+?)\)/g).map((part, j, arr) => {
                      // Simple markdown-style [label](url) links in content string
                      if (j % 3 === 1 && arr[j + 1]) {
                        // Label
                        return (
                          <a
                            key={j}
                            href={arr[j + 1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-700 dark:text-sky-400 underline"
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
                            className="text-sky-700 dark:text-sky-400 underline"
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

            {position.techBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {position.techBadges.map((tech, i) => (
                  <span
                    key={tech + i}
                    className="inline-flex items-center px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs font-mono border border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
};
