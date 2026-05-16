import { ReactNode } from "react";
import type { IconType } from "react-icons";
import { IoCodeSlashOutline } from "react-icons/io5";

export interface ExperienceBullet {
  content: string;
}

export interface ExperiencePosition {
  icon: ReactNode | IconType;
  role: string;
  employmentType:
  | "Full-time"
  | "Part-time"
  | "Internship"
  | "Contract"
  | "Freelance"
  | "Other";
  start: string; // ISO date or "YYYY-MM-DD"
  end?: string; // ISO date or "YYYY-MM-DD" or "Present"
  status: "active" | "past" | "ongoing";
  bulletPoints: ExperienceBullet[];
}

export interface ExperienceCompany {
  companyName: string;
  companyDisplay: {
    logoUrl?: string;
    websiteUrl?: string;
    displayName?: string;
  };
  status: "active" | "past" | "ongoing";
  techBadges?: string[];
  positions: ExperiencePosition[];
}

export const experience: ExperienceCompany[] = [
   {
    companyName: "Only2U Fashion",
    status: "past",
    companyDisplay: {
      logoUrl: "/o2u.png",
      websiteUrl: "https://only2u.com",
      displayName: "Only2U",
    },
    techBadges: [
      "React",
      "React Native",
      "TypeScript",
      "Vercel",
      "AWS",
      "Git",
      "Supabase",
      "Framer Motion",
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "CMS",
      "Cron Jobs",
    ],
    positions: [
      {
        icon: IoCodeSlashOutline,
        role: "Full-Stack Developer",
        employmentType: "Freelance",
        start: "2026-04-01",
        end: "2026-05-12",
        status: "past",
        bulletPoints: [
          {
            content:
              "Built and maintained scalable CMS and analytics platforms using [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), and [PostgreSQL](https://www.postgresql.org/) with focus on clean architecture and performance.",
          },
          {
            content:
              "Developed internal admin systems enabling teams and vendors to manage content, track analytics, and control platform operations through a centralized dashboard.",
          },
          {
            content:
              "Implemented secure authentication flows with email, username, and employee-code based access alongside structured **role-based permissions** for admins and vendors.",
          },
          {
            content:
              "Integrated external platforms including [Shopify](https://www.shopify.com/) and inventory management systems with custom backend services for streamlined data synchronization.",
          },
          {
            content:
              "Worked on mobile application improvements by fixing production bugs, optimizing existing flows, and implementing new user-facing features across the platform.",
          },
          {
            content:
              "Refactored reusable components, standardized folder structures, and improved overall code maintainability across frontend and backend systems.",
          },
        ]
      },
    ],
  },
  {
    companyName: "Babysteps",
    status: "active",
    companyDisplay: {
      logoUrl: "/babysteps.png",
      websiteUrl: "https://www.babysteps.world",
      displayName: "Babysteps",
    },
    techBadges: [
      "React",
      "React Native",
      "Express",
      "Payload CMS",
      "TypeScript",
      "Monorepo",
      "AWS",
      "Docker",
      "Nginx",
      "CI/CD",
      "Git",
    ],
    positions: [
      {
        icon: IoCodeSlashOutline,
        role: "Full-Stack Developer",
        employmentType: "Internship",
        start: "2025-09-15",
        end: "Present",
        status: "active",
        bulletPoints: [
          {
            content:
              "Architected and introduced the [Monorepo](https://monorepo.tools/) foundation across [companion](https://www.babysteps.world/), [mobile](https://testflight.apple.com/join/8QD6rj24), and [carehub](https://carehub.babysteps.world/) apps to unify codebase management.",
          },
          {
            content:
              "Built [Express](https://expressjs.com/) RESTful APIs and integrated [Payload CMS](https://payloadcms.com/) with secure **authentication**, learning advanced patterns on the go.",
          },
          {
            content:
              "Managed real-world **production recoveries** and engineered `ErrorBoundary` systems to resolve critical runtime failures and incorrect code pushes.",
          },
          {
            content:
              "Optimized [AWS EC2](https://aws.amazon.com/ec2/) instances for cost-efficiency and implemented [Docker](https://www.docker.com/) + [Nginx](https://nginx.org/) for robust CI/CD flows.",
          },
          {
            content:
              "Delivered core features in a **fast-paced environment**, refactoring legacy modules to improve overall performance and code maintainability.",
          },
          {
            content:
              "Maintained clean Git history via advanced **cherry-picking** and authored technical docs for **CI/CD** pipelines and deployment scripts.",
          },
        ],
      },
    ],
  },
];
