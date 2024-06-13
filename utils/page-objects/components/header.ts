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
    await this.page.click(
      "#navbarExample > ul > li:nth-child(2) > a[data-target='#exampleModal']"
    );
  }

  async clickToAboutUsHeader() {
    await this.page.click(
      "#navbarExample > ul > li:nth-child(3) > a[data-target='#videoModal']"
    );
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
