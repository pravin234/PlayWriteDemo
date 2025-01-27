class ProductPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
  }

  async addProductToCart(productName) {
    // Wait for all products to load
    await this.page.waitForSelector(".card-body", { state: "attached" });

    const products = this.page.locator(".card-body");
    const count = await products.count();

    console.log(`Total products: ${count}`);
    for (let i = 0; i < count; i++) {
      const productTitle = await products.nth(i).locator("b").textContent();
      console.log(`Product ${i}: ${productTitle}`);
      if (
        productTitle.trim().toLowerCase() === productName.trim().toLowerCase()
      ) {
        const addToCartButton = products
          .nth(i)
          .locator("button:has-text('Add To Cart')");
        console.log(
          `Attempting to click 'Add To Cart' for product: ${productTitle}`
        );
        await addToCartButton.click();
        return true;
      }
    }
    console.log(`Product "${productName}" not found.`);
    return false;
  }

  async getProductTitles() {
    // Retrieve all product titles on the page
    return await this.page.locator(".card-body b").allTextContents();
  }
}

module.exports = ProductPage;
