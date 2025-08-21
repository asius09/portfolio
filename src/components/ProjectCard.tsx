import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandXFilled,
  IconLink,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/Button";

export const ProjectCard = () => {
  return (
    <div className="max-w-96 p-2">
      <Image
        src="/profile.png"
        alt="Project preview"
        width={384}
        height={216}
        className="aspect-video h-54 w-96 rounded-lg border border-neutral-700 object-cover shadow-sm"
      />
      <div id="project-content" className="w-full px-1 pt-4">
        <h4 className="text-whtie text-base font-semibold">Project Name</h4>
        <p className="text-base text-wrap text-white/80">
          An AI-powered tool which convert image to different styles.
        </p>

        <ul className="flex min-h-[7.5rem] list-disc flex-col justify-start gap-0 px-4 pt-3">
          <li className="min-h-[1.5rem] text-base text-wrap text-white/80">
            Hello World
          </li>
          <li className="min-h-[1.5rem] text-base text-wrap text-white/80">
            Hello World
          </li>
          <li className="min-h-[1.5rem] text-base text-wrap text-white/80">
            Hello World
          </li>
          <li className="min-h-[1.5rem] text-base text-wrap text-white/80">
            Hello World
          </li>
        </ul>
      </div>
      <div>
        <div
          id="project-card-footer"
          className="mt-6 flex flex-col items-start justify-center gap-3"
        >
          <div id="tech-stack" className="flex items-center gap-1 py-2">
            {[
              {
                icon: <IconBrandGithubFilled className="size-4 text-black" />,
                label: "GitHub",
              },
              {
                icon: (
                  <IconBrandLinkedinFilled className="size-4 text-blue-400" />
                ),
                label: "LinkedIn",
              },
              {
                icon: <IconBrandXFilled className="size-4 text-black/70" />,
                label: "Twitter",
              },
            ].map((item) => (
              <span
                key={item.label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition hover:opacity-70"
                aria-label={item.label}
              >
                {item.icon}
              </span>
            ))}
          </div>
          <div className="flex w-full gap-3">
            <Button
              className="flex w-full items-center justify-center gap-2"
              variant="secondary"
            >
              <IconBrandGithubFilled className="size-5" />
              Github
            </Button>
            <Button className="flex w-full items-center justify-center gap-2">
              <IconLink className="size-5" />
              Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
