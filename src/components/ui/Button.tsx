import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "social";
  size?: "default" | "sm" | "icon" | "icon-sm";
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border dark:border-white/10 shadow-xs active:brightness-95 transition-colors",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 transition-colors",
  ghost:
    "bg-transparent text-foreground hover:bg-mute active:bg-neutral-200 dark:active:bg-neutral-700 transition-colors",
  social:
    "border-border/70 text-foreground bg-neutral-100 shadow-xs hover:scale-105 hover:bg-neutral-200/70 dark:border-white/10 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-all duration-150 border",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-8 px-4 rounded-full",
  sm: "h-7 px-3 rounded-full text-xs",
  icon: "size-10 rounded-lg flex items-center justify-center",
  "icon-sm": "size-8 rounded-lg flex items-center justify-center",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "default",
      size = "default",
      tabIndex = 0,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const baseClasses = [
      "inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none select-none cursor-pointer",
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      "active:scale-[0.98]",
      "disabled:pointer-events-none disabled:opacity-50",
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    ].join(" ");

    const compClass = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(compClass, (children.props as any).className),
        ref,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        tabIndex={tabIndex}
        className={compClass}
        data-shadow="button-outline"
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
