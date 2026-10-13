import { describe, expect, it } from "vitest";
import { parseEnv } from "@/env";

describe("parseEnv", () => {
  it("accepts development without a public site URL", () => {
    expect(
      parseEnv({
        NODE_ENV: "development",
        NEXT_PUBLIC_SITE_URL: "",
      }),
    ).toMatchObject({
      NODE_ENV: "development",
      CONTENT_MODE: "demo",
      NEXT_PUBLIC_SITE_URL: undefined,
      NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED: false,
      ALLOW_INDEXING: false,
    });
  });

  it("rejects a public site URL that is not absolute", () => {
    expect(() =>
      parseEnv({
        NODE_ENV: "test",
        NEXT_PUBLIC_SITE_URL: "not-a-url",
      }),
    ).toThrow(/Invalid environment/);
  });
});
