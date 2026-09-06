"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
}

export const CopyButton = ({
  value,
  className,
  label = "Copy",
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (copied) setCopied(false);
  };

  const handleMouseLeave = () => {
    if (copied) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 400);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={copied ? "Copied!" : label}
          className={cn(
            "relative size-5 rounded-full inline-flex items-center justify-center transition-opacity duration-150 cursor-pointer",
            "group-hover:opacity-100 md:opacity-0 focus-visible:opacity-100",
            copied
              ? "text-green-500 opacity-100"
              : "text-mute-foreground hover:text-foreground",
            className
          )}
        >
          {copied ? (
            <IconCheck size={14} stroke={2.5} className="scale-110" />
          ) : (
            <IconCopy size={14} stroke={2} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">
        {copied ? "Copied!" : label}
      </TooltipContent>
    </Tooltip>
  );
};
