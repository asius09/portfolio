// Experience data structure following requirements:
// - Multiple positions per company (timeline at same company)
// - Fields: company name, companyDisplay (logo or url), role, employmentType, start, end, status (active/past/ongoing), 
//   bulletPoints (with rich text or links), techBadges (tools/skills used).

export interface ExperienceBullet {
  content: string;
  links?: { label: string; url: string }[];
}

export interface ExperiencePosition {
  role: string;
  employmentType: "Full-time" | "Part-time" | "Internship" | "Contract" | "Freelance" | "Other";
  start: string; // ISO date or "MMM YYYY"
  end?: string; // ISO date or "Present"
  status: "active" | "past" | "ongoing";
  bulletPoints: ExperienceBullet[];
  techBadges: string[]; // List of tech/skill names
}

export interface ExperienceCompany {
  companyName: string;
  companyDisplay: {
    logoUrl?: string; // Logo image url
    websiteUrl?: string;
    displayName?: string; // Optional alt display (e.g., "OpenAI" vs "openai.com")
  };
  positions: ExperiencePosition[]; // Allow timeline at same company
}

// Example
export const experience: ExperienceCompany[] = [
  {
    companyName: "OpenAI",
    companyDisplay: {
      logoUrl: "/chatgpt.png",
      websiteUrl: "https://openai.com",
      displayName: "OpenAI",
    },
    positions: [
      {
        role: "AI Research Engineer",
        employmentType: "Full-time",
        start: "2023-07",
        end: "Present",
        status: "active",
        bulletPoints: [
          {
            content: "Build and maintain production-scale GPT-based APIs for customers.",
            links: [
              {
                label: "GPT API",
                url: "https://platform.openai.com/docs/guides/gpt",
              },
            ],
          },
          {
            content: "Improved XYZ model efficiency by 20% by refactoring attention module.",
          },
          {
            content:
              "Wrote technical blog posts such as [Training Large Language Models](https://openai.com/research/publications/training-large-language-models).",
            links: [
              {
                label: "Training Large Language Models",
                url: "https://openai.com/research/publications/training-large-language-models",
              },
            ],
          },
        ],
        techBadges: ["Python", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "AWS"],
      },
      {
        role: "AI Intern",
        employmentType: "Internship",
        start: "2022-05",
        end: "2022-08",
        status: "past",
        bulletPoints: [
          {
            content:
              "Researched and implemented prototype for in-context learning improvements.",
            links: [
              {
                label: "In-context paper",
                url: "https://arxiv.org/abs/2208.12266",
              },
            ],
          },
        ],
        techBadges: ["Python", "NumPy"],
      },
    ],
  },
  {
    companyName: "Acme Corp",
    companyDisplay: {
      logoUrl: "/chatgpt.png",
      websiteUrl: "https://acme.com",
      displayName: "Acme",
    },
    positions: [
      {
        role: "Frontend Developer",
        employmentType: "Full-time",
        start: "2021-03",
        end: "2023-06",
        status: "past",
        bulletPoints: [
          {
            content:
              "Built internal dashboard using [React](https://react.dev/) and [Next.js](https://nextjs.org/).",
            links: [
              { label: "React", url: "https://react.dev/" },
              { label: "Next.js", url: "https://nextjs.org/" },
            ],
          },
          {
            content: "Improved CI/CD pipeline reducing deployment time by 30%.",
          },
        ],
        techBadges: ["React", "Next.js", "TypeScript", "Jest", "GitHub Actions"],
      },
    ],
  },
];