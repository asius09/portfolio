import { Project } from "@/types/project.type";

export const projects: Project[] = [
  {
    name: "StyleSnap AI",
    description:
      "AI tool to transform images into various styles. Fast, easy, and creative.",
    features: ["Upload images", "10+ styles", "Download result", "AI powered"],
    stacks: ["Next.js", "React", "TypeScript", "TailwindCSS", "AI API"],
    github: "https://github.com/example",
    live: "https://stylesnap-ai-demo.com",
    image: "/profile.png",
  },
  {
    name: "TaskFlow",
    description:
      "A simple and intuitive task management app for teams and individuals.",
    features: [
      "Real-time collaboration",
      "Drag & drop tasks",
      "Due date reminders",
      "Dark mode",
    ],
    stacks: ["React", "TypeScript", "Supabase", "TailwindCSS"],
    github: "https://github.com/example/taskflow",
    live: "https://taskflow-demo.com",
    image: "/taskflow.png",
  },
];
