// HomePageTest.spec.js
const { test, expect } = require("@playwright/test");
test.setTimeout(60000);

test("@google search", async ({ page }) => {
  // Navigate to Google
  await page.goto("https://google.com");

  // // Find the search bar, enter text, and trigger search by pressing 'Enter'
  // const searchInput = page.locator("#APjFqb");
  // await searchInput.fill("acs international india pvt. manager");
  // await searchInput.press("Enter");

  // // Wait for the search results to load
  // await page.waitForLoadState("networkidle");

  // // Verify that the search results contain a relevant string
  // const result = page.locator("h3");
  // await expect(result.first()).toHaveText(
  //   "ACS International India Pvt. Manager"
  // );
});

test("fb register", async ({ page }) => {
  await page.goto("https://www.facebook.com/reg/");
});
