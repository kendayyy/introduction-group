import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "recruitment",
  (dictionary) => dictionary.recruitment,
  (dictionary) => [
    { label: dictionary.careers, path: "/careers" },
    { label: dictionary.recruitment, path: "/careers/notice" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
