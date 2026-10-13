import { expect, test } from "@playwright/test";

const widths = [375, 480, 768, 1024, 1200, 1440];

test("homepage screenshots @visual-only", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("measurement-consent", "rejected");
  });

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/vi");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;
      const sticksOut = (element: Element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.right <= viewport + 1) {
          return false;
        }
        let parent = element.parentElement;
        while (parent) {
          const overflowX = getComputedStyle(parent).overflowX;
          if (/(auto|scroll|hidden|clip)/.test(overflowX)) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      };
      return [...document.querySelectorAll("body *")]
        .filter(sticksOut)
        .slice(0, 8)
        .map(
          (element) =>
            `${element.tagName}.${String(element.className).slice(0, 100)}`,
        );
    });
    expect(overflow).toEqual([]);
    const footerAccordion = page.locator("footer details").first();
    if (width <= 480) {
      await expect(footerAccordion).toBeVisible();
    } else {
      await expect(footerAccordion).toBeHidden();
    }
    await page.screenshot({
      path: `test-results/screenshots/home-${width}.png`,
      fullPage: true,
    });
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/vi/dev/tokens");
  await page.screenshot({
    path: "test-results/screenshots/tokens-375.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/vi/dev/tokens");
  await page.screenshot({
    path: "test-results/screenshots/tokens-1440.png",
    fullPage: true,
  });
});
