import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const componentPath = path.join(
  rootDir,
  "src/components/GithubContributionCard.tsx",
);
const outputPath = path.join(rootDir, "public/r/github-contribution-card.json");

let content = fs.readFileSync(componentPath, "utf-8");

content = content.replace(
  'import { formatDate } from "@/lib/utils";\nimport Link from "next/link";',
  `function formatDate(dateString: string): string {
  if (!dateString || dateString === "No data") return "No data";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}`,
);

content = content.replace(/<Link\s+href=/g, "<a href=");
content = content.replace(/<\/Link>/g, "</a>");
content = content.replace(
  'className={cn("mt-12 w-full", className)}',
  'className={cn("w-full", className)}',
);

const registryItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "github-contribution-card",
  type: "registry:ui",
  title: "GitHub Contribution Grid",
  description:
    "Animated GitHub contribution calendar card with magical linear blur sweep, radiant peak glow, and interactive theme selector popover.",
  dependencies: ["cn", "motion"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/github-contribution-card.tsx",
      type: "registry:ui",
      content,
    },
  ],
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  JSON.stringify(registryItem, null, 2) + "\n",
  "utf-8",
);
