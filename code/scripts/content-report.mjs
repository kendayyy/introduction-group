import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { register } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

register("./alias-hooks.mjs", import.meta.url);

process.env.NODE_ENV ??= "development";

const { loadLocalContent } = await import("../src/content/repository.ts");
const { productionContentBlockers } =
  await import("../src/content/readiness.ts");

const root = new URL("..", import.meta.url);
const srcDir = fileURLToPath(new URL("./src/", root));
const publicDir = fileURLToPath(new URL("./public/", root));

function files(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const detectorFiles = new Set([
  fileURLToPath(new URL("./src/content/readiness.ts", root)),
  fileURLToPath(new URL("./src/seo/routes.ts", root)),
]);

const sourceLiterals = files(srcDir)
  .filter(
    (file) =>
      (file.endsWith(".ts") || file.endsWith(".tsx")) &&
      !file.includes(`${join("src", "content")}`) &&
      !detectorFiles.has(file),
  )
  .flatMap((file) => {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    return lines.flatMap((line, index) =>
      ["[PLACEHOLDER]", "DEMO_ONLY", "LEGAL_VERIFY_"].some((marker) =>
        line.includes(marker),
      )
        ? [`${file}:${index + 1}`]
        : [],
    );
  });

const locales = ["vi", "en"];
const contentByLocale = Object.fromEntries(
  locales.map((locale) => [locale, loadLocalContent(false, locale)]),
);
const fieldPaths = locales.flatMap((locale) => {
  const content = contentByLocale[locale];
  return content
    ? productionContentBlockers(content).map((path) => `${locale}${path}`)
    : [`${locale}$.unavailable`];
});

function collectPublicPaths(value, found = []) {
  if (
    typeof value === "string" &&
    (value.startsWith("/media/") || value.startsWith("/reports/"))
  ) {
    found.push(value.split("?")[0]);
  } else if (Array.isArray(value)) {
    for (const item of value) {
      collectPublicPaths(item, found);
    }
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      collectPublicPaths(item, found);
    }
  }
  return found;
}

const missingMedia = [
  ...new Set(
    Object.values(contentByLocale).flatMap((content) =>
      collectPublicPaths(content),
    ),
  ),
].filter((path) => !existsSync(join(publicDir, path)));

const blocked =
  fieldPaths.length > 0 || sourceLiterals.length > 0 || missingMedia.length > 0;

const report = `# Unresolved content

Production blockers (\`[PLACEHOLDER]\`, \`DEMO_ONLY\`, \`LEGAL_VERIFY_*\`, sample contacts): ${fieldPaths.length}

${fieldPaths.map((path) => `- ${path}`).join("\n")}

Rendered source literals outside \`src/content\`: ${sourceLiterals.length}

${sourceLiterals.map((line) => `- ${line}`).join("\n")}

Missing public media referenced by local content: ${missingMedia.length}

${missingMedia.map((path) => `- ${path}`).join("\n")}

${
  blocked
    ? "Content readiness stays blocked until these values are complete."
    : process.env.CONTENT_MODE === "production"
      ? "Content scan is clean. Continue with the approved release checklist."
      : "Demo content scan is clean. Public release remains disabled while CONTENT_MODE=demo."
}
`;

writeFileSync(new URL("./docs/unresolved-content.md", root), report);
console.log(report);
process.exit(blocked ? 1 : 0);
