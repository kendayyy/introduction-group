import { createTextRoute } from "@/lib/static-text-page";

const route = createTextRoute(
  "process",
  (dictionary) => dictionary.process,
  (dictionary) => [
    { label: dictionary.careers, path: "/careers" },
    { label: dictionary.process, path: "/careers/process" },
  ],
);

export const generateMetadata = route.generateMetadata;
export default route.Page;
