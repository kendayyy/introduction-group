import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  sectors: "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3",
  cards: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
  editorial: "grid grid-cols-4 gap-5 md:grid-cols-8 xl:grid-cols-12",
} as const;

export function Grid({
  variant,
  children,
  className,
}: {
  variant: keyof typeof variants;
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(variants[variant], className)}>{children}</div>;
}
