const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { ClientPage } = require("../pages/ClientPage");

test("Reusable Login and Order Workflow", async ({ page }) => {
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "zara coat 3";
  const country = "India";

  // Initialize Page Objects
  const loginPage = new LoginPage(page);
  const clientPage = new ClientPage(page);

  // Step 1: Navigate to the Login Page
  await page.goto("https://rahulshettyacademy.com/client");

  // Step 2: Login
  await loginPage.login(email, password);

  // Step 3: Add Product to Cart
  await clientPage.addProductToCart(productName);

  // Step 4: Checkout
  await clientPage.proceedToCheckout(country);

  // Step 5: Verify Order and Get Order ID
  const orderId = await clientPage.verifyOrder(email);
  console.log(`Order ID: ${orderId}`);
});

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/auth/login");
  await page.getByRole("textbox", { name: "email@example.com" }).click();
  await page
    .getByRole("textbox", { name: "email@example.com" })
    .fill("anshika@gmail.com");
  await page.getByRole("textbox", { name: "enter your passsword" }).click();
  await page
    .getByRole("textbox", { name: "enter your passsword" })
    .fill("Iamking@000");
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator("button:nth-child(4)").first().click();
  await page
    .locator("div:nth-child(3) > .card > .card-body > button:nth-child(4)")
    .click();
  await page
    .locator("div:nth-child(7) > .card > .card-body > button:nth-child(4)")
    .click();
  await page.getByRole("button", { name: "   Cart" }).click();
  await page.getByRole("button", { name: "Checkout❯" }).click();
  await page.locator('input[type="text"]').nth(1).click();
  await page.locator('input[type="text"]').nth(1).fill("1234");
  await page.getByRole("combobox").nth(1).selectOption("28");
  await page.locator('input[type="text"]').nth(2).click();
  await page.locator('input[type="text"]').nth(2).fill("xavvv");
  await page.getByRole("textbox", { name: "Select Country" }).click();
  await page.getByRole("textbox", { name: "Select Country" }).fill("india");
  await page.getByRole("button", { name: " India" }).click();
  await page.getByText("Place Order").click();
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Click To Download Order Details in CSV" })
    .click();
  const download = await downloadPromise;
  await page.getByRole("button", { name: "   ORDERS" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});
