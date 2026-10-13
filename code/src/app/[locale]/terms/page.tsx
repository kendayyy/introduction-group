import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "terms",
  (dictionary) => dictionary.terms,
  (dictionary) => [{ label: dictionary.terms, path: "/terms" }],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
