import { expect, test } from "@playwright/test";

test("foundation page renders", async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.addInitScript(() => {
    window.localStorage.setItem("measurement-consent", "rejected");
  });
  const response = await page.goto("/vi");

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Hệ thống số cho vận hành thực tế",
    }),
  ).toBeVisible();

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
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
