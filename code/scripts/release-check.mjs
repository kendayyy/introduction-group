import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

if ((process.env.CONTENT_MODE ?? "demo") !== "production") {
  console.error(
    "Release check blocked: CONTENT_MODE must be production. The Web2Go demo fixture is not approved for public release.",
  );
  process.exit(1);
}

try {
  execFileSync(
    process.execPath,
    [fileURLToPath(new URL("./content-report.mjs", import.meta.url))],
    { stdio: "inherit", env: process.env },
  );
} catch {
  process.exit(1);
}
