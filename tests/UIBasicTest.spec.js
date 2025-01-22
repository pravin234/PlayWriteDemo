const { test, expect } = require("@playwright/test");

test("first playwright test", async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Fill in the username
  await page.locator("#username").fill("rahulshettyacademy");

  // Fill in the password
  await page.locator("[type='password']").fill("");

  // Click the sign-in button
  await page.locator("#signInBtn").click();

  // Log any error messages displayed on the page
  console.log(await page.locator("[style*='block']").textContent());

  const errorMessage = await page.locator("[style*='block']").textContent();
  expect(errorMessage).toContain("Empty username/password.");

  // Log the page title
  console.log("Page loaded: " + (await page.title()));
});

test("browser playwright test", async ({ page }) => {
  // Navigate to Google
  await page.goto("https://google.com");

  // Log the page title
  console.log("Page title: " + (await page.title()));
});
