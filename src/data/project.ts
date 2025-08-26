import { Project } from "@/types/project.type";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandSupabase,
  IconBrandFramerMotion,
  IconBrandVercel,
} from "@tabler/icons-react";
import { Replicate } from "@lobehub/icons";

export const projects: Project[] = [
  {
    name: "StyleSnap AI",
    description:
      "Transform your images into stunning art styles with AI. Fast, creative, and easy to use.",
    features: [
      "Upload and preview images instantly",
      "Choose from 10+ trending styles",
      "AI-powered style transfer",
      "Download styled images for free",
      "One free generation per user/IP",
    ],
    github: "https://github.com/asius09/stylesnap-ai",
    live: "https://stylesnap-ai.vercel.app/",
    image: "/stylesnap.webp",
    stacks: [
      {
        buttonKey: "nextjs",
        label: "Next.js",
        Icon: IconBrandNextjs,
        className: "text-gradient-foreground",
      },
      {
        buttonKey: "react",
        label: "React",
        Icon: IconBrandReact,
        className: "text-cyan-400",
      },
      {
        buttonKey: "typescript",
        label: "TypeScript",
        Icon: IconBrandTypescript,
        className: "text-blue-400",
      },
      {
        buttonKey: "tailwind",
        label: "TailwindCSS",
        Icon: IconBrandTailwind,
        className: "text-teal-300",
      },
      {
        buttonKey: "supabase",
        label: "Supabase",
        Icon: IconBrandSupabase,
        className: "text-green-400",
      },
      {
        buttonKey: "replicate",
        label: "Replicate API",
        Icon: Replicate,
        className: "text-gradient-foreground",
      },
      {
        buttonKey: "framer",
        label: "Framer Motion",
        Icon: IconBrandFramerMotion,
        className: "text-pink-400",
      },
      {
        buttonKey: "vercel",
        label: "Vercel",
        Icon: IconBrandVercel,
        className: "text-gradient-foreground",
      },
    ],
  },
];
