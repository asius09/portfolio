"use client";

import React from "react";
import { useFont, FontOption } from "@/hooks/use-font";
import { IconAdjustmentsFilled, IconCheck } from "@tabler/icons-react";
import { Button } from "./Button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { Popover } from "./Popover";
import { cn } from "@/lib/utils";

const fonts: { id: FontOption; name: string }[] = [
  { id: "ibm", name: "IBM Plex Mono" },
  { id: "geist", name: "Geist Sans" },
  { id: "inter", name: "Inter" },
  { id: "schibsted", name: "Schibsted Grotesk" },
  { id: "space", name: "Space Grotesk" },
];

export const FontSwitcher = () => {
  const { font, setFont, mounted } = useFont();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  if (!mounted) return null;

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
              onClick={() => setFont(f.id)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors",
                font === f.id
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-foreground hover:bg-mute hover:text-foreground",
              )}
              style={{
                fontFamily: `var(--font-${f.id === "ibm" ? "ibm-plex-mono" : f.id === "geist" ? "geist-sans" : f.id})`,
              }}
            >
              {f.name}
              {font === f.id && <IconCheck className="size-3.5" />}
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
