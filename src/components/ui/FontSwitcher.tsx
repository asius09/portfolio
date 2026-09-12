"use client";

import React from "react";
import { useFont, FontOption } from "@/hooks/use-font";
import { IconAdjustmentsFilled } from "@tabler/icons-react";
import { Button } from "./Button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { Popover } from "./Popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { flushSync } from "react-dom";

const fonts: { id: FontOption; name: string }[] = [
  { id: "geist", name: "Geist Sans" },
  { id: "inter", name: "Inter" },
  { id: "schibsted", name: "Schibsted Grotesk" },
];

export const FontSwitcher = () => {
  const { font, setFont, mounted } = useFont();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  if (!mounted) return null;

  const handleFontChange = (newFont: FontOption) => {
    if (font === newFont) return;

    if (!document.startViewTransition) {
      setFont(newFont);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setFont(newFont);
      });
    });
  };

  return (
    <Popover
      align="end"
      className="w-44"
      isOpen={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      content={
        <div className="flex flex-col gap-0.5">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFontChange(f.id)}
              className={cn(
                "group relative flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors",
                font === f.id
                  ? "text-accent-foreground font-medium"
                  : "text-foreground hover:bg-mute hover:text-foreground",
              )}
              style={{
                fontFamily: `var(--font-${f.id === "geist" ? "geist-sans" : f.id})`,
              }}
            >
              {font === f.id && (
                <motion.div
                  layoutId="font-active-bg"
                  className="bg-accent absolute inset-0 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{f.name}</span>
              {font === f.id && (
                <motion.div
                  layoutId="font-check"
                  className="relative z-10 flex items-center justify-center"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.3,
                        delay: 0.15,
                      }}
                      d="M5 12l5 5l10 -10"
                    />
                  </motion.svg>
                </motion.div>
              )}
            </button>
          ))}
        </div>
      }
    >
      <div className="inline-block">
        <Tooltip disabled={isPopoverOpen}>
          <TooltipTrigger asChild>
            <Button
              aria-label="Change font"
              className="group relative"
              size="icon-sm"
              variant="ghost"
            >
              <IconAdjustmentsFilled className="text-foreground size-[18px]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Change font</TooltipContent>
        </Tooltip>
      </div>
    </Popover>
  );
};
