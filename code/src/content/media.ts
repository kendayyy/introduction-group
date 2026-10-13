import type { ContentImage } from "@/content/schema";

export const landscapeImage: ContentImage = {
  src: "/media/placeholder-landscape.svg",
  mobileSrc: "/media/placeholder-portrait.svg",
  alt: "Khung hình minh họa cho dự án Web2Go",
  width: 1600,
  height: 900,
};

export const logoImage: ContentImage = {
  src: "/media/web2go-logo.jpg",
  mobileSrc: "/media/web2go-logo.jpg",
  alt: "Logo Web2Go",
  width: 1024,
  height: 558,
};

export const posterImage: ContentImage = {
  src: "/media/placeholder-poster.svg",
  mobileSrc: "/media/placeholder-poster.svg",
  alt: "",
  width: 1600,
  height: 900,
};

export const seoDefaults = {
  title: "Web2Go",
  description:
    "Web2Go thiết kế và vận hành nền tảng số, hệ thống doanh nghiệp và dịch vụ vận hành số tại Việt Nam.",
  indexable: true,
  ogImage: landscapeImage.src,
};

export function scene(alt: string): ContentImage {
  return { ...landscapeImage, alt };
}

export function wordmark(alt: string): ContentImage {
  return {
    src: "/media/placeholder-logo.svg",
    mobileSrc: "/media/placeholder-logo.svg",
    alt,
    width: 320,
    height: 160,
  };
}
