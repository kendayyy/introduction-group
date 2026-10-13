import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const gaps = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
} as const;

export function Stack({
  children,
  gap = "md",
  className,
}: {
  children: ReactNode;
  gap?: keyof typeof gaps;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", gaps[gap], className)}>{children}</div>
  );
}
