"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";

export function Carousel({
  label,
  previousLabel,
  nextLabel,
  children,
  emptyLabel,
}: {
  label: string;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode[];
  emptyLabel: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) {
      return;
    }
    const amount = node.clientWidth * direction;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    node.scrollBy({ left: amount, behavior: reduce ? "auto" : "smooth" });
  }

  if (children.length === 0) {
    return <p>{emptyLabel}</p>;
  }

  return (
    <div className="grid min-w-0 gap-4">
      <div className="flex gap-2">
        <IconButton label={previousLabel} onClick={() => move(-1)}>
          ←
        </IconButton>
        <IconButton label={nextLabel} onClick={() => move(1)}>
          →
        </IconButton>
      </div>
      <div
        ref={scroller}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className="flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full min-w-0 shrink-0 basis-full snap-start"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
