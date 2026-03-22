import { cn } from "@/lib/utils";
import React, { PropsWithChildren, useEffect, useState } from "react";

type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  children?: React.ReactNode;
  arrowDir?: "downward" | "upward";
};

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    (typeof navigator !== "undefined" &&
      (navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigator.msMaxTouchPoints > 0))
  );
}

export const Tooltip = ({
  children,
  className,
  arrowDir = "downward",
  ...props
}: PropsWithChildren<TooltipProps>) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  const arrowDirection =
    arrowDir === "downward"
      ? "after:border-t-[6px] after:border-t-foreground"
      : "after:border-b-[6px] after:border-b-foreground";
  const arrowBase =
    "after:absolute after:h-0 after:w-0 after:border-r-[4px] after:border-l-[4px] after:border-r-transparent after:border-l-transparent after:left-1/2 after:-translate-x-1/2";

  if (isMobile) {
    return null;
  }

  return (
    <span
      className={cn(
        "absolute left-1/2 z-9999 shrink-0 -translate-x-1/2 cursor-pointer",
        "max-w-xs rounded-lg px-2 py-1 text-center text-[10px] font-medium shadow-lg",
        "bg-foreground text-background",
        "group-active:opactiy-0 pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-0",
        "group-hover:scale-110 transition-all duration-250",
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
