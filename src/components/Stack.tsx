import React from "react";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFramerMotion,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
} from "@tabler/icons-react";

const stackIcons: Record<string, React.ReactNode> = {
  React: <IconBrandReact className="size-5" />,
  "Next.js": <IconBrandNextjs className="size-5" />,
  TypeScript: <IconBrandTypescript className="size-5" />,
  TailwindCSS: <IconBrandTailwind className="size-5" />,
  "Framer Motion": <IconBrandFramerMotion className="size-5" />,
  JavaScript: <IconBrandJavascript className="size-5" />,
  HTML: <IconBrandHtml5 className="size-5" />,
  CSS: <IconBrandCss3 className="size-5" />,
};

const stackGradient: Record<string, string> = {
  React: "bg-gradient-to-r from-cyan-500 to-blue-400",
  "Next.js": "bg-gradient-to-r from-zinc-800 to-zinc-600",
  TypeScript: "bg-gradient-to-r from-blue-500 to-blue-300",
  TailwindCSS: "bg-gradient-to-r from-teal-400 to-cyan-300",
  "Framer Motion": "bg-gradient-to-r from-pink-400 to-fuchsia-500",
  JavaScript: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  HTML: "bg-gradient-to-r from-orange-400 to-yellow-400",
  CSS: "bg-gradient-to-r from-blue-300 to-blue-500",
};

const stackTextColor: Record<string, string> = {
  React: "text-cyan-100",
  "Next.js": "text-white",
  TypeScript: "text-blue-100",
  TailwindCSS: "text-teal-50",
  "Framer Motion": "text-pink-50",
  JavaScript: "text-yellow-50",
  HTML: "text-orange-50",
  CSS: "text-blue-50",
};

export const Stack = () => {
  return (
    <section id="stack-section" className="mt-12 w-full">
      <h2 className="text-2xl font-semibold text-white">Stack</h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {[
          { name: "React", color: "text-cyan-400" },
          { name: "Next.js", color: "text-white" },
          { name: "TypeScript", color: "text-blue-400" },
          { name: "TailwindCSS", color: "text-teal-300" },
          { name: "Framer Motion", color: "text-pink-400" },
          { name: "JavaScript", color: "text-yellow-300" },
          { name: "HTML", color: "text-orange-400" },
          { name: "CSS", color: "text-blue-300" },
        ].map((stack, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-2 rounded px-3 py-1 text-base font-medium shadow-sm ${stackGradient[stack.name] || "bg-white/10"} ${stackTextColor[stack.name] || stack.color} `}
            style={{
              // fallback for browsers that don't support gradients
              background: stackGradient[stack.name]
                ? undefined
                : "rgba(255,255,255,0.07)",
            }}
          >
            {stackIcons[stack.name] && <span>{stackIcons[stack.name]}</span>}
            <span>{stack.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
