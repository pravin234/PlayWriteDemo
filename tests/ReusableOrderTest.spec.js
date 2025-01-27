const { test, expect } = require("@playwright/test");

test("@Web Client App login and Product Selection", async ({ page }) => {
  // Define credentials and product name
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "IPHONE 13 PRO";

  // Navigate to the application
  await page.goto("https://rahulshettyacademy.com/client");

  // Login process
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");

  // Wait for the products section to load
  const products = page.locator(".card-body");
  await products.first().waitFor();

  // Log all product titles for debugging
  const titles = await page.locator(".card-body b").allTextContents();
  console.log("Available products:", titles);

  // Locate the desired product and click "Add To Cart"
  const count = await products.count();
  let productFound = false;
  for (let i = 0; i < count; ++i) {
    const productTitle = await products.nth(i).locator("b").textContent();
    if (productTitle === productName) {
      const addToCartButton = products.nth(i).locator("text= Add To Cart");
      await addToCartButton.waitFor({ state: "visible" });
      console.log("Button is visible:", await addToCartButton.isVisible());
      console.log("Button is enabled:", await addToCartButton.isEnabled());
      await addToCartButton.click();
      productFound = true;
      break;
    }
  }

  // Ensure that the product was found and added to the cart
  expect(productFound).toBeTruthy();

  // Navigate to the cart
  await page.locator("[routerlink*='cart']").click();

  // Validate that the product is in the cart
  await page.locator("div li").first().waitFor();
  const isProductInCart = await page
    .locator(`h3:has-text('${productName}')`)
    .isVisible();
  expect(isProductInCart).toBeTruthy();

  // Proceed to checkout
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("ind");

  // Select the country from the dropdown
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const countryText = await dropdown.locator("button").nth(i).textContent();
    if (countryText.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  // Validate user email and place the order
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  // Capture and log the order ID
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(`Order ID: ${orderId}`);

  // Navigate to "My Orders"
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  // Validate the order ID in "My Orders"
  const rows = await page.locator("tbody tr");
  let orderMatched = false;
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      orderMatched = true;
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  expect(orderMatched).toBeTruthy();

  // Validate order details
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
