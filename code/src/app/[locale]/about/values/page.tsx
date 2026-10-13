import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "values",
  (dictionary) => dictionary.values,
  (dictionary) => [
    { label: dictionary.about, path: "/about" },
    { label: dictionary.values, path: "/about/values" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
