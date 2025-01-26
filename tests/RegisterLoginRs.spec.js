const { test, expect } = require("@playwright/test");

test.describe("User Account Tests", () => {
  test("Login with valid credentials", async ({ page }) => {
    const email = "demo417@gmail.com";
    const password = "Demo@1234";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.fill("#userEmail", email);
    await page.fill("#userPassword", password);
    await page.click("#login");

    // Verify successful navigation to dashboard
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );

    // Verify products are visible on the dashboard
    const productTitles = await page.locator(".card-body b").allTextContents();
    console.log("Available products:", productTitles);
    expect(productTitles.length).toBeGreaterThan(0);
  });

  test("@Web UI Controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Locators
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator(".radiotextsty").last();
    const termsCheckbox = page.locator("#terms");

    // Interact with dropdown
    await dropdown.selectOption("consult");

    // Interact with radio button
    await radioButton.click();
    await page.locator("#okayBtn").click();

    // Verify radio button is checked
    const isRadioChecked = await radioButton.isChecked();
    console.log("Is the last radio button checked:", isRadioChecked);
    await expect(radioButton).toBeChecked();

    // Interact with terms checkbox
    await termsCheckbox.click();
    await expect(termsCheckbox).toBeChecked();

    // Uncheck the terms checkbox and verify
    await termsCheckbox.uncheck();
    await expect(termsCheckbox.isChecked()).resolves.toBeFalsy();

    // Verify document link has the correct class attribute
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
  });
});
