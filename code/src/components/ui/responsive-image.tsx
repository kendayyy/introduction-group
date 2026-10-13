import Image from "next/image";
import type { ContentImage } from "@/content/schema";
import { cn } from "@/lib/cn";

export function ResponsiveImage({
  image,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 768px",
  className,
}: {
  image: ContentImage;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("media-frame", className)}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={image.mobileSrc} />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          unoptimized={image.src.endsWith(".svg")}
          sizes={sizes}
          className="object-cover"
        />
      </picture>
    </div>
  );
}
