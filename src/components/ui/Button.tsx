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

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 active:bg-neutral-300",
  secondary:
    "bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 active:bg-neutral-600",
  outline:
    "bg-transparent text-neutral-100 border border-neutral-500 hover:bg-neutral-900/60 active:bg-neutral-900/80",
  danger:
    "bg-red-600 text-white border border-red-700 hover:bg-red-700 active:bg-red-800",
  success:
    "bg-green-600 text-white border border-green-700 hover:bg-green-700 active:bg-green-800",
  ghost:
    "bg-transparent text-neutral-300 border border-transparent hover:bg-neutral-800/40 active:bg-neutral-800/60",
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
        className={`cursor-pointer rounded-lg px-6 py-2 font-semibold shadow-sm transition-colors duration-100 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none ${variantClasses[variant]} ${className} `}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
