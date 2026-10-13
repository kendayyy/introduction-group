import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "cookies",
  (dictionary) => dictionary.cookies,
  (dictionary) => [{ label: dictionary.cookies, path: "/cookies" }],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
