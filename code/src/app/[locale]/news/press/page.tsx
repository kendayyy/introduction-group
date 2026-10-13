import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "press",
  (dictionary) => dictionary.press,
  (dictionary) => [
    { label: dictionary.news, path: "/news" },
    { label: dictionary.press, path: "/news/press" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
