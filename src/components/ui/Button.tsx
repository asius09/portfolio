import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

const baseClasses = [
  "flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all outline-none select-none",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  "h-8 px-4 cursor-pointer",
].join(" ");

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: [
    "bg-gradient-to-b from-gradient-from to-gradient-to",
    "shadow-lg",
    "active:brightness-90",
    "transition-colors",
    "text-gradient-foreground",
  ].join(" "),
  outline: [
    "border border-border bg-transparent text-foreground",
    "hover:bg-background-hover active:bg-background-hover",
    "transition-colors",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-background-hover active:bg-background-hover",
    "transition-colors",
  ].join(" "),
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
        data-shadow="button-outline"
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
