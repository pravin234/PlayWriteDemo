import { test } from "@playwright/test";
test("basic screenshot ", async ({ page }) => {
  //setViewPortSize with parameter width height
  await page.setViewportSize({ width: 1300, height: 500 });

  await page.goto("https://www.amazon.in/");
  await page.screenshot({ path: "myscreenshot.png" });
});
