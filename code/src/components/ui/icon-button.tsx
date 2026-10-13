import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function IconButton({
  label,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      aria-label={label}
      className={cn(
        "border-border bg-background text-ink hover:border-ink inline-flex size-11 items-center justify-center border",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
