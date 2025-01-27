class MyOrdersPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = "tbody";
    this.orderDetailsLocator = ".col-text";
    this.orderButtonLocator = "button";
  }

  async navigateToMyOrders() {
    await this.page.locator("button[routerlink*='myorders']").click();
    await this.page.locator(this.ordersTable).waitFor(); // Wait for the orders table to load
  }

  async findOrderById(orderId) {
    const rows = this.page.locator(`${this.ordersTable} tr`);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator(this.orderButtonLocator).first().click();
        return true; // Order found
      }
    }
    return false; // Order not found
  }

  async getOrderDetails() {
    return await this.page.locator(this.orderDetailsLocator).textContent();
  }
}

module.exports = MyOrdersPage;
