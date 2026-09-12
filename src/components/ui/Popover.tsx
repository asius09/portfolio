"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({ children, content, align = "end", className, isOpen: controlledIsOpen, onOpenChange }: PopoverProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const handleSetIsOpen = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(open);
    }
    onOpenChange?.(open);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleSetIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isControlled, onOpenChange]);

  const trigger = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          handleSetIsOpen(!isOpen);
          if ((children.props as any).onClick) {
            (children.props as any).onClick(e);
          }
        },
      })
    : <span onClick={() => handleSetIsOpen(!isOpen)}>{children}</span>;

  const alignments = {
    start: "left-0 origin-top-left",
    center: "left-1/2 -translate-x-1/2 origin-top",
    end: "right-0 origin-top-right",
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
              "absolute top-full z-50 mt-2 rounded-xl border border-border bg-card p-1.5 shadow-lg",
              alignments[align],
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
