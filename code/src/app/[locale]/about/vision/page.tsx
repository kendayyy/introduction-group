import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "vision",
  (dictionary) => dictionary.vision,
  (dictionary) => [
    { label: dictionary.about, path: "/about" },
    { label: dictionary.vision, path: "/about/vision" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
