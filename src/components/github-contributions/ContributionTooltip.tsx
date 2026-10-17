import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "cn";
import type { TooltipState } from "./types";

interface ContributionTooltipProps {
  tooltip: TooltipState;
  accentText: string;
}

export const ContributionTooltip: React.FC<ContributionTooltipProps> = ({
  tooltip,
  accentText,
}) => {
  const [mounted, setMounted] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
  }, [tooltip.visible, tooltip.title, tooltip.count, tooltip.activeDays]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const MARGIN = 8;
  const GAP = 8;
  const vw = typeof window === "undefined" ? 0 : window.innerWidth;
  const measured = size.w > 0 && size.h > 0 && vw > 0;

  const bubbleLeft = measured
    ? Math.min(
        Math.max(tooltip.x - size.w / 2, MARGIN),
        Math.max(vw - size.w - MARGIN, MARGIN)
      )
    : tooltip.x;

  const flip = measured && tooltip.y - GAP - size.h < 0;
  const bubbleTop = measured
    ? flip
      ? tooltip.y + tooltip.targetH + GAP
      : tooltip.y - GAP - size.h
    : tooltip.y;

  const arrowLeft = measured
    ? Math.min(Math.max(tooltip.x - bubbleLeft, 14), Math.max(size.w - 14, 14))
    : 14;

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 select-none"
      style={{
        transform: `translate3d(${bubbleLeft}px, ${bubbleTop}px, 0)`,
      }}
    >
      <div
        className={cn(
          "relative transition-[opacity,transform] duration-150 ease-out",
          flip ? "origin-top" : "origin-bottom",
          tooltip.visible
            ? "translate-y-0 scale-100 opacity-100"
            : cn(
                "scale-95 opacity-0",
                flip ? "-translate-y-1" : "translate-y-1"
              )
        )}
      >
        <div
          ref={bubbleRef}
          className="border-border/70 bg-background/95 text-foreground flex max-w-[70vw] items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap shadow-md backdrop-blur-md"
        >
          <span className="text-foreground truncate font-semibold">
            {tooltip.title}
          </span>
          <span className="text-muted-foreground opacity-40">•</span>
          <span className={cn("font-semibold", accentText)}>
            {tooltip.count}{" "}
            {tooltip.count === 1 ? "contribution" : "contributions"}
          </span>
          {typeof tooltip.activeDays === "number" && tooltip.activeDays > 0 && (
            <span className="text-muted-foreground text-[10px]">
              ({tooltip.activeDays}d active)
            </span>
          )}
          <div
            className={cn(
              "border-border/70 bg-background/95 absolute size-1.5 -translate-x-1/2 rotate-45 backdrop-blur-md",
              flip ? "-top-1 border-t border-l" : "-bottom-1 border-r border-b"
            )}
            style={{ left: arrowLeft }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
