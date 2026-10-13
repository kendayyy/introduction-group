import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  inline: "text-teal underline-offset-4 hover:underline",
  nav: "inline-flex min-h-11 items-center px-2 text-sm font-semibold text-ink",
  primary:
    "inline-flex min-h-11 items-center justify-center bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-ink",
  secondary:
    "inline-flex min-h-11 items-center justify-center border border-ink px-4 py-2 text-sm font-semibold text-ink",
  inverse:
    "inline-flex min-h-11 items-center justify-center border border-white px-4 py-2 text-sm font-semibold text-white",
} as const;

export function Link({
  variant = "inline",
  className,
  ...props
}: ComponentProps<typeof NextLink> & { variant?: keyof typeof variants }) {
  return <NextLink className={cn(variants[variant], className)} {...props} />;
}
