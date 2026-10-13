import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  prose = false,
  className,
}: {
  children: ReactNode;
  prose?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("container-site", prose && "prose-measure", className)}>
      {children}
    </div>
  );
}
