"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { IconButton } from "@/components/ui/icon-button";
import type { ContentImage } from "@/content/schema";

export function Gallery({
  images,
  label,
  previousLabel,
  nextLabel,
  emptyLabel,
}: {
  images: ContentImage[];
  label: string;
  previousLabel: string;
  nextLabel: string;
  emptyLabel: string;
}) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) {
    return <p>{emptyLabel}</p>;
  }

  const image = images[index] ?? images[0];
  return (
    <div className="grid gap-3">
      <h2 className="text-xl">{label}</h2>
      <ResponsiveImage image={image} sizes="(max-width: 768px) 100vw, 960px" />
      <div className="flex gap-2">
        <IconButton
          label={previousLabel}
          onClick={() =>
            setIndex((current) => (current - 1 + images.length) % images.length)
          }
        >
          ←
        </IconButton>
        <IconButton
          label={nextLabel}
          onClick={() => setIndex((current) => (current + 1) % images.length)}
        >
          →
        </IconButton>
      </div>
    </div>
  );
}
