import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("measurement-consent", "rejected");
  });
});

test("desktop navigation keyboard and mobile menu", async ({
  page,
  viewport,
}) => {
  await page.goto("/vi");
  const width = viewport?.width ?? 0;

  if (width >= 1200) {
    const opener = page.getByRole("button", { name: "Mở menu mục Giới thiệu" });
    await opener.focus();
    await opener.press("Enter");
    await expect(
      page.locator("#about-menu").getByRole("link", { name: "Lịch sử" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  } else {
    const opener = page.getByRole("button", { name: "Mở menu" });
    await opener.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
  }
});

test("sector names are visible and link to a detail page", async ({ page }) => {
  await page.goto("/vi/sectors");
  const links = page
    .locator("#main")
    .getByRole("link", { name: "Nền tảng số" });
  await expect(links.first()).toBeVisible();
  await links.first().click();
  await expect(page).toHaveURL(/\/sectors\/nen-tang-so/);
});

test("search and locale links", async ({ page }) => {
  await page.goto("/vi/search");
  await page.getByLabel("Tìm kiếm").fill("zzzz-missing");
  await page.getByRole("button", { name: "Tìm kiếm" }).click();
  await expect(page.getByText("Không có kết quả phù hợp.")).toBeVisible();
  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/search/);
});

test("privacy page renders clean legal copy without internal markers", async ({ page }) => {
  await page.goto("/vi/privacy");
  await expect(page.getByRole("heading", { name: "Quyền riêng tư" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("DEMO_ONLY");
  await expect(page.locator("body")).not.toContainText("LEGAL_VERIFY_");
  await expect(page.locator("body")).not.toContainText("[PLACEHOLDER]");
  await expect(
    page.locator('img[src*="web2go-logo.jpg"]').first(),
  ).toBeVisible();
});

test("English routes render English content", async ({ page }) => {
  await page.goto("/en");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Digital systems for real operations",
    }),
  ).toBeVisible();
  await expect(page.getByText("Digital platforms").first()).toBeVisible();
  await page.goto("/en/privacy");
  await expect(page.getByRole("heading", { name: "Privacy" })).toBeVisible();
  await expect(page.getByText("This notice explains how Web2Go")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("DEMO_ONLY");
});

test("contact form reports client errors", async ({ page }) => {
  await page.goto("/vi/contact");
  await page.getByRole("button", { name: "Gửi" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});

test("video is not requested before playback", async ({ page }) => {
  const videoRequests: string[] = [];
  const videoStatuses: number[] = [];
  page.on("request", (request) => {
    if (request.url().includes("brand-video.mp4")) {
      videoRequests.push(request.url());
    }
  });
  page.on("response", (response) => {
    if (response.url().includes("brand-video.mp4")) {
      videoStatuses.push(response.status());
    }
  });
  await page.goto("/vi");
  await expect(
    page.getByRole("button", { name: "Phát video" }).first(),
  ).toBeVisible();
  expect(videoRequests).toEqual([]);
  await page.getByRole("button", { name: "Phát video" }).first().click();
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0);
  await expect
    .poll(() => videoStatuses.some((status) => status < 400))
    .toBe(true);
});

test("homepage has no serious accessibility violations", async ({ page }) => {
  await page.goto("/vi");
  const results = await new AxeBuilder({ page })
    .disableRules(["region"])
    .analyze();
  expect(
    results.violations.filter(
      (item) => item.impact === "serious" || item.impact === "critical",
    ),
  ).toEqual([]);
});
