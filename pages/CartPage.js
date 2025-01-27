class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = "[routerlink*='cart']";
    this.checkoutButton = "text=Checkout";
    this.countryInput = "[placeholder*='Country']";
    this.countryDropdown = ".ta-results button";
    this.submitOrderButton = ".action__submit";
    this.orderIdLocator = ".em-spacer-1 .ng-star-inserted";
  }

  async navigateToCart() {
    await this.page.locator(this.cartLink).click();
    await this.page.locator("div li").first().waitFor(); // Wait for cart items to load
  }

  async proceedToCheckout(countryName) {
    await this.page.locator(this.checkoutButton).click();
    await this.page.locator(this.countryInput).type(countryName);
    await this.page.locator(".ta-results").waitFor();
    const options = this.page.locator(this.countryDropdown);
    const count = await options.count();
    for (let i = 0; i < count; ++i) {
      const country = await options.nth(i).textContent();
      if (country.trim() === countryName) {
        await options.nth(i).click();
        return true; // Country selected successfully
      }
    }
    return false; // Country not found
  }

  async submitOrder() {
    await this.page.locator(this.submitOrderButton).click();
  }

  async getOrderId() {
    return await this.page.locator(this.orderIdLocator).textContent();
  }
}

module.exports = CartPage;
