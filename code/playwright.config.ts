import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  // Turbopack can return a truncated payload when two browsers compile one route.
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      grepInvert: /@visual-only/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        locale: "vi-VN",
      },
    },
    {
      name: "mobile",
      grepInvert: /@visual-only/,
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 375, height: 812 },
        locale: "vi-VN",
      },
    },
    {
      name: "visual",
      grep: /@visual-only/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        locale: "vi-VN",
      },
    },
  ],
});
