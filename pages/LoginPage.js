class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = "#userEmail";
    this.passwordInput = "#userPassword";
    this.loginButton = "[value='Login']";
  }

  async login(email, password) {
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
    await this.page.waitForLoadState("networkidle"); // Wait until the page is fully loaded
  }
}

module.exports = { LoginPage };
