import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";
import { projects } from "@/data/project";

export const Project = () => {
  return (
    <section
      id="project-section"
      className="mt-12 w-full"
      aria-labelledby="projects-heading"
      tabIndex={-1}
    >
      <h2
        id="projects-heading"
        className="text-2xl font-semibold text-white"
        tabIndex={0}
      >
        Projects
      </h2>
      <ul
        className="mt-6 grid grid-cols-1 gap-4 space-y-4 md:grid-cols-2"
        aria-label="Project list"
      >
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
      <div className="my-8 grid w-full place-content-center">
        <Button
          variant="ghost"
          className="max-w-2xs hover:underline"
          aria-label="See more projects"
        >
          See More <span aria-hidden="true">&#8594;</span>
        </Button>
      </div>
    </section>
  );
};
