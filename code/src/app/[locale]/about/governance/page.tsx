import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "governance",
  (dictionary) => dictionary.governance,
  (dictionary) => [
    { label: dictionary.about, path: "/about" },
    { label: dictionary.governance, path: "/about/governance" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
