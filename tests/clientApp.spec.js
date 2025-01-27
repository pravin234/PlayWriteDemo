const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");
const MyOrdersPage = require("../pages/MyOrdersPage");

test.describe("Client App Login and Product Selection", () => {
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "IPHONE 13 PRO";
  const countryName = "India";

  let loginPage, productPage, cartPage, myOrdersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    myOrdersPage = new MyOrdersPage(page);

    await page.goto("https://rahulshettyacademy.com/client");
  });

  test("Login, add product to cart, checkout and place order", async ({
    page,
  }) => {
    // Step 1: Login
    await loginPage.login(email, password);

    // Step 2: Add Product to Cart
    const productFound = await productPage.addProductToCart(productName);
    if (!productFound) {
      const productTitles = await productPage.getProductTitles();
      console.error(
        "Product not found. Available products are:",
        productTitles
      );
    }
    expect(productFound).toBeTruthy();

    // Step 3: Navigate to Cart and Validate Product
    await cartPage.navigateToCart();
    const isProductInCart = await page
      .locator(`h3:has-text('${productName}')`)
      .isVisible();
    expect(isProductInCart).toBeTruthy();

    // Step 4: Proceed to Checkout
    const countrySelected = await cartPage.proceedToCheckout(countryName);
    expect(countrySelected).toBeTruthy();

    // Step 5: Submit Order
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(
      email
    );
    await cartPage.submitOrder();
    await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
    );

    // Step 6: Capture and Log Order ID
    const orderId = await cartPage.getOrderId();
    console.log(`Order ID: ${orderId}`);

    // Step 7: Validate the Order in "My Orders"
    await myOrdersPage.navigateToMyOrders();
    const orderMatched = await myOrdersPage.findOrderById(orderId);
    expect(orderMatched).toBeTruthy();

    // Step 8: Validate Order Details
    const orderIdDetails = await myOrdersPage.getOrderDetails();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  });

  test("Check invalid login", async ({ page }) => {
    const invalidEmail = "wrong-email@example.com";
    const invalidPassword = "wrong-password";

    // Step 1: Attempt to login with invalid credentials
    await loginPage.login(invalidEmail, invalidPassword);

    const alertLocator = page.locator("div[role='alert']");
    await page.waitForSelector("div[role='alert']", {
      state: "visible",
      timeout: 5000,
    });

    // Step 3: Verify the toast message is visible
    const isAlertVisible = await alertLocator.isVisible();
    expect(isAlertVisible).toBeTruthy();

    // Step 4: Validate the message inside the alert
    const alertMessage = await alertLocator.textContent();
    expect(alertMessage.trim()).toBe("Incorrect email or password.");
  });
});
