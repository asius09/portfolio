import React from "react";

export const WorkingIdea = () => {
  return (
    <section id="working-idea-section" className="mt-12 w-full">
      <h2 className="text-2xl font-semibold text-white">Working Ideas</h2>
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-md rounded-lg border border-neutral-700 bg-neutral-900/60 p-6 text-center">
          <p className="text-base text-white/80">
            I am currently building my portfolio.
          </p>
        </div>
      </div>
    </section>
  );
};
