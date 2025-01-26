const { test, expect } = require("@playwright/test");

test("Home Page", async ({ page }) => {
  // Navigate to Google
  await page.goto("https://google.com");

  // Find the search bar, enter text, and trigger search by pressing 'Enter'
  const searchInput = page.locator("input[name='q']");
  await searchInput.fill("acs international india pvt. manager");

  // Simulate pressing the "Enter" key to start the search
  await searchInput.press("Enter");

  // Wait for the search results to load
  await page.waitForLoadState("networkidle");

  // Verify that the search results contain a relevant string, e.g., the company name
  const result = page.locator("h3");

  // Ensure that the first result contains the search term (or something relevant)
  await expect(result.first()).toHaveText(
    "ACS International India Pvt. Manager"
  );

  // Optionally, check if the result's URL is correct or includes expected domains
  const firstResultLink = await page.locator("h3 a").first();
  const href = await firstResultLink.getAttribute("href");
  console.log("First result link:", href);

  // Verify that the URL contains the expected domain (this is just an example)
  expect(href).toContain("acs.in"); // Change according to expected result
});
