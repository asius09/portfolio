import { ExperienceCompany } from "@/data/experience";
import Image from "next/image";
import { motion } from "motion/react";

export const ExperienceCard = (props: ExperienceCompany) => {
  const { companyName, companyDisplay, positions } = props;
  // Use logoUrl if available, otherwise fallback
  const logoUrl = companyDisplay.logoUrl || "/chatgpt.png";
  return (
    <div className="w-full p-3">
      <div className="flex flex-row items-center justify-start">
        <Image
          src={logoUrl}
          alt={companyDisplay.displayName || companyName}
          width={24}
          height={24}
          className="rounded-full object-cover"
        />

        <h3
          id="project-title"
          className="text-foreground ml-3 text-lg font-semibold"
          tabIndex={0}
        >
          {companyName}
        </h3>
        {/*
          Animated status dot using Framer Motion for smoother ping effect
        */}
        <span className="relative ml-3 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_3px_rgba(56,189,248,0.65)]" />
        </span>
      </div>
    </div>
  );
};
