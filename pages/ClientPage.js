class ClientPage {
  constructor(page) {
    this.page = page;
    this.cartButton = page.getByRole("button", { name: "   Cart" });
    this.checkoutButton = page.getByRole("button", { name: "Checkout❯" });
    this.placeOrderButton = page.getByText("Place Order");
    this.orderDownloadButton = page.getByRole("button", {
      name: "Click To Download Order Details in CSV",
    });
    this.ordersButton = page.getByRole("button", { name: "   ORDERS" });
    this.signOutButton = page.getByRole("button", { name: "Sign Out" });
  }

  async addProductToCart(productSelector) {
    await this.page.locator(productSelector).click();
  }

  async proceedToCheckout(country) {
    await this.cartButton.click();
    await this.checkoutButton.click();

    await this.page.locator('input[type="text"]').nth(1).fill("1234");
    await this.page.getByRole("combobox").nth(1).selectOption("28");
    await this.page.locator('input[type="text"]').nth(2).fill("xavvv");
    const countryField = this.page.getByRole("textbox", {
      name: "Select Country",
    });
    await countryField.click();
    await countryField.fill(country);
    await this.page.getByRole("button", { name: ` ${country}` }).click();
    await this.placeOrderButton.click();
  }

  async downloadOrderDetails() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.orderDownloadButton.click();
    const download = await downloadPromise;
    console.log(`Downloaded file path: ${await download.path()}`);
  }

  async signOut() {
    await this.ordersButton.click();
    await this.signOutButton.click();
  }
}

module.exports = { ClientPage };
