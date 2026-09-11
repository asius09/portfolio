import { Project } from "@/types/project.type";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandSupabase,
  IconBrandFramerMotion,
  IconBrandVercel,
  IconBrandMongodb,
  IconBrandNodejs,
  IconBrandAws,
} from "@tabler/icons-react";

export const projects: Project[] = [
  {
    name: "BabySteps",
    description:
      "A modern health-tech platform helping couples through pre-pregnancy, pregnancy, and parenting journeys with guidance, tracking, Medical & non-medical Specialist connectivity, and AI-assisted experiences across web and mobile.",
    features: [
      "Worked on production-level web and mobile applications",
      "Built and improved onboarding and user experience flows",
      "Refactored reusable UI systems and component structures",
      "Fixed production bugs and optimized frontend performance",
      "Worked across backend APIs, CMS workflows, and admin systems",
      "Improved maintainability with cleaner folder structures and reusable components",
    ],
    github: "",
    live: "https://www.babysteps.world/",
    image: "/babysteps-project.png",
    stacks: [
      {
        buttonKey: "nextjs",
        label: "Next.js",
        Icon: IconBrandNextjs,
        className: "text-foreground",
      },
      {
        buttonKey: "react",
        label: "React",
        Icon: IconBrandReact,
        className: "text-cyan-600 dark:text-cyan-400",
      },
      {
        buttonKey: "react-native",
        label: "React Native",
        Icon: IconBrandReactNative,
        className: "text-blue-600 dark:text-blue-400",
      },
      {
        buttonKey: "typescript",
        label: "TypeScript",
        Icon: IconBrandTypescript,
        className: "text-blue-600 dark:text-blue-400",
      },
      {
        buttonKey: "tailwind",
        label: "TailwindCSS",
        Icon: IconBrandTailwind,
        className: "text-teal-600 dark:text-teal-300",
      },
      {
        buttonKey: "node",
        label: "Node.js",
        Icon: IconBrandNodejs,
        className: "text-emerald-600 dark:text-emerald-400",
      },
      {
        buttonKey: "mongodb",
        label: "MongoDB",
        Icon: IconBrandMongodb,
        className: "text-emerald-600 dark:text-emerald-500",
      },
      {
        buttonKey: "aws",
        label: "AWS",
        Icon: IconBrandAws,
        className: "text-amber-600 dark:text-orange-400",
      },
    ],
  },

  {
    name: "StyleSnap AI",
    description:
      "AI-powered image styling platform that transforms photos into visually unique artistic outputs using modern generative AI workflows.",
    features: [
      "Upload and preview images instantly",
      "AI-powered image style generation",
      "Free generation flow with usage restrictions",
      "Responsive and animated modern UI",
      "Integrated external AI APIs and cloud deployment",
    ],
    github: "https://github.com/asius09/stylesnap-ai",
    live: "https://stylesnap-ai.vercel.app/",
    image: "/stylesnap-project.png",
    stacks: [
      {
        buttonKey: "nextjs",
        label: "Next.js",
        Icon: IconBrandNextjs,
        className: "text-foreground",
      },
      {
        buttonKey: "react",
        label: "React",
        Icon: IconBrandReact,
        className: "text-cyan-600 dark:text-cyan-400",
      },
      {
        buttonKey: "typescript",
        label: "TypeScript",
        Icon: IconBrandTypescript,
        className: "text-blue-600 dark:text-blue-400",
      },
      {
        buttonKey: "tailwind",
        label: "TailwindCSS",
        Icon: IconBrandTailwind,
        className: "text-teal-600 dark:text-teal-300",
      },
      {
        buttonKey: "supabase",
        label: "Supabase",
        Icon: IconBrandSupabase,
        className: "text-emerald-600 dark:text-emerald-400",
      },
      {
        buttonKey: "framer",
        label: "Framer Motion",
        Icon: IconBrandFramerMotion,
        className: "text-pink-600 dark:text-pink-400",
      },
      {
        buttonKey: "vercel",
        label: "Vercel",
        Icon: IconBrandVercel,
        className: "text-foreground",
      },
    ],
  },

  {
    name: "Resume Zero: A local resume builder",
    description:
      "Minimal resume builder focused on speed, simplicity, and clean PDF generation with a distraction-free editing experience.",
    features: [
      "Real-time resume editing and preview",
      "Minimal and clean writing-focused interface",
      "Instant PDF generation",
      "Structured layout system for resumes",
      "Fast and lightweight frontend experience",
    ],
    github: "",
    live: "https://r0.asius.in",
    image: "/r0-project.png",
    stacks: [
      {
        buttonKey: "nextjs",
        label: "Next.js",
        Icon: IconBrandNextjs,
        className: "text-foreground",
      },
      {
        buttonKey: "react",
        label: "React",
        Icon: IconBrandReact,
        className: "text-cyan-600 dark:text-cyan-400",
      },
      {
        buttonKey: "typescript",
        label: "TypeScript",
        Icon: IconBrandTypescript,
        className: "text-blue-600 dark:text-blue-400",
      },
      {
        buttonKey: "tailwind",
        label: "TailwindCSS",
        Icon: IconBrandTailwind,
        className: "text-teal-600 dark:text-teal-300",
      },
      {
        buttonKey: "vercel",
        label: "Vercel",
        Icon: IconBrandVercel,
        className: "text-foreground",
      },
    ],
  },
];
