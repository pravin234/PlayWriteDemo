const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { ClientPage } = require("../pages/ClientPage");

test("POM with Allure Report: Login and Order Workflow", async ({ page }) => {
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "zara coat 3";
  const country = "India";

  // Initialize Page Objects
  const loginPage = new LoginPage(page);
  const clientPage = new ClientPage(page);

  // Step 1: Navigate to the Login Page
  await test.step("Navigate to Login Page", async () => {
    await page.goto("https://rahulshettyacademy.com/client");
  });

  // Step 2: Login
  await test.step("Log in to the application", async () => {
    await loginPage.login(email, password);
  });

  // Step 3: Add Product to Cart
  await test.step(`Add product (${productName}) to the cart`, async () => {
    await clientPage.addProductToCart(productName);
  });

  // Step 4: Checkout
  await test.step("Proceed to checkout", async () => {
    await clientPage.proceedToCheckout(country);
  });

  // Step 5: Verify Order and Get Order ID
  await test.step("Verify order and retrieve Order ID", async () => {
    const orderId = await clientPage.verifyOrder(email);
    console.log(`Order ID: ${orderId}`);
  });
});
