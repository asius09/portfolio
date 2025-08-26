import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  children?: React.ReactNode;
  arrowDir?: "downward" | "upward";
};

export const Tooltip = ({
  children,
  className,
  arrowDir = "downward",
  ...props
}: PropsWithChildren<TooltipProps>) => {
  const arrowDirection =
    arrowDir === "downward"
      ? "after:border-t-[6px] after:border-t-foreground/80"
      : "after:border-b-[6px] after:border-b-foreground/80";
  const arrowBase =
    "after:absolute after:h-0 after:w-0 after:border-r-[4px] after:border-l-[4px] after:border-r-transparent after:border-l-transparent after:left-1/2 after:-translate-x-1/2";

  return (
    <span
      className={cn(
        "absolute left-1/2 z-[9999] shrink-0 -translate-x-1/2 cursor-pointer",
        "max-w-xs rounded-sm px-1 py-0.5 text-center text-[10px] font-medium shadow-lg",
        "bg-foreground/80 text-background",
        "pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100",
        arrowBase,
        arrowDirection,
        "sn-tooltip",
        className,
      )}
      role="tooltip"
      tabIndex={-1}
      {...props}
    >
      {children}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
