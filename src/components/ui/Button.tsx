import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "danger"
    | "success"
    | "ghost";
}

const baseClasses =
  "flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-8 px-4 cursor-pointer";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    // Based on the provided button
    "bg-gradient-to-b from-zinc-700 to-zinc-800 text-white text-shadow-xs shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:to-zinc-700 dark:from-zinc-600 dark:to-zinc-700 dark:shadow-[inset_1px_1px_1px,0px_0px_2px] dark:shadow-white/20 dark:hover:to-zinc-600",
  secondary:
    // Lighter version, more subtle and pleasant hover
    "bg-gradient-to-b from-zinc-200 to-zinc-300 text-zinc-900 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors duration-150 hover:from-zinc-250 hover:to-zinc-350 hover:shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] dark:from-zinc-700 dark:to-zinc-800 dark:text-white dark:hover:from-zinc-600 dark:hover:to-zinc-700",
  outline:
    // Transparent with border, similar rounded and sizing
    "border border-zinc-500 bg-transparent text-white hover:bg-zinc-800/60 active:bg-zinc-800/80",
  danger:
    // Red gradient, similar style
    "bg-gradient-to-b from-red-600 to-red-700 text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:to-red-600",
  success:
    // Green gradient, similar style
    "bg-gradient-to-b from-green-600 to-green-700 text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:to-green-600",
  ghost:
    // Transparent, subtle hover, similar shape
    "bg-transparent text-white hover:bg-zinc-800/40 active:bg-zinc-800/60",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className = "", variant = "default", tabIndex = 0, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        tabIndex={tabIndex}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
