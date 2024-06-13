import { Page } from "@playwright/test";

export class SignUpModal {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getModalTitle() {
    await this.page.waitForSelector("#signInModalLabel");
    return this.page.locator("#signInModalLabel");
  }

  async close() {
    await this.page.waitForSelector("#signInModalLabel");
    await this.page
      .locator("#signInModalLabel")
      .locator("+ button[aria-label='Close']")
      .click();
  }
}
