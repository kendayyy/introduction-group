import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("@/")) {
    return nextResolve(specifier, context);
  }

  const base = new URL(`../src/${specifier.slice(2)}`, import.meta.url);
  const file = new URL(`${base.href}.ts`);
  const index = new URL(`${base.href}/index.ts`);
  const target = existsSync(fileURLToPath(file)) ? file : index;
  return nextResolve(target.href, context);
}
