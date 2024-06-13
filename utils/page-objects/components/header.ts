import { Page } from "playwright";

export class Header {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getWelcomeUserMessage() {
    await this.page.waitForSelector("#nameofuser");
    return await this.page.locator("#nameofuser").innerText();
  }

  async clickToHomeHeader() {
    await this.page.click("a[href='index.html']");
  }

  async clickToContactHeader() {
    await this.page.click("a[href='#']:contains('Contact')");
  }

  async clickToAboutUsHeader() {
    await this.page.click("a[href='#']:contains('About us')");
  }

  async clickToCartHeader() {
    await this.page.click("a#cartur");
  }

  async clickToLogInHeader() {
    await this.page.click("a[data-target='#logInModal']");
  }

  async clickToSignUpHeader() {
    await this.page.click("a[data-target='#signInModal']");
  }
}
