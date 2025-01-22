const { test, expect } = require("@playwright/test");

test("first playwright test", async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Fill in the username
  const username = page.locator("#username");
  await username.fill("rahulshettyacademy");

  // Leave the password blank to trigger the error
  const password = page.locator("[type='password']");
  await password.fill("");

  // Click the sign-in button
  const loginBtn = page.locator("#signInBtn");
  await loginBtn.click();

  // Wait for the error message to be visible
  const errorMessageLocator = page.locator("[style*='block']");
  await expect(errorMessageLocator).toBeVisible();

  // Log the error message and assert its content
  const errorMessage = await errorMessageLocator.textContent();
  console.log("Error Message: ", errorMessage);
  expect(errorMessage).toContain("Empty username/password.");

  // Fill in the correct username and password
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await loginBtn.click();

  // Wait for navigation to complete
  await page.waitForLoadState("networkidle");

  // Locate card titles on the page
  const cardTitles = page.locator(".card-title a");

  // Log the first and second card titles
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());

  // Log all card titles
  const allTitles = await cardTitles.allTextContents();
  console.log("All card titles:", allTitles);

  // Log the page title
  console.log("Page loaded: " + (await page.title()));
});

test("browser playwright test", async ({ page }) => {
  // Navigate to Google
  await page.goto("https://google.com");

  // Log the page title
  const title = await page.title();
  console.log("Page title: " + title);

  // Assert that the title is correct
  expect(title).toBe("Google");
});
