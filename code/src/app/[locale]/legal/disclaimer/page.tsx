import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "disclaimer",
  (dictionary) => dictionary.contactDisclaimer,
  (dictionary) => [
    { label: dictionary.contactDisclaimer, path: "/legal/disclaimer" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
