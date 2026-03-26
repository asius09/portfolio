"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const tooltipContentVariants = cva(
  "absolute z-50 pointer-events-none bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-2 py-1 rounded-md text-[10px] font-medium shadow-xl backdrop-blur-md border border-white/10 dark:border-black/10 whitespace-nowrap",
  {
    variants: {
      side: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      side: "top",
    },
  }
);

const arrowVariants = cva("absolute border-4 w-0 h-0", {
  variants: {
    side: {
      top: "top-full left-1/2 -translate-x-1/2 border-t-zinc-900 dark:border-t-zinc-100 border-x-transparent border-b-transparent",
      bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900 dark:border-b-zinc-100 border-x-transparent border-t-transparent",
      left: "left-full top-1/2 -translate-y-1/2 border-l-zinc-900 dark:border-l-zinc-100 border-y-transparent border-r-transparent",
      right: "right-full top-1/2 -translate-y-1/2 border-r-zinc-900 dark:border-r-zinc-100 border-y-transparent border-l-transparent",
    },
  },
  defaultVariants: {
    side: "top",
  },
});

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const Tooltip = ({
  children,
  delayDuration = 200
}: {
  children: React.ReactNode;
  delayDuration?: number;
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocusCapture={handleOpen}
        onBlurCapture={handleClose}
        className="relative inline-block"
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({
  children,
  asChild = false
}: {
  children: React.ReactNode;
  asChild?: boolean
}) => {
  if (asChild && React.isValidElement(children)) {
    return children;
  }
  return <div className="inline-block">{children}</div>;
};

export interface TooltipContentProps extends VariantProps<typeof tooltipContentVariants> {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}

export const TooltipContent = ({
  children,
  className,
  side = "top",
}: TooltipContentProps) => {
  const context = useContext(TooltipContext);
  if (!context) return null;

  const motionVariants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      y: side === "top" ? 4 : side === "bottom" ? -4 : 0,
      x: side === "left" ? 4 : side === "right" ? -4 : 0
    },
    animate: { opacity: 1, scale: 1, y: 0, x: 0 },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.1 }
    }
  };

  return (
    <AnimatePresence>
      {context.open && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={motionVariants}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(tooltipContentVariants({ side }), className)}
        >
          {children}
          <div className={arrowVariants({ side })} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};




