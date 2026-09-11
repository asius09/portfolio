import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ProjectStack } from "@/types/project.type";

type AnimatedButtonProps = ProjectStack & {
  idx: number;
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
  const { buttonKey, label, Icon, className, idx } = props;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isActive = hovered || focused;

  return (
    <motion.button
      layout
      key={buttonKey}
      type="button"
      aria-label={label}
      title={label}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full border border-border bg-card shadow-xs transition-colors duration-200 outline-none hover:bg-background-hover",
        "h-8 min-w-[32px]",
        idx !== 0 && "-ml-2.5", 
        isActive ? "z-50" : "z-10"
      )}
    >
      <motion.div layout className="flex size-8 shrink-0 items-center justify-center">
        {Icon ? (
          <Icon className={cn(className, "size-4 shrink-0")} aria-hidden={true} />
        ) : (
          <span className="flex size-4 shrink-0 items-center justify-center text-xs font-bold text-foreground">
            {label?.[0]}
          </span>
        )}
      </motion.div>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            layout
            initial={{ width: 0, opacity: 0, paddingRight: 0 }}
            animate={{ width: "auto", opacity: 1, paddingRight: 12 }}
            exit={{ width: 0, opacity: 0, paddingRight: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <span
              className={cn(
                "block whitespace-nowrap text-xs font-medium tracking-tight",
                buttonKey === "nextjs" ? "text-foreground" : className
              )}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
