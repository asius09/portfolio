import React from "react";
import { education } from "@/data/education";

export const Education = () => {
  return (
    <section id="education-section" className="mt-12 w-full">
      <h2 className="text-2xl font-semibold text-white">Education</h2>
      <div className="mt-6 w-full space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="flex items-start gap-2">
            {/* Pointer/Arrow Icon */}
            <span
              className="mt-1 flex h-6 w-6 items-center justify-center text-white"
              aria-hidden="true"
            >
              {/* Unicode arrow, or you can use an SVG if you prefer */}
              <span className="text-xl select-none">➤</span>
            </span>
            <div className="flex w-full justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {edu.institution}
                </h3>
                <p className="mt-1 text-sm font-medium text-white/80">
                  {edu.qualification}
                </p>
              </div>
              <span className="text-right text-sm font-normal text-blue-400">
                {edu.details}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
