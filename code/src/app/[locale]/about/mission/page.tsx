import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "mission",
  (dictionary) => dictionary.mission,
  (dictionary) => [
    { label: dictionary.about, path: "/about" },
    { label: dictionary.mission, path: "/about/mission" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
