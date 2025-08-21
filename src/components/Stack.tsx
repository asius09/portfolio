import React from "react";
import { stackItems } from "@/data/techStack";

export const Stack = () => {
  return (
    <section
      id="stack-section"
      className="mt-12 w-full"
      aria-labelledby="stack-heading"
      tabIndex={-1}
      role="region"
    >
      <h2
        id="stack-heading"
        className="text-2xl font-semibold text-white"
        tabIndex={0}
      >
        Stacks
      </h2>
      <ul
        className="mt-3 flex flex-wrap gap-4"
        aria-label="Technology stack"
        role="list"
      >
        {stackItems.map(({ key, label, icon: Icon, className }) => (
          <li
            key={key}
            className="group relative flex cursor-pointer flex-col items-center justify-center"
            role="listitem"
          >
            <button
              type="button"
              tabIndex={0}
              aria-label={label}
              className="flex items-center justify-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Icon
                className={`size-8 ${className}`}
                aria-hidden="true"
                focusable="false"
                title={label}
              />
            </button>
            {/* Tooltip */}
            <span
              className="pointer-events-none absolute -bottom-8 z-10 min-w-max rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
              role="tooltip"
              id={`tooltip-${key}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
