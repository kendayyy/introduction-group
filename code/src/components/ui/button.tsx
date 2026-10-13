import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-teal text-white hover:bg-ink disabled:bg-border disabled:text-text",
  secondary:
    "bg-ink text-white hover:bg-teal disabled:bg-border disabled:text-text",
  ghost:
    "border border-border bg-background text-text hover:border-ink disabled:text-muted",
} as const;

export function Button({
  variant = "primary",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  loading?: boolean;
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold",
        variants[variant],
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
