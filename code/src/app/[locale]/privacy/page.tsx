import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "privacy",
  (dictionary) => dictionary.privacy,
  (dictionary) => [{ label: dictionary.privacy, path: "/privacy" }],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
