import type { ImgHTMLAttributes } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: ImgHTMLAttributes<HTMLImageElement>) => (
    // The test double replaces next/image and is not a rendered page image.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={typeof src === "string" ? src : undefined} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
