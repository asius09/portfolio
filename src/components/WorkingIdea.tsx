import React from "react";

export const WorkingIdea = () => {
  return (
    <section id="working-idea-section" className="mt-12 w-full">
      <h2 className="text-foreground text-2xl font-semibold">Working Ideas</h2>
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <div className="border-border bg-background/60 w-full max-w-md rounded-lg border p-6 text-center">
          <p className="text-foreground/80 text-base">
            I am currently building my portfolio.
          </p>
        </div>
      </div>
    </section>
  );
};
