import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";

export const Project = () => {
  return (
    <section id="project-section" className="mt-12 w-full">
      <h2 className="text-2xl font-semibold text-white">Projects</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 space-y-4 md:grid-cols-2">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <div className="my-8 grid w-full place-content-center">
        <Button variant="outline" className="max-w-2xs hover:underline">
          See More <span className="ml-2">&#8594;</span>
        </Button>
      </div>
    </section>
  );
};
