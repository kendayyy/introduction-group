import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "brand",
  (dictionary) => dictionary.brandUse,
  (dictionary) => [
    { label: dictionary.news, path: "/news" },
    { label: dictionary.brandUse, path: "/news/brand" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
